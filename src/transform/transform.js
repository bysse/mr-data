export default class Transform {
    constructor(id, title) {
        this.id = id;
        this.title = title;

        this.decoder = new TextDecoder();
        this.encoder = new TextEncoder();
    }

    detect(buffer) {
        return 0.0;
    }

    apply(buffer) {
        return buffer;
    }

    decode(buffer) {
        return this.decoder.decode(buffer);
    }

    encode(string) {
        return this.encoder.encode(string);
    }
}