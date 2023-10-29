import jwt from "jsonwebtoken";

import { 
    ITokenManager, 
    SignedPayload, 
    UnsignedPayload 
} from "./jwt.interface";


export class TokenManager implements ITokenManager {
    private readonly token_secret: string = "";

    constructor() {
        this.token_secret = process.env.TOKEN_SECRET as string;

        if (this.token_secret == undefined) throw new Error("ServerError");
    }

    createAccessToken(payload: UnsignedPayload) {
        const signedPayload = jwt.sign(payload, this.token_secret!, {
            issuer: process.env.SERVICE_NAME,
            audience: "",
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
        });

        return signedPayload;
    }

    createRefreshToken(payload: UnsignedPayload) {
        const signedPayload = jwt.sign(payload, this.token_secret!, {
            issuer: process.env.SERVICE_NAME,
            audience: "",
        });

        return signedPayload;
    }

    verifyAccessToken(payload: SignedPayload) {
        const decodedPayload = jwt.verify(payload, this.token_secret!);

        if (typeof decodedPayload == "string") return null;

        return decodedPayload
    }
}