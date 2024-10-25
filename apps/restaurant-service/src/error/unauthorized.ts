import { BaseError, ERROR_STATUS_CODES } from "./base";


export class UnauthorizedError implements BaseError {
    statusCode: ERROR_STATUS_CODES.UNAUTHORIZED;
    message: string;
    name: string = "Unauthorized"
    
    constructor(message: string) {
       this.message = message;
    }
}