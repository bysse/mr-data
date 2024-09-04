import Transform from './transform.js'
import { Buffer, BufferType } from '@/transform/buffer.ts'

export class ArrayLengthTransform extends Transform {
    constructor() {
        super('array.length', 'Array Length')
    }

    detect(buffer) {
        if (buffer.type.isArray) {
            return 1.0;
        }
        return 0.0;
    }

    apply(buffer) {
        return Buffer.wrap("" + buffer.data.length, BufferType.value());
    }
}