import {
  BasicType,
  DataType,
  TYPE_BINARY,
  TYPE_BINARY_ARRAY,
  TYPE_JSON,
  TYPE_JSON_ARRAY,
  TYPE_VALUE,
  TYPE_VALUE_ARRAY
} from './type'

export class Buffer<T> {
  public readonly data: T
  public readonly type: DataType

  constructor(data: T, type: DataType) {
    this.data = data
    this.type = type
  }

  public toString(): string {
    return String(this.data)
  }
}

export class ValueBuffer extends Buffer<string> {
  constructor(data: string) {
    super(data, TYPE_VALUE)
  }
}

export class JsonBuffer extends Buffer<string> {
  constructor(data: string) {
    super(data, TYPE_JSON)
  }
}

export class BinaryBuffer extends Buffer<Uint8ClampedArray> {
  constructor(data: Uint8ClampedArray) {
    super(data, TYPE_BINARY)
  }

  public toString(): string {
    return `${this.data.length} bytes`
  }
}

export class ValueArrayBuffer extends Buffer<string[]> {
  constructor(data: string[]) {
    super(data, TYPE_VALUE_ARRAY)
  }

  public toString(): string {
    return `array[${this.data.length}]`
  }
}

export class JsonArrayBuffer extends Buffer<string[]> {
  constructor(data: string[]) {
    super(data, TYPE_JSON_ARRAY)
  }

  public toString(): string {
    return `array[${this.data.length}]`
  }
}

export class BinaryArrayBuffer extends Buffer<Uint8ClampedArray[]> {
  constructor(data: Uint8ClampedArray[]) {
    super(data, TYPE_BINARY_ARRAY)
  }

  public toString(): string {
    return `array[${this.data.length}]`
  }
}
