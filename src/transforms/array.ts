import { Transform } from '../transform/transform'
import { Buffer } from '../transform/buffer'
import { DataType } from '../transform/type'
import { Parameter } from '../transform/parameter'

export class ArrayElementTransform extends Transform {
  index: Parameter

  constructor() {
    super(
      'array.get',
      'Array Element',
      [DataType.ARRAY],
      [DataType.VALUE, DataType.JSON, DataType.BINARY]
    )

    this.index = Parameter.createIndex('index', 'Index in the array', '0')
  }

  parameters(): Parameter[] {
    return [this.index]
  }

  detect(buffer: Buffer<any>) {
    if (buffer.type === DataType.ARRAY) {
      return 1.0
    }
    return 0.0
  }

  apply(buffer: Buffer<any>): Buffer<any> {
    this.maxIndex = buffer.sections().length
    let idx = parseInt(this.index.value)
    if (idx < 0) idx = 0
    if (idx >= this.maxIndex) idx = this.maxIndex - 1
    return buffer.data[idx]
  }

  serialize(): string {
    return this.index.value
  }

  deserialize(value: string): void {
    this.index.value = value
  }
}
