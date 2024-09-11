export class Err<T> {
  public readonly error: T

  constructor(error: T) {
    this.error = error
  }

  isError(): this is Err<T> {
    return true
  }

  static create<V>(error: V): Err<V> {
    return new Err<V>(error)
  }
}

export class Something<T> {
  public readonly value?: T

  constructor(value?: T) {
    this.value = value
  }

  isError(): this is Something<T> {
    return false
  }

  static create<V>(value?: V): Something<V> {
    return new Something<V>(value)
  }
}

export type Result<T, V> = NonNullable<Something<T> | Err<V>>
