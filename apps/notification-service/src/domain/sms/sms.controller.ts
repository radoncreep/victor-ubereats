import { Request, Response } from "express";

import { AppResponse } from "../../types";
import { SmsServiceInterface } from "./types";
import { CacheServiceInterface } from "../../services/cache/cache.interface";

type SendOtpReqBody = {
    phone: string;
    country: string;
    countryCode: string;
}

type VerifyOtpBody = {
    phone: string;
    otp: number;
}

export class SmsController {
    constructor(
        private readonly smsService: SmsServiceInterface,
        private readonly cacheService: CacheServiceInterface
    ) {}

    sendOtp = async (req: Request, res: Response): Promise<AppResponse<any>> => {
        const { phone, country, countryCode } = req.body as SendOtpReqBody;

        const otp = Math.floor(100000 + Math.random());

        const result = await this.smsService.sendMessage({
            receipient: { phone, countryCode: countryCode },
            emailOptions: {
                content: `Your Ubereats verification code is: ${otp}`,
                subject: "Ubereats Verification"
            }
        });

        if (result.success) {
            // use a redis service to cache the number and the otp
        }

        return res.status(200).json({ success: true, payload: null });
    }

    verifyOtp = async (req: Request, res: Response): Promise<AppResponse<any>> => {
        const {phone, otp} = req.body as VerifyOtpBody;

        if (!phone || !otp) {
            throw new Error("Invalid Request");
        }

        const cachedOtp: number = await this.cacheService.get(phone);

        if (cachedOtp !== otp) {
            throw new Error("Invalid Otp");
        }

        return res.status(200).send({ success: true });
    }
}