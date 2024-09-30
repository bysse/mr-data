export enum ParameterType {
  Index,
  Number,
  String
}

export class Parameter {
  readonly name: string
  readonly description: string
  readonly type: ParameterType
  public value: string
  readonly minValue: number
  readonly maxValue: number

  constructor(
    name: string,
    description: string,
    type: ParameterType,
    value: string,
    minValue: number,
    maxValue: number
  ) {
    this.name = name
    this.description = description
    this.type = type
    this.value = value
    this.minValue = minValue
    this.maxValue = maxValue
  }

  static createIndex(name: string, description: string, value: string): Parameter {
    return new Parameter(name, description, ParameterType.Index, value, 0, 0)
  }

  static createInt(
    name: string,
    description: string,
    value: string,
    minValue: number,
    maxValue: number
  ): Parameter {
    return new Parameter(name, description, ParameterType.Number, value, minValue, maxValue)
  }
}
