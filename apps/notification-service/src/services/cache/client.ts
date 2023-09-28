import { CacheServiceInterface } from "./cache.interface";


export class CacheService implements CacheServiceInterface {
    insert(key: string, value: any): Promise<string> {
        throw new Error("Method not implemented.");
    }
    get(key: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(key: string): void {
        throw new Error("Method not implemented.");
    }
    
}