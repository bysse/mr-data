import { Transform } from '../transform/transform'
import { Buffer } from '../transform/buffer'
import { compatibleWith, DataType } from '../transform/type'
import type { Parameter } from '../transform/parameter'
import { decodeBase64 } from './util'

export default class Base64Transform extends Transform {
  private regex: RegExp

  constructor() {
    super('base64.decode', 'Base64 Decode', [DataType.VALUE], [DataType.VALUE, DataType.BINARY])
    this.regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/
  }

  parameters(): Parameter[] {
    throw new Error('Method not implemented.')
  }

  detect(buffer: Buffer<any>): number {
    if (compatibleWith(buffer.type, DataType.VALUE)) {
      const data = buffer.toString().trim()
      return this.regex.test(data) ? 1.0 : 0.0
    }
    return 0.0
  }

  apply(buffer: Buffer<any>): Buffer<any> {
    const data = buffer.toString().trim()
    return decodeBase64(data, 'Decoded')
  }
}
