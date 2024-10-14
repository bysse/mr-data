import { Transform } from './transform'
import { Buffer } from './buffer'

import Base64Transform from '../transforms/base64'
import JsonConvertTransform from '../transforms/json'
import JWTDecodeTransform from '../transforms/jwt'
import { compatibleWith } from './type'
import { ArrayElementTransform } from '../transforms/array'
import { TimestampTransform } from '../transforms/time'

export class TransformRegistry {
  private readonly transforms: Transform[]

  constructor() {
    this.transforms = [
      new JsonConvertTransform(),
      new Base64Transform(),
      new JWTDecodeTransform(),

      new TimestampTransform(),

      new ArrayElementTransform()
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
      if (!compatibleWith(buffer.type, ...transform.inputType)) {
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
