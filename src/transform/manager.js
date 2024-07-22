import JsonFormatTransform from './json';

class TransformManager {
    constructor() {
        this.transforms = [
            new JsonFormatTransform()
        ];
    }

    all() {
        return this.transforms;
    }

    get(id) {
        return this.transforms.find(transform => transform.id === id);
    }

    detect(data) {
        if (data === null || data.length === 0) {
            return [];
        }

        const result = []
        for (let i = 0; i < this.transforms.length; i++) {
            const transform = this.transforms[i];
            const score = transform.detect(data);
            if (score <= 0) continue;

            result.push([transform.id, score]);
        }

        result.sort((a, b) => b[1] - a[1]);
        return result.map(entry => entry[0]);
    }
}
const transformManager = new TransformManager();

export default transformManager;