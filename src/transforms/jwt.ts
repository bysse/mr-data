import { Transform } from '../transform/transform'
import { Buffer, ArrayBuffer, JsonBuffer } from '../transform/buffer'
import { DataType } from '../transform/type'
import { base64URLDecode, base64URLtoBase64, decodeBase64asBinary, formatJson } from './util'
import type { Parameter } from '../transform/parameter'

export default class JWTDecodeTransform extends Transform {
  private regex: RegExp

  constructor() {
    super('jwt.decode', 'JWT Decode', [DataType.VALUE], [DataType.ARRAY])
    this.regex = /e[yw][A-Za-z0-9-_]+\.(?:e[yw][A-Za-z0-9-_]+)?\.[A-Za-z0-9-_]{2,}?/
  }

  parameters(): Parameter[] {
    return []
  }

  detect(buffer: Buffer<any>): number {
    if (buffer.type != DataType.VALUE) {
      return 0.0
    }

    if (this.regex.test(buffer.toString())) {
      return 1.0
    }

    return 0.0
  }

  apply(buffer: Buffer<any>): Buffer<any> {
    const parts = buffer.toString().split('.')
    const data: Buffer<any>[] = [
      new JsonBuffer(formatJson(base64URLDecode(parts[0])), 'Header'),
      new JsonBuffer(formatJson(base64URLDecode(parts[1])), 'Payload')
    ]

    if (parts.length === 3) {
      const base64 = base64URLtoBase64(parts[2])

      data.push(decodeBase64asBinary(base64, 'Signature'))
    }

    return new ArrayBuffer(data)
  }
}
