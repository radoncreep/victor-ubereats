import { RedisCacheService } from "ubereats-cache-pkg";

const password =  process.env.REDIS_CLIENT_PASSWORD;
const host = process.env.REDIS_CLIENT_HOST

export const redisCacheClient = new RedisCacheService({
    host,
    password,
    port: 11115
});