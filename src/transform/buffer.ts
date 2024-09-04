import { Value } from 'sass'

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

  matches(type: ValueType, isArray: boolean = false) {
    return this.valueType == type && this.isArray == isArray
  }

  static array() {
    return new BufferType(ValueType.VALUE, true)
  }

  static value(): BufferType {
    return new BufferType(ValueType.VALUE)
  }

  static json(): BufferType {
    return new BufferType(ValueType.JSON)
  }

  static json_array() {
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

  static wrap(data: Uint8ClampedArray, type: BufferType) {
    return new Buffer(data, type)
  }

  hasType(type) {
    return this.type.matches(type, false)
  }

  hasArrayType(type) {
    return this.type.matches(type, true)
  }
}
