export interface CacheServiceInterface {
    insert(key: string, value: any): Promise<string>;
    get(key: string): Promise<any>;
    delete(key: string): void;
}