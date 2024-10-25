import { BaseError, ERROR_STATUS_CODES } from "./base";


export class ServerError implements BaseError {
    statusCode: ERROR_STATUS_CODES.SERVER_ERROR;
    message: string;
    name: string = "Server Error";
    cause: string;
    
    constructor(message: string, cause?: string) {
       this.message = message;
       this.cause = cause;
    }
}