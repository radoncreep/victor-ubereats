import type { Response } from "express";

export type Result<T> = {
    success: boolean;
    payload: T;
}

export type AppResponse<T> = Promise<Response<Result<T>>>;