import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { menus } from "./menu";
import { customMenuEntity } from "./custom";
import { menuitems } from "./menu-item";
import { restaurants } from "./restaurant";


export const menuCategories = pgTable("menu-categories", {
    id: text("id").unique().primaryKey().notNull(),
    title: text("title").unique().notNull(),
    subtitle: text("subtitle"),
    entity: customMenuEntity("menu-entity").notNull(),
    menuId: text("menu-id").notNull(),
    restaurantId: uuid("restaurant-id").notNull()
});

export const menuCategoriesRelations = relations(menuCategories, ({ many, one }) => ({
    menus: one(menus, {
        fields: [menuCategories.menuId],
		references: [menus.id]
    }),
    restaurants: one(restaurants, {
        fields: [menuCategories.restaurantId],
        references: [restaurants.id]
    }),
    menuItems: many(menuitems)
}));



export type NewMenuCategorySchema = typeof menuCategories.$inferInsert;
export type MenuCategorySchema = typeof menuCategories.$inferSelect;