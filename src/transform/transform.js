import {Buffer} from './buffer'

export default class Transform {
  constructor(id, title) {
    this.id = id
    this.title = title

    this.decoder = new TextDecoder()
    this.encoder = new TextEncoder()
  }

  detect(buffer) {
    return 0.0
  }

  apply(buffer) {
    return buffer
  }

  decode(buffer) {
    if (buffer instanceof Buffer) {
      return this.decoder.decode(buffer.data)
    }
    return this.decoder.decode(buffer)
  }

  encode(buffer) {
    if (buffer instanceof Buffer) {
      return new Buffer(
        this.encoder.encode(buffer.data),
        buffer.type
      )
    }
    return this.encoder.encode(buffer)
  }
}