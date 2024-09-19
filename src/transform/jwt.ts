import { Transform } from './transform'
import { Buffer, ValueArrayBuffer } from './buffer'
import { TYPE_VALUE } from './type'
import { base64URLDecode, base64URLtoBase64, formatJson } from './util'

export default class JWTDecodeTransform extends Transform {
  private regex: RegExp

  constructor() {
    super('jwt.decode', 'JWT Decode', [TYPE_VALUE], TYPE_VALUE)
    this.regex = /e[yw][A-Za-z0-9-_]+\.(?:e[yw][A-Za-z0-9-_]+)?\.[A-Za-z0-9-_]{2,}?/
  }

  detect(buffer: Buffer<any>): number {
    if (!buffer.type.matches(TYPE_VALUE)) {
      return 0.0
    }

    if (this.regex.test(buffer.toString())) {
      return 1.0
    }

    return 0.0
  }

  apply(buffer: Buffer<any>): Buffer<any> {
    const parts = buffer.toString().split('.')
    const data = [formatJson(base64URLDecode(parts[0])), formatJson(base64URLDecode(parts[1]))]
    const annotations = ['Header', 'Payload']

    if (parts.length === 3) {
      data.push(base64URLtoBase64(parts[2]))
      annotations.push('Signature')
    }

    return new ValueArrayBuffer(data, ...annotations)
  }
}
