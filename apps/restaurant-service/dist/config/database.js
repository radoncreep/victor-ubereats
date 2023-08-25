"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgClient = void 0;
const pg_1 = require("pg");
const client = new pg_1.Client({
    host: "127.0.0.1",
    port: 5432,
    user: "mac",
    password: "1234",
    database: "restaurant"
});
exports.pgClient = client;
