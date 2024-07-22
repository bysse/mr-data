export default class Transform {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    detect(buffer) {
        return 0.0;
    }

    apply(buffer) {
        return buffer;
    }
}