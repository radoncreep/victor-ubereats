import { RedisClientType, createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

import { CacheInterface, CacheOptions } from "./cache.interface";


export class RedisCacheService implements CacheInterface {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            password: process.env.REDIS_CLIENT_PASSWORD as string,
            socket: {
                host: 'redis-11115.c300.eu-central-1-1.ec2.cloud.redislabs.com',
                port: 11115
            }
        });
        this.client.on('error', (err) => {
            throw err;
        })
    }

    public async connect(): Promise<void> {
        await this.client.connect();
    }

    public async stopConnection(): Promise<void> {
        await this.client.disconnect();
    }

    public async get(key: string): Promise<any> {
        return await this.client.get(key);
    }

    public async set(key: string, value: any, options?: CacheOptions): Promise<string | null> {
     
        if (typeof value == "string") {
            return await this.client.set(key, value);
        }

        return null;
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
//         await client.connect();

//         await client.set("password", "kerngkrengkenr");

//         console.log(await client.get("password"))
//     } catch (error) {
//         console.log(error)
//     }
// })()
