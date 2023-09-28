import { Request, Response } from "express";

import { AppResponse } from "../../types";
import { SmsServiceInterface } from "./types";

type SendOtpReqBody = {
    phone: string;
    country: string;
    countryCode: string;
}

export class SmsController {
    constructor(private readonly smsService: SmsServiceInterface) {}

    sendOtp = async (req: Request, res: Response): Promise<AppResponse<any>> => {
        const { phone, country, countryCode } = req.body as SendOtpReqBody;

        const otp = Math.floor(100000 + Math.random());

        this.smsService.sendMessage({
            receipient: {
                phone: countryCode + phone
            },
            emailOptions: {
                content: `Your Ubereats verification code is: ${otp}`,
                subject: "Ubereats Verification"
            }
        });

        return res.status(200).json({ success: true, payload: null });
    }
}