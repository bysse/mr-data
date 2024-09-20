import { TYPE_BINARY, TYPE_JSON, TYPE_VALUE } from '../transform/type'
import { Buffer, JsonBuffer } from '../transform/buffer'
import { Transform } from '../transform/transform'
import { formatJson } from './util'

export default class JsonFormatTransform extends Transform {
  constructor() {
    super('json.format', 'JSON Format', [TYPE_VALUE, TYPE_JSON, TYPE_BINARY], TYPE_JSON)
  }

  detect(buffer: Buffer<any>): number {
    const leftBrace = 123
    const rightBrace = 125
    const leftBracket = 91
    const rightBracket = 93
    const quote = 34

    if (buffer.type.matches(TYPE_JSON)) {
      return 1.0
    }

    if (buffer.type.matches(TYPE_VALUE)) {
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

    if (buffer.type.matches(TYPE_BINARY)) {
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
    if (buffer.type.matches(TYPE_BINARY)) {
      const decoder = new TextDecoder()
      const decodedString = decoder.decode(buffer.data)
      const obj = JSON.parse(decodedString)
      const json = JSON.stringify(obj, null, 3)

      return new JsonBuffer(json, 'JSON')
    }

    const decodedString = buffer.toString()
    const json = formatJson(decodedString)

    return new JsonBuffer(json, 'JSON')
  }
}
