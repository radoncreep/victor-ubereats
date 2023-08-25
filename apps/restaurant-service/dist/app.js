"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const express_1 = __importStar(require("express"));
const routes_1 = __importDefault(require("./routes"));
const node_postgres_1 = require("drizzle-orm/node-postgres");
const migrator_1 = require("drizzle-orm/postgres-js/migrator");
const database_1 = require("./config/database");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, express_1.json)({ type: ["application/json"] }));
app.use("/api", routes_1.default);
(async () => {
    try {
        await database_1.pgClient.connect();
        await (0, migrator_1.migrate)((0, node_postgres_1.drizzle)(database_1.pgClient), { migrationsFolder: "migrations" });
    }
    catch (error) {
        console.log(`DB Connection Error: ${error}`);
    }
})();
const db = (0, node_postgres_1.drizzle)(database_1.pgClient);
exports.db = db;
