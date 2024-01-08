import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

import { menus } from "./menu";
import { customMenuEntity } from "./custom";


export const menuCategories = pgTable("menu-categories", {
    id: text("id").unique().primaryKey().notNull(),
    title: text("title").unique().notNull(),
    subtitle: text("subtitle"),
    entity: customMenuEntity("menu-entity"),
    menuId: text("menu-id")
});

export const menuCategoriesRelations = relations(menuCategories, ({ many, one }) => ({
    menu: one(menus, {
        fields: [menuCategories.menuId],
		references: [menus.id]
    })
}));



export type NewMenuCategorySchema = typeof menuCategories.$inferInsert;
export type MenuCategorySchema = typeof menuCategories.$inferSelect;