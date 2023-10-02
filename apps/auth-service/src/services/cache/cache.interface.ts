export type CacheOptions = {
    expiry: any;
}

export interface CacheInterface {
    get(key: string): Promise<any>;
    set(key: string, value: any, options?: CacheOptions): Promise<string>;
    delete(key: string): void;
    update?(key: string, value: any, options?: CacheOptions): Promise<any>;
}