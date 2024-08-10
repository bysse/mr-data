import Transform from './transform'
import { Buffer, BufferType, Type } from '@/transform/buffer.js'

export default class JWTDecodeTransform extends Transform {
  constructor() {
    super('jwt.decode', 'JWT Decode')
  }

  detect(buffer) {
    if (!buffer.hasType(Type.VALUE)) {
      return 0.0
    }

    let parts = this.decode(buffer).split('.')
    if (parts.length !== 3) {
      return 0.0
    }

    // TODO: verify base64 of the parts

    return 1.0
  }

  apply(buffer) {
    const parts = this.decode(buffer).split('.')

    const header = atob(parts[0])
    const payload = atob(parts[1])

    return Buffer.wrap(
      [header, payload],
      BufferType.json_array()
    )
  }
}