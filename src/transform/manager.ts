import { JsonFormatTransform } from './json.ts'
import { Transform } from './transform'
import { Buffer } from './buffer'

export class TransformManager {
  private readonly transforms: Transform[]

  constructor() {
    this.transforms = [
      new JsonFormatTransform()
      /*
      new Base64Transform(),

      new JWTDecodeTransform(),

      new ArrayLengthTransform()
       */
    ]
  }

  all(): Transform[] {
    return this.transforms
  }

  get(id: string): Transform | null {
    return this.transforms.find(transform => transform.id === id)
  }

  detect(buffer: Buffer<any>): [string, number][] {
    if (buffer == null || buffer.data == null) {
      return []
    }

    const result = []
    for (let i = 0; i < this.transforms.length; i++) {
      const transform = this.transforms[i]
      if (!buffer.type.matchesAny(transform.inputType)) {
        continue
      }

      const score = transform.detect(buffer)
      if (score <= 0) continue
      result.push([transform.id, score])
    }

    result.sort((a, b) => b[1] - a[1])
    return result.map(entry => entry[0])
  }
}

const transformManager = new TransformManager()

export default transformManager