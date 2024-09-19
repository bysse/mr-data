import { Transform } from './transform'
import { Buffer, ValueBuffer } from './buffer'
import { TYPE_VALUE } from './type'

export default class Base64Transform extends Transform {
  private regex: RegExp

  constructor() {
    super('base64.decode', 'Base64 Decode', [TYPE_VALUE], TYPE_VALUE)
    this.regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/
  }

  detect(buffer: Buffer<any>): number {
    if (buffer.type.matches(TYPE_VALUE)) {
      const data = buffer.toString().trim()
      return this.regex.test(data) ? 1.0 : 0.0
    }
    return 0.0
  }

  apply(buffer: Buffer<any>): Buffer<any> {
    const data = buffer.toString().trim()
    const obj = atob(data)

    // TODO: this could be binary
    return new ValueBuffer(obj, 'Decoded')
  }
}
