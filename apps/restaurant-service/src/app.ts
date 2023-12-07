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
        console.log({ error })
        return res.json({ success: false, error })
    })

export { app };