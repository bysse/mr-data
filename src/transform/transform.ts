import { DataType } from './type'
import { Buffer } from './buffer'
import type { Parameter } from './parameter'

export class Transform {
  readonly id: string
  readonly title: string
  readonly inputType: DataType[]
  readonly outputType: DataType[]
  public maxIndex: number

  constructor(id: string, title: string, inputType: DataType[], outputType: DataType[]) {
    this.id = id
    this.title = title
    this.inputType = inputType
    this.outputType = outputType
    this.maxIndex = 1
  }

  parameters(): Parameter[] {
    return []
  }

  detect(buffer: Buffer<any>): number {
    return 0.0
  }

  apply(buffer: Buffer<any>): Buffer<any> {
    return buffer
  }

  public serialize(): string {
    return ''
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deserialize(value: string): void {}
}
