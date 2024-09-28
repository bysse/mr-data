export enum DataType {
  VALUE,
  ARRAY,
  BINARY,
  JSON
}

export function compatibleType(lType: DataType, rType: DataType): boolean {
  return (
    lType === rType ||
    (lType === DataType.VALUE && rType === DataType.JSON) ||
    (lType === DataType.JSON && rType === DataType.VALUE)
  )
}

export function compatibleWith(lType: DataType, ...rTypes: DataType[]): boolean {
  return rTypes.some((rType) => compatibleType(lType, rType))
}

export function compatibleWithAny(lTypes: DataType[], rTypes: DataType[]): boolean {
  return lTypes.some((lType) => compatibleWith(lType, ...rTypes))
}
