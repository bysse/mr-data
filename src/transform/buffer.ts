export enum ValueType {
  VALUE,
  JSON
}

export class BufferType {
  valueType: ValueType
  isArray: boolean

  constructor(type: ValueType, isArray: boolean = false) {
    this.valueType = type
    this.isArray = isArray
  }

  matches(bufferType: BufferType) {
    return this.valueType == bufferType.type && this.isArray == bufferType.isArray
  }

  matchesAny(types: BufferType[]) {
    return types.some(type => this.matches(type))
  }

  static value(): BufferType {
    return new BufferType(ValueType.VALUE)
  }

  static valueArray() {
    return new BufferType(ValueType.VALUE, true)
  }

  static json(): BufferType {
    return new BufferType(ValueType.JSON)
  }

  static jsonArray() {
    return new BufferType(ValueType.JSON, true)
  }
}

export class Buffer<T> {
  readonly data: T
  readonly type: BufferType

  constructor(data: T, type: BufferType) {
    this.data = data
    this.type = type
  }

  hasType(type: ValueType): boolean {
    return this.type.matches(type, false)
  }

  hasArrayType(type: ValueType): boolean {
    return this.type.matches(type, true)
  }

  private static readonly _encoder = new TextEncoder()

  static fromValue(data: string): Buffer<Uint8ClampedArray> {
    return Buffer.wrap(
      Buffer._encoder.encode(data),
      BufferType.value()
    )
  }

  static fromValueArray(data: string[]): Buffer<any> {
    let arrays = data.map((item) => Buffer._encoder.encode(item))
    return Buffer.wrap(arrays, BufferType.valueArray())
  }

  static fromJson(json: string): Buffer<string> {
    return Buffer.wrap(json, BufferType.json())
  }

  static fromJsonArray(json: string[]): Buffer<string> {
    return Buffer.wrap(json, BufferType.jsonArray())
  }

  static wrap(data: Uint8ClampedArray, type: BufferType) {
    return new Buffer(data, type)
  }
}
