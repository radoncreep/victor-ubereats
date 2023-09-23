import express, { json, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { appRouter } from "./routes";

const app = express();
app
    .use(json({ type: ["application/json"] }))
    .use(morgan("dev"))
    .use("/api/auth", appRouter)
    .use((error: any, req: Request, res: Response, next: NextFunction) => {
        console.log("HANDLED ERROR ", { error })
        return res
            .status(500)
            .json({ success: false, error: error.message || "Server Error" });
    })
    

export default app;