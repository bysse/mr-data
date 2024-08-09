import Transform from './transform'

export default class JWTDecodeTransform extends Transform {
    constructor() {
        super('jwt.decode', 'JWT Decode')
    }

    detect(buffer) {
        let parts = this.decode(buffer).split('.');
        if (parts.length !== 3) {
            return 0.0;
        }

        // TODO: verify base64 of the parts

        return 1.0;
    }

    apply(buffer) {
        const parts = this.decode(buffer).split('.');

        return buffer;
    }
}