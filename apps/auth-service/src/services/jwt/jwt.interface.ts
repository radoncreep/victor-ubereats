export type UnsignedPayload = Record<string, any>;

export type SignedPayload = string;

export interface ITokenManager {
    createAccessToken(payload: UnsignedPayload): SignedPayload;
    createRefreshToken(payload: UnsignedPayload): SignedPayload;
    verifyAccessToken(payload: SignedPayload): UnsignedPayload | null;
}