import { CacheInterface, CacheOptions } from "./cache.interface";

export class CacheService implements CacheInterface {
    get(key: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    set(key: string, value: any, options?: CacheOptions | undefined): Promise<string> {
        throw new Error("Method not implemented.");
    }
    delete(key: string): void {
        throw new Error("Method not implemented.");
    }
    update?(key: string, value: any, options?: CacheOptions | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }
}