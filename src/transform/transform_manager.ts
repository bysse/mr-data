import { ref, type Ref } from 'vue'
import { TransformChain } from './transform_chain'
import transformRegistry from './transform_registry'
import { Something, Err, type Result } from '../lib/result'
import { ValueBuffer } from './buffer'

export class TransformManager {
  readonly input: Ref<string, string>
  readonly error: Ref<string, string>
  readonly transformChain: TransformChain

  constructor(initialData: string) {
    this.input = ref<string>(initialData)
    this.error = ref<string>('')
    this.transformChain = new TransformChain()
  }

  appendTransform(transformId: string): Result<void, string> {
    const transform = transformRegistry.get(transformId)
    if (transform === undefined) {
      return this.setError(`Unknown transform "${transformId}"`)
    }
    try {
      this.transformChain.append(transform)
      this.clearError()
      return Something.create()
    } catch (e) {
      return this.setError((e as Error).message)
    }
  }

  public applyTransforms(): Result<string, string> {
    const buffer = new ValueBuffer(this.input.value)
    const result: TransformChainResult = this.transformChain.apply(buffer)

    // TODO:
  }

  private clearError() {
    this.error.value = ''
  }

  private setError<T>(message: string): Result<T, string> {
    this.error.value = message
    return Err.create(message)
  }
}
