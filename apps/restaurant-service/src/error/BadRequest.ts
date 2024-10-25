import { BaseError, ERROR_STATUS_CODES } from "./base"


export default class BadRequestError implements BaseError {
    statusCode: ERROR_STATUS_CODES.BAD_REQUEST;
    name: string = "BADREQUEST"
    message: string
    stack?: string
    cause?: unknown
    
    constructor(message: string, cause?: string) {
        this.message = message;
        this.cause = cause;
    }
   
}