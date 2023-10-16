import { InvalidArgumentError as FstructArgumentException } from "commander"

export { FstructArgumentException };

export class FstructException extends Error {
    constructor(message) {
        super();
        this.message = `FstructException: ${message}`;
    }
}