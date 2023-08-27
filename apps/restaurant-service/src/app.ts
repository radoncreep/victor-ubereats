import express, { Request, Response, NextFunction, json } from "express";
import routes from "./routes";
import morgan from "morgan";

function initializeServer() {
    const app = express();
    app
        .use(json({ type: ["application/json"] }))
        .use(morgan("dev"))
        .use("/api", routes)
        .use((error: any, req: Request, res: Response, next: NextFunction) => {
            return res.json({ success: false, error })
        })
    
    return app;
}

export { initializeServer };