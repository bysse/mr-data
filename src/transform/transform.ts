import { DataType } from './type'
import { Buffer } from './buffer'

export abstract class Transform {
  readonly id: string
  readonly title: string
  readonly inputType: DataType[]
  readonly outputType: DataType

  protected constructor(id: string, title: string, inputType: DataType[], outputType: DataType) {
    this.id = id
    this.title = title
    this.inputType = inputType
    this.outputType = outputType
  }

  public compatibleWithInput(type: DataType): boolean {
    return this.inputType.find(type.matches) === undefined
  }

  abstract detect(buffer: Buffer<any>): number

  abstract apply(buffer: Buffer<any>): Buffer<any>
}
