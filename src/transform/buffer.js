export const Type = {
  VALUE: 'value',
  JSON: 'json'
}

export class BufferType {
  constructor(type, isArray = false) {
    this.type = type
    this.isArray = isArray
  }

  matches(type, isArray = false) {
    return this.type === type && this.isArray === isArray
  }

  static array() {
    return new BufferType(Type.VALUE, true)
  }

  static value() {
    return new BufferType(Type.VALUE)
  }

  static json() {
    return new BufferType(Type.JSON)
  }

  static json_array() {
    return new BufferType(Type.JSON, true)
  }
}


export class Buffer {
  constructor(data, type) {
    this.data = data
    this.type = type
    this.length = data.length
  }

  static wrap(data, type) {
    if (!(type instanceof BufferType)) {
      throw new Error('type must be an instance of BufferType')
    }

    if (type === BufferType.json()) {
      if (data instanceof Uint8ClampedArray) {
        return new Buffer(data, type)
      }
      return new Buffer(new Uint8ClampedArray(data), type)
    }

    return new Buffer(data, type);
  }

  at(index) {
    return this.data.at(index)
  }

  hasType(type) {
    return this.type.matches(type, false)
  }

  hasArrayType(type) {
    return this.type.matches(type, true)
  }
}
