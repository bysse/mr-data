export enum BasicType {
  VALUE,
  BINARY,
  JSON
}

export class DataType {
  public readonly type: BasicType
  public readonly array: boolean

  constructor(type: BasicType, array: boolean) {
    this.type = type
    this.array = array
  }

  matches(other: DataType): boolean {
    return this.type == other.type && this.array == other.array
  }

  matchesAny(types: DataType[]): boolean {
    return types.some((type) => this.matches(type))
  }

  toString(): string {
    return `(${this.type}${this.array ? '[]' : ''})`
  }
}

export const TYPE_VALUE = new DataType(BasicType.VALUE, false)
export const TYPE_VALUE_ARRAY = new DataType(BasicType.VALUE, true)
export const TYPE_JSON = new DataType(BasicType.JSON, false)
export const TYPE_JSON_ARRAY = new DataType(BasicType.JSON, true)
export const TYPE_BINARY = new DataType(BasicType.BINARY, false)
export const TYPE_BINARY_ARRAY = new DataType(BasicType.BINARY, true)
