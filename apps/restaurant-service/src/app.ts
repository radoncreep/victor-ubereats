import express, { Request, Response, NextFunction, json, urlencoded } from "express";
import routes from "./routes";
import morgan from "morgan";


const app = express();
app
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(morgan("dev"))
    .use("/api", routes)
    .use((error: any, req: Request, res: Response, next: NextFunction) => {
        let errorMessage = error.message ?? "Server Error";
        let errorStatusCode = error.statusCode ?? 500;
        let errorCause = error.cause ?? null; // change null to unidentifiable
        if (error instanceof Error) {
            errorMessage = error.message;
            errorCause = error.cause as string ?? errorCause;
        }
        return res.status(errorStatusCode).json({ 
            success: false, 
            error: {
                message: errorMessage,
                cause: errorCause
            }
        })
    })

export { app };