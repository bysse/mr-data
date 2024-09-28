import { DataType } from './type'
import { Buffer } from './buffer'
import type { Parameter } from './parameter'

export abstract class Transform {
  readonly id: string
  readonly title: string
  readonly inputType: DataType[]
  readonly outputType: DataType[]

  protected constructor(id: string, title: string, inputType: DataType[], outputType: DataType[]) {
    this.id = id
    this.title = title
    this.inputType = inputType
    this.outputType = outputType
  }

  abstract parameters(): Parameter[]

  abstract detect(buffer: Buffer<any>): number

  abstract apply(buffer: Buffer<any>): Buffer<any>
}
