import { ref, type Ref } from 'vue'
import { TransformChain, TransformChainResult } from './transform_chain'
import transformRegistry from './transform_registry'
import { Something, Err, type Result } from '../lib/result'
import { ValueBuffer } from './buffer'

export class TransformManager {
  readonly input: Ref<string, string>
  readonly output: Ref<string, string>
  readonly error: Ref<string, string>
  readonly transformChain: TransformChain

  constructor(initialData: string) {
    this.input = ref<string>(initialData)
    this.output = ref<string>('')
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

  public applyTransforms(): TransformChainResult {
    const buffer = new ValueBuffer(this.input.value)
    const result = this.transformChain.apply(buffer)

    if (result.error) {
      this.output.value = ''
      this.error.value = result.message
    } else {
      this.clearError()
      this.output.value = result.buffer?.toString() || ''
    }

    return result
  }

  private clearError() {
    this.error.value = ''
  }

  private setError<T>(message: string): Result<T, string> {
    this.error.value = message
    return Err.create(message)
  }
}
