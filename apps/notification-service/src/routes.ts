import { Router } from "express";
import { smsRouter } from "./domain/sms/sms.routes";

const router = Router({
    strict: true,
    caseSensitive: true
});

router
    .use("/notification/sms", smsRouter)
    // .use("/notification/email");

export { router as appRouter };