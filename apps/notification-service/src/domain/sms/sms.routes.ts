import { Router } from "express";
import { catchAsyncErrors } from "../../helpers/errorHandler";
import { SmsController } from "./sms.controller";
import { TwilioSmsServce } from "./sms.service";


const router = Router();
const sms = new SmsController(new TwilioSmsServce());

router.post("/", catchAsyncErrors(sms.sendOtp));

export { router as smsRouter };