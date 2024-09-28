import { DataType } from '../transform/type'
import { Buffer, JsonBuffer } from '../transform/buffer'
import { Transform } from '../transform/transform'
import type { Parameter } from '../transform/parameter'

export default class JsonConvertTransform extends Transform {
  constructor() {
    super('json.convert', 'To JSON', [DataType.VALUE, DataType.BINARY], [DataType.JSON])
  }

  parameters(): Parameter[] {
    return []
  }

  detect(buffer: Buffer<any>): number {
    const leftBrace = 123
    const rightBrace = 125
    const leftBracket = 91
    const rightBracket = 93
    const quote = 34

    if (buffer.type == DataType.VALUE) {
      const data = buffer.data as string
      if (data.length > 1) {
        const first = data.charAt(0)
        const last = data.charAt(data.length - 1)

        if (
          (first === '{' && last === '}') ||
          (first === '[' && last === ']') ||
          (first === '"' && last === '"')
        ) {
          return 1.0
        }
      }
    }

    if (buffer.type == DataType.BINARY) {
      const data = buffer.data as Uint8ClampedArray
      if (data.length > 1) {
        const first = data[0]
        const last = data[data.length - 1]

        if (
          (first === leftBrace && last === rightBrace) ||
          (first === rightBracket && last === leftBracket) ||
          (first === quote && last === quote)
        ) {
          return 1.0
        }
      }
    }
    return 0.0
  }

  apply(buffer: Buffer<any>): Buffer<any> {
    if (buffer.type == DataType.BINARY) {
      const decoder = new TextDecoder()
      const json = decoder.decode(buffer.data)

      return new JsonBuffer(json, 'JSON')
    }

    return new JsonBuffer(buffer.toString(), 'JSON')
  }
}
