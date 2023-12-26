import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { restaurants } from "./restaurant";


export const categories = pgTable("categories", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: text("name").notNull().unique(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    restaurants: many(restaurants)
}));