import { Client } from "pg";

const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: "mac",
    password: "1234",
    database: "restaurant"
});

export { client as pgClient };