import { RedisClientOptions, RedisClientType, RedisModules, createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

import { CacheInterface, CacheOptions } from "./cache.interface";

type CacheConnectionType = {
    password: string;
    host: string;
    port: number;
}
export class RedisCacheService implements CacheInterface {
    private client: RedisClientType;

    constructor(private connectionOptions: CacheConnectionType) {
        this.client = createClient({
            password: connectionOptions.password,
            socket: {
                host: connectionOptions.host,
                port: connectionOptions.port || 11115
            }
        });
        this.client.on('error', (err) => {
            throw err;
        })
    }

    public async connect(): Promise<void> {
        try {
            await this.client.connect();
            console.log("Cache connected.")
        } catch (error) {
            throw new Error("Cache Error: ", error);
        }
    }

    public async stopConnection(): Promise<void> {
        await this.client.disconnect();
    }

    public async get(key: string): Promise<any> {
        return await this.client.get(key);
    }

    public async set(key: string, value: any, options?: CacheOptions): Promise<string | null> {
        try {
            return await this.client.set(key, JSON.stringify(value));
        } catch (error) {
            // console.log(error)
            // throw new Error("Set Cache Error: ", error);
        }
    }

    public async delete(key: string): Promise<void> {
        await this.client.del(key);
    }

    update?(key: string, value: any, options?: CacheOptions | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }
}

// (async () => {
//     const client = new RedisCacheService();
//     try {
//         // await client.connect();

//         await client.set("password", "kerngkrengkenr");

//         console.log(await client.get("password"))
//     } catch (error) {
//         console.log(error)
//     }
// })()
