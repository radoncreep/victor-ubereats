"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuitems = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.menuitems = (0, pg_core_1.pgTable)("menuitems", {
    id: (0, pg_core_1.bigserial)("id", { mode: "bigint" }).primaryKey().notNull(),
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description"),
    price: (0, pg_core_1.text)("price").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url").notNull(),
});
