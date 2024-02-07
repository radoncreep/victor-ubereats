import { relations } from "drizzle-orm";
import { pgTable, text, uuid, integer } from "drizzle-orm/pg-core";

import { restaurants } from "./restaurant";
import { subMenuItemGroup } from "./sub-menu";
import { menuCategories } from "./menu-category";


export const menuitems = pgTable("menuitems", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	price: integer("price").notNull(),
	imageUrl: text("imageUrl").notNull(),
	restaurantId: uuid("restaurantId").references(() => restaurants.id).notNull(),
	menuCategoryId: text("menu-category-id")
});

export const menuitemsRelations = relations(menuitems, ({ one, many }) => ({
	restaurants: one(restaurants, {
		fields: [menuitems.restaurantId],
		references: [restaurants.id]
	}),
	subMenuItemGroups: many(subMenuItemGroup),
	menuCategories: one(menuCategories, {
		fields: [menuitems.menuCategoryId],
		references: [menuCategories.id]
	})
}));

export type NewMenuItemSchema = typeof menuitems.$inferInsert;

export type MenuItemSchema = typeof menuitems.$inferSelect;