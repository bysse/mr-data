import { Transform } from './transform.js'
import { Buffer } from './buffer.js'

import Base64Transform from './base64.js'
import JsonFormatTransform from './json.js'
import JWTDecodeTransform from './jwt.js'

export class TransformRegistry {
  private readonly transforms: Transform[]

  constructor() {
    this.transforms = [
      new JsonFormatTransform(),
      new Base64Transform(),
      new JWTDecodeTransform()
      /*
      new ArrayLengthTransform()
       */
    ]
  }

  all(): Transform[] {
    return this.transforms
  }

  get(id: string): Transform | undefined {
    return this.transforms.find((transform) => transform.id === id)
  }

  detect(buffer: Buffer<any>): [string, number][] {
    if (buffer == null || buffer.data == null) {
      return []
    }

    const result: [string, number][] = []
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
    return result
  }
}

const transformRegistry = new TransformRegistry()

export default transformRegistry
