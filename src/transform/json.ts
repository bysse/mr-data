import { Transform } from './transform.ts'
import { Buffer, BufferType, ValueType } from '@/transform/buffer.ts'

export class JsonFormatTransform extends Transform {
  constructor() {
    super(
      'json.format',
      'JSON Format',
      [BufferType.value(), BufferType.json()],
      BufferType.json()
    )
  }

  detect(buffer: Buffer<any>): number {
    const leftBrace = 123
    const rightBrace = 125
    const leftBracket = 91
    const rightBracket = 93
    const quote = 34

    if (buffer.hasType(Type.JSON)) {
      return 1.0
    }

    if (buffer.hasType(Type.VALUE)) {
      let data = buffer.data as Uint8ClampedArray
      if (data.length > 1) {
        let first = data.at(0)
        let last = data.at(data.length - 1)
        if (first === leftBrace && last === rightBrace ||
          first === rightBracket && last === leftBracket ||
          first === quote && last === quote) {
          return 1.0
        }
      }
    }
    return 0.0
  }

  apply(buffer) {
    const decodedString = this.decode(buffer.data)
    let obj = JSON.parse(decodedString)
    let json = JSON.stringify(obj, null, 3)
    return Buffer.json(json)
  }
}