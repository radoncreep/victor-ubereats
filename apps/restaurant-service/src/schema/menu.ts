import { json, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { TimeAvailability } from "../types";
import { menuCategories } from "./menu-category";
import { restaurants } from "./restaurant";


export const menus = pgTable("menus", {
    id: text("id").primaryKey().notNull().unique(),
    title: text("title").notNull().unique(),
    subtitle: text("subtitle").$type<string | null>(),
    availability: json("availability").$type<TimeAvailability[]>()
        .default([{ monday: { startTime: "09:00", endTime: "23:59" }}]),
    restaurantId: uuid("restaurant-id").notNull()
});

export const menusRelations = relations(menus, ({ many, one }) => ({
    menuCategories: many(menuCategories),
    restaurants: one(restaurants, {
        fields: [menus.restaurantId],
        references: [restaurants.id]
    })
}));

export type NewMenuSchema = typeof menus.$inferInsert;
// export type MenuSchema = Omit<typeof menus.$inferSelect, "subtitle"> & { subtitle?: string };
export type MenuSchema = typeof menus.$inferSelect;