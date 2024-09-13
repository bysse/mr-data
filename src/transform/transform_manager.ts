import { ref, type Ref } from 'vue'
import { TransformChain, TransformChainResult } from './transform_chain'
import transformRegistry from './transform_registry'
import { ValueBuffer } from './buffer'
import QueryString from '../query'

export class TransformManager {
  readonly input: Ref<string, string>
  readonly output: Ref<string, string>
  readonly error: Ref<string, string>
  // TODO: Add a ref for the transform view data

  readonly transformChain = new TransformChain()
  readonly queryString = new QueryString()

  constructor(initialData: string) {
    this.input = ref<string>(initialData)
    this.output = ref<string>('')
    this.error = ref<string>('')

    // load any initial transform chain from the query string
    const chain = this.queryString.get('chain')
    if (chain) {
      chain.split('|').forEach(this.appendTransform)
    }
  }

  appendTransform(transformId: string): boolean {
    const transform = transformRegistry.get(transformId)
    if (transform === undefined) {
      return this.setError(`Unknown transform "${transformId}"`)
    }
    try {
      this.transformChain.append(transform)
      this.updateQueryString()
      this.clearError()
      return true
    } catch (e) {
      return this.setError((e as Error).message)
    }
  }

  removeTransform(transformIndex: number): boolean {
    try {
      this.transformChain.removeByIndex(transformIndex)
      this.updateQueryString()
      this.clearError()
      return true
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

  private updateQueryString() {
    if (this.transformChain.isEmpty()) {
      this.queryString.remove('chain')
    } else {
      this.queryString.set(
        'chain',
        this.transformChain
          .all()
          .map((transform) => transform.id)
          .join('|')
      )
    }
    this.queryString.apply()
  }

  private clearError() {
    this.error.value = ''
  }

  private setError<T>(message: string): boolean {
    console.log('ERROR: ' + message)
    this.error.value = message
    return false
  }
}
