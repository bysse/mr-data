import { DataType, compatibleTypes } from './type'

export class Buffer<T> {
  public readonly data: T
  public readonly type: DataType
  public readonly annotation: string

  constructor(data: T, type: DataType, annotation: string) {
    this.data = data
    this.type = type
    this.annotation = annotation
  }

  public sections(): Buffer<any>[] {
    return [this]
  }

  public toString(): string {
    return String(this.data)
  }
}

export class ValueBuffer extends Buffer<string> {
  constructor(data: string, annotation: string) {
    super(data, DataType.VALUE, annotation)
  }
}

export class JsonBuffer extends Buffer<string> {
  constructor(data: string, annotation: string) {
    super(data, DataType.JSON, annotation)
  }
}

export class BinaryBuffer extends Buffer<Uint8ClampedArray> {
  constructor(data: Uint8ClampedArray, annotation: string) {
    super(data, DataType.BINARY, annotation)
  }

  public toString(): string {
    return `${this.data.length} bytes`
  }
}

export class ArrayBuffer extends Buffer<Array<Buffer<any>>> {
  constructor(data: Array<Buffer<any>>) {
    super(data, DataType.ARRAY, 'array')
  }

  public sections(): Buffer<any>[] {
    return this.data
  }

  public toString(): string {
    return String(this.data)
  }
}
