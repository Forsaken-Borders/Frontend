/**
 * An HTTP error, thrown when a fetch request fails.
 */
export class HttpError extends Error {
    /**
     * The HTTP status code for the error.
     */
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }

    public toString(): string {
        return `LoginException: Status Code: ${this.statusCode}, Error Message: ${this.message}`;
    }
}