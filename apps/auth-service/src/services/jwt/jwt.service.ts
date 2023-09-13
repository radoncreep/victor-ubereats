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

    sign(payload: UnsignedPayload) {
        const signedPayload = jwt.sign(payload, this.token_secret!, {
            issuer: process.env.SERVICE_NAME,
            audience: "",
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
        });

        return signedPayload;
    }

    verify(payload: SignedPayload) {
        const decodedPayload = jwt.verify(payload, this.token_secret!);

        return decodedPayload as jwt.JwtPayload;
    }
}