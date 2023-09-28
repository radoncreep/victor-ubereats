import type { Request, Response, NextFunction } from "express";


export const catchAsyncErrors = (fn: Function) => (
    (req: Request, res: Response, next: NextFunction) => {
        const routePromise = fn(req, res, next);
        if (routePromise.catch) {
            routePromise.catch((err: any) => next(err));
        }
    }
);