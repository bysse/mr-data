import { Buffer } from './buffer'
import transformRegistry from './transform_registry'
import { Transform } from './transform'
import { compatibleWithAny } from './type'

export class TransformChainResult {
  readonly error: boolean
  readonly index: number
  readonly message: string
  readonly buffer: Buffer<any> | null
  readonly suggestions: [string, number][]

  constructor(
    error: boolean,
    index: number,
    message: string,
    buffer: Buffer<any> | null,
    suggestions: [string, number][]
  ) {
    this.error = error
    this.index = index
    this.message = message
    this.buffer = buffer
    this.suggestions = suggestions
  }

  static success(buffer: Buffer<any>, suggestions: [string, number][]): TransformChainResult {
    return new TransformChainResult(false, -1, '', buffer, suggestions)
  }

  static error(index: number, message: string): TransformChainResult {
    return new TransformChainResult(true, index, message, null, [])
  }
}

export class TransformChain {
  private transforms: Transform[]

  constructor() {
    this.transforms = []
  }

  isEmpty(): boolean {
    return this.transforms.length === 0
  }

  all(): Transform[] {
    return this.transforms
  }

  clear(): void {
    this.transforms = []
  }

  append(transform: Transform): void {
    if (this.transforms.length > 0) {
      const last = this.transforms[this.transforms.length - 1]
      if (!compatibleWithAny(last.outputType, transform.inputType)) {
        throw new Error(
          `Incompatible types: ${last.outputType} cannot be converted to ${transform.inputType}`
        )
      }
    }
    this.transforms.push(transform)
  }

  removeByIndex(index: number): void {
    // TODO: This could break the type chain. Remove all transforms after?
    this.transforms.splice(index, 1)
  }

  apply(buffer: Buffer<any>): TransformChainResult {
    console.log('TransformChain::apply')

    if (this.transforms.length === 0) {
      return TransformChainResult.success(buffer, transformRegistry.detect(buffer))
    }

    for (let i = 0; i < this.transforms.length; i++) {
      try {
        const transform = this.transforms[i]
        buffer = transform.apply(buffer)
      } catch (e) {
        if (e instanceof Error) return TransformChainResult.error(i, e.message)
        return TransformChainResult.error(i, String(e))
      }
    }

    return TransformChainResult.success(buffer, transformRegistry.detect(buffer))
  }
}
