"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurant = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.restaurant = (0, pg_core_1.pgTable)("restaurant", {
    id: (0, pg_core_1.uuid)("id").primaryKey().notNull().defaultRandom(),
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    address: (0, pg_core_1.json)("address").default({ streetName: "", number: "", postalCode: "" }).$type(),
    location: (0, pg_core_1.json)("location").default({ location: 0.0, longitude: 0.0 }).$type(),
    phone: (0, pg_core_1.text)("phone").notNull(),
    cuisines: (0, pg_core_1.json)("cusines").default([]).$type(),
    opening_hours: (0, pg_core_1.json)("opening_hours").default({ monday: { open: "9:00", close: "18:00" } }).$type(),
    rating: (0, pg_core_1.integer)("rating").default(0),
    //   user_id: 
    createdAt: (0, pg_core_1.timestamp)("created_at"),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
});
