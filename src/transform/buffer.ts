import {
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
  public readonly annotations: string[]

  constructor(data: T, type: DataType, annotations: string[]) {
    this.data = data
    this.type = type
    this.annotations = annotations
  }

  public toString(): string {
    return String(this.data)
  }
}

export class ValueBuffer extends Buffer<string> {
  constructor(data: string, annotation: string) {
    super(data, TYPE_VALUE, [annotation])
  }
}

export class JsonBuffer extends Buffer<string> {
  constructor(data: string, annotation: string) {
    super(data, TYPE_JSON, [annotation])
  }
}

export class BinaryBuffer extends Buffer<Uint8ClampedArray> {
  constructor(data: Uint8ClampedArray, ...annotations: string[]) {
    super(data, TYPE_BINARY, annotations)
  }

  public toString(): string {
    return `${this.data.length} bytes`
  }
}

export class ArrayBuffer<T> extends Buffer<Array<T>> {
  constructor(data: Array<T>, type: DataType, annotations: string[]) {
    super(data, type, annotations)

    if (data.length != annotations.length) {
      throw new Error('Mismatching number of data elements and annotations')
    }
  }

  public toString(): string {
    return String(this.data)
  }
}

export class ValueArrayBuffer extends ArrayBuffer<string> {
  constructor(data: string[], ...annotations: string[]) {
    super(data, TYPE_VALUE_ARRAY, annotations)
  }

  public toString(): string {
    return `array[${this.data.length}]`
  }
}

export class JsonArrayBuffer extends ArrayBuffer<string> {
  constructor(data: string[], ...annotations: string[]) {
    super(data, TYPE_JSON_ARRAY, annotations)
  }

  public toString(): string {
    return `array[${this.data.length}]`
  }
}

export class BinaryArrayBuffer extends ArrayBuffer<Uint8ClampedArray> {
  constructor(data: Uint8ClampedArray[], ...annotations: string[]) {
    super(data, TYPE_BINARY_ARRAY, annotations)
  }

  public toString(): string {
    return `array[${this.data.length}]`
  }
}
