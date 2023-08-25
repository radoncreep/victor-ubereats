import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";

const PORT = process.env.PORT || 1018;

(async () => {    
    app.listen(PORT, async () => {
        console.log(`${process.env.SERVICE_NAME} running on ${PORT}`);
    });
})();