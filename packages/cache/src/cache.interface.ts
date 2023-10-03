export type CacheOptions = {
    expiry: any;
}

type CacheValue = "string" | ""

export interface CacheInterface {
    get(key: string): Promise<any>;
    set(key: string, value: any, options?: CacheOptions): Promise<string | null>;
    delete(key: string): void;
    update?(key: string, value: any, options?: CacheOptions): Promise<any>;
}

