import { Buffer, BufferType } from '@/transform/buffer.js'
import transformManager from '@/transform/manager.js'

export class TransformChainResult {
    constructor(error, index, message, buffer, suggestions) {
        this.error = error;
        this.index = index;
        this.message = message;
        this.buffer = buffer;
        this.suggestions = suggestions;
    }

    static success(buffer, suggestions) {
        return new TransformChainResult(false, -1, '', buffer, suggestions);
    }

    static error(index, message) {
        return new TransformChainResult(true, index, message, null, []);
    }
}

export class TransformChain {
    constructor() {
        this.transforms = [];
    }

    all() {
        return this.transforms;
    }

    clear() {
        this.transforms = [];
    }

    append(transform) {
        this.transforms.push(transform);
    }

    removeByIndex(index) {
        this.transforms.splice(index, 1);
    }

    apply(value) {
        console.log('TransformChain.apply');

        const encoder = new TextEncoder();
        const encodedData = encoder.encode(value);
        let buffer = Buffer.wrap(encodedData, BufferType.value());

        if (this.transforms.length === 0) {
            return TransformChainResult.success(
              buffer, transformManager.detect(buffer)
            );
        }

        for (let i = 0; i < this.transforms.length; i++) {
            try {
                buffer = this.transforms[i].apply(buffer);
            } catch (e) {
                return TransformChainResult.error(i, e.message);
            }
        }

        return TransformChainResult.success(buffer, transformManager.detect(buffer));
    }
}