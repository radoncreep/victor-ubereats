export type UnsignedPayload = Record<string, any>;

export type SignedPayload = string;

export interface ITokenManager {
    sign(payload: UnsignedPayload): SignedPayload;
    verify(payload: SignedPayload): UnsignedPayload;
}