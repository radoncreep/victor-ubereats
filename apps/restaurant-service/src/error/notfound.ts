import { BaseError, ERROR_STATUS_CODES } from "./base";


export class NotFoundError implements BaseError {
    statusCode: ERROR_STATUS_CODES.NOT_FOUND;
    message: string;
    name: string = "NotFound";
    
    constructor(message: string) {
       this.message = message;
    }
}