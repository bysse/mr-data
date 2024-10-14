import { ref, type Ref } from 'vue'
import { TransformChain, TransformChainResult } from './transform_chain'
import transformRegistry from './transform_registry'
import { Buffer, ValueBuffer } from './buffer'
import QueryString from '../query'
import { proxy } from '../lib/proxy'
import type { Transform } from './transform'

export class TransformManager {
  private readonly emptyBuffer = new ValueBuffer('', 'Empty')

  readonly input: Ref<string, string>
  readonly output: Ref<Buffer<any>, Buffer<any>>
  readonly error: Ref<string, string>
  // TODO: Add a ref for the transform view data

  readonly transformChain = new TransformChain()
  readonly queryString = new QueryString()

  constructor(initialData: string) {
    this.input = ref<string>(initialData)
    this.output = ref<Buffer<any>>(this.emptyBuffer)
    this.error = ref<string>('')

    // load any initial transform chain from the query string
    const chain = this.queryString.get('chain')
    if (chain) {
      const pattern = /([a-z.]+)(\((.*)\))?/i

      for (const part of chain.split('|')) {
        const match = part.match(pattern)
        if (!match) {
          console.log('Invalid transform specification: ' + part)
          break
        }

        const transformId = match[1]
        const parameters = match[3]

        if (this.appendTransformById(transformId)) {
          // the append was successful, now set the parameters
          const transform = this.transformChain.last()

          if (parameters) {
            transform.deserialize(parameters)
          }
        }
      }

      this.updateQueryString()
    }
  }

  getInput(): Ref<string, string> {
    return proxy(this.input)
  }

  getOutput(): Ref<Buffer<any>, Buffer<any>> {
    return proxy(this.output)
  }

  appendTransformById(transformId: string): boolean {
    const transform = transformRegistry.get(transformId)
    if (transform === undefined) {
      return this.setError(`Unknown transform "${transformId}"`)
    }
    return this.appendTransform(transform)
  }

  appendTransform(transform: Transform): boolean {
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
    console.log('TransformManager::applyTransforms')
    const buffer = new ValueBuffer(this.input.value, 'Input')
    const result = this.transformChain.apply(buffer)

    if (result.error) {
      this.output.value = new ValueBuffer(result.message, 'Error')
      this.error.value = result.message
    } else {
      this.clearError()
      this.output.value = result.buffer ?? this.emptyBuffer
    }

    return result
  }

  public updateQueryString() {
    if (this.transformChain.isEmpty()) {
      this.queryString.remove('chain')
    } else {
      this.queryString.set(
        'chain',
        this.transformChain
          .all()
          .map((transform) => {
            if (transform.parameters().length === 0) {
              return transform.id
            }
            return transform.id + '(' + transform.serialize() + ')'
          })
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
