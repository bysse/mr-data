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
    const idx = parseInt(this.index.value)
    return buffer.data[idx]
  }
}
