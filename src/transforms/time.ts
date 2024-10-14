import { Transform } from '../transform/transform'
import { Buffer, ValueBuffer } from '../transform/buffer'
import { DataType } from '../transform/type'
import { Parameter } from '../transform/parameter'

export class TimestampTransform extends Transform {
  constructor() {
    super('timestamp.get', 'Timestamp', [DataType.VALUE], [DataType.VALUE])
  }

  parameters(): Parameter[] {
    return []
  }

  detect(buffer: Buffer<any>) {
    if (buffer.type !== DataType.VALUE) {
      return 0.0
    }

    if (/[0-9]{10,13}/.test(buffer.toString())) {
      return 1.0
    }

    return 0.0
  }

  apply(buffer: Buffer<any>): Buffer<any> {
    let timestamp = parseInt(buffer.toString())
    if (timestamp >= 1e12) {
      timestamp = timestamp / 1000
      return new ValueBuffer(new Date(timestamp).toUTCString(), 'UNIX timestamp (ms)')
    }

    return new ValueBuffer(new Date(timestamp).toUTCString(), 'UNIX timestamp')
  }
}
