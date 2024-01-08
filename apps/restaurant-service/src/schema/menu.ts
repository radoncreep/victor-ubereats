import { json, pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { TimeAvailability } from "../types";
import { menuCategories } from "./menu-category";


export const menus = pgTable("menus", {
    id: text("id").primaryKey().notNull().unique(),
    title: text("title").notNull().unique(),
    subtitle: text("subtitle"),
    availability: json("availability").$type<TimeAvailability[]>()
        .default([{ monday: { start_time: "09:00", end_time: "12:00" }}])  // the availability of this menu
});

export const menusRelations = relations(menus, ({ many }) => ({
    menuCategories: many(menuCategories)
}));