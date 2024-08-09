import Transform from './transform'

export default class Base64Transform extends Transform {
    constructor() {
        super('base64.decode', 'Base64 Decode')
        this.regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
    }

    detect(buffer) {
        let string = this.decode(buffer);
        return this.regex.test(string) ? 1.0 : 0.0;
    }

    apply(buffer) {
        const decodedString = this.decode(buffer);

        let obj = atob(decodedString);
        let data = this.encode(obj);

        return new Uint8ClampedArray(data);
    }
}