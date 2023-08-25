import { pgTable, bigserial, text } from "drizzle-orm/pg-core";

export const menuitems = pgTable("menuitems", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	price: text("price").notNull(),
	imageUrl: text("image_url").notNull(),
});

export type NewMenuItemSchema = typeof menuitems.$inferInsert;
export type MenuItemSchema = typeof menuitems.$inferSelect;