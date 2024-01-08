import { relations } from "drizzle-orm";
import { pgTable, text, uuid, json } from "drizzle-orm/pg-core";

import { menus } from "./menu";


type ItemQuantity = {
    minQuantity: number; 
    maxQuantity: number;
}

export const subMenuItems = pgTable("sub-menu-items", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name").notNull(),
	quantityDetail: json("quantity_details").$type<ItemQuantity>().default({ minQuantity: 0, maxQuantity: 2 }),
    displayType: text("display_type", { enum: ["expanded", "collapsed"] }),
    menuId: text("menu-id")
});

export const subMenuItemRelations = relations(subMenuItems, ({ one }) => ({
    menu: one(menus, {
        fields: [subMenuItems.menuId],
        references: [menus.id]
    })
}));
