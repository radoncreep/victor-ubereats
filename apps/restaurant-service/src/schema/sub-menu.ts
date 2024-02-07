import { relations } from "drizzle-orm";
import { pgTable, text, uuid, json } from "drizzle-orm/pg-core";

import { menuitems } from "./menu-item";
import { customMenuEntity } from "./custom";
import { restaurants } from "./restaurant";


type ItemQuantity = {
    minQuantity: number; 
    maxQuantity: number;
}

export const subMenuItemGroup = pgTable("sub-menu-item-groups", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	quantityDetail: json("quantity_details").$type<ItemQuantity>().default({ minQuantity: 0, maxQuantity: 2 }),
    options: customMenuEntity("options"),
    displayType: text("display_type", { enum: ["expanded", "collapsed"] }).default("collapsed"),
    menuItemId: text("menu-item-id"),
    restaurantId: uuid("restaurant-id")
});

export const subMenuItemRelations = relations(subMenuItemGroup, ({ one }) => ({
    menuItems: one(menuitems, {
        fields: [subMenuItemGroup.menuItemId],
        references: [menuitems.id]
    }),
    restaurants: one(restaurants, {
        fields: [subMenuItemGroup.restaurantId],
        references: [restaurants.id]
    })
}));

export type SubMenuItemGroupSchema = typeof subMenuItemGroup.$inferSelect;
export type NewSubMenuItemGroupSchema = typeof subMenuItemGroup.$inferInsert;