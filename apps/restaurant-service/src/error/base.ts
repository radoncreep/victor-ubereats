export enum ERROR_STATUS_CODES {
    BAD_REQUEST="404",
    SERVER_ERROR="500",
    UNAUTHORIZED="401",
    NOT_FOUND="400"
}

export interface BaseError extends Error {
    statusCode: ERROR_STATUS_CODES;
}