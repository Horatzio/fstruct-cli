export class FstructException extends Error {
    constructor(message) {
        super();
        this.message = `FstructException: ${message}`;
    }
}