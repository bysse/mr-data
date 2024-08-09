import Transform from './transform'

export default class JsonFormatTransform extends Transform {
    constructor() {
        super('json.format', 'JSON Format')
    }

    detect(buffer) {
        const leftBrace = 123;
        const rightBrace = 125;

        if (buffer.at(0) === leftBrace && buffer.at(buffer.length - 1) === rightBrace) {
            return 1.0;
        }
        return 0.0;
    }

    apply(buffer) {
        const decodedString = this.decode(buffer);

        let obj = JSON.parse(decodedString);
        let json = JSON.stringify(obj, null, 3);
        let data = this.encode(json);

        return new Uint8ClampedArray(data);
    }
}