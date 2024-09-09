import { Buffer, BufferType } from './buffer'

export abstract class Transform {
  readonly id: string
  readonly title: string
  readonly inputType: BufferType[]
  readonly outputType: BufferType
  decoder: TextDecoder
  encoder: TextEncoder

  protected constructor(
    id: string,
    title: string,
    inputType: BufferType[],
    outputType: BufferType
  ) {
    this.id = id
    this.title = title
    this.inputType = inputType
    this.outputType = outputType

    this.decoder = new TextDecoder()
    this.encoder = new TextEncoder()
  }

  public compatibleWithInput(type: BufferType): boolean {
    return this.inputType.find(type.matches) === undefined
  }

  abstract detect(buffer: Buffer<any>): number

  abstract apply(buffer: Buffer<any>): Buffer<any>

  protected decode(buffer: Uint8ClampedArray): string {
    return this.decoder.decode(buffer)
  }

  protected encode(data: string): Uint8ClampedArray {
    return new Uint8ClampedArray(this.encoder.encode(data))
  }
}
