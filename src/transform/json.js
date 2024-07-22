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
        const decoder = new TextDecoder();
        const string = decoder.decode(buffer);

        const obj = JSON.parse(string);
        return JSON.stringify(obj, null, 3)
    }
}