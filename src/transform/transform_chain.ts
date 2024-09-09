import { Buffer } from './buffer'
import transformManager from './manager'
import { Transform } from './transform'

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

  all(): Transform[] {
    return this.transforms
  }

  clear(): void {
    this.transforms = []
  }

  append(transform: Transform): void {
    if (this.transforms.length > 0) {
      const last = this.transforms[this.transforms.length - 1]
      if (!transform.compatibleWithInput(last.outputType)) {
        throw new Error(`Transform ${transform.title} cannot be appended to the chain`)
      }
    }
    this.transforms.push(transform)
  }

  removeByIndex(index: number): void {
    this.transforms.splice(index, 1)
  }

  apply(value: string): TransformChainResult {
    console.log('TransformChain.apply')

    let buffer = Buffer.fromValue(value)

    if (this.transforms.length === 0) {
      return TransformChainResult.success(buffer, transformManager.detect(buffer))
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

    return TransformChainResult.success(buffer, transformManager.detect(buffer))
  }
}
