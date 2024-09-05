import { Buffer } from '@/transform/buffer.ts'
import transformManager from '@/transform/manager.ts'
import { Transform } from './transform'

export class TransformChainResult {
  readonly error: boolean
  readonly index: number
  readonly message: string
  readonly buffer: Buffer<any>
  readonly suggestions: [string, number][]

  constructor(
    error: boolean,
    index: number,
    message: string,
    buffer: Buffer<any>,
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
      let last = this.transforms[this.transforms.length - 1];
      if (!last.outputType.matches(transform.inputType)) {
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

    let buffer = Buffer.fromValue(value);

    if (this.transforms.length === 0) {
      return TransformChainResult.success(
        buffer, transformManager.detect(buffer)
      )
    }

    for (let i = 0; i < this.transforms.length; i++) {
      try {
        let transform = this.transforms[i]
        buffer = transform.apply(buffer)
      } catch (e) {
        return TransformChainResult.error(i, e.message)
      }
    }

    return TransformChainResult.success(buffer, transformManager.detect(buffer))
  }
}