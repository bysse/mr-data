import { Buffer, BufferType } from './buffer.ts'

export abstract class Transform {
  readonly id: string
  readonly title: string
  readonly inputType: BufferType
  readonly outputType: BufferType

  protected constructor(id: string, title: string, inputType: BufferType, outputType: BufferType) {
    this.id = id
    this.title = title
    this.inputType = inputType
    this.outputType = outputType

    this.decoder = new TextDecoder()
    this.encoder = new TextEncoder()
  }

  abstract detect(buffer: Buffer<any>): number;

  abstract apply(buffer: Buffer<any>): Buffer<any>;

  protected decode(buffer: Uint8ClampedArray): string {
    return this.decoder.decode(buffer)
  }

  protected encode(data: string): Uint8ClampedArray {
    return this.encoder.encode(data)
  }
}