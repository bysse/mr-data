import Transform from './transform'
import { Buffer, BufferType, Type } from '@/transform/buffer.js'

export default class Base64Transform extends Transform {
    constructor() {
        super('base64.decode', 'Base64 Decode')
        this.regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
    }

    detect(buffer) {
        if (buffer.hasType(Type.VALUE)) {
            let string = this.decode(buffer);
            return this.regex.test(string) ? 1.0 : 0.0;
        }
        return 0.0;
    }

    apply(buffer) {
        const decodedString = this.decode(buffer);

        let obj = atob(decodedString);
        let data = this.encode(obj);

        return Buffer.wrap(data, BufferType.value());
    }
}