import { text, timestamp, pgTable, json, integer, uuid, pgSchema } from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

import { RestaurantAddress, RestaurantLocation, Cuisine } from "../entities/restaurant";
import { menuitems } from "./menu-item";
import { categories } from "./categories";
import { TimeAvailability } from "../types";
import { menus } from "./menu";
import { subMenuItemGroup } from "./sub-menu";

export type DbImage = {
  id: string;
  name?: string;
  url: string;
}


export const restaurants = pgTable("restaurants", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  address: json("address").notNull().$type<RestaurantAddress>(),
  location: json("location").default({ location: 0.0, longitude: 0.0 }).$type<RestaurantLocation>(),
  phone: text("phone").notNull().unique(),
  cuisines: json("cusines").default([]).$type<Cuisine[]>(),
  openingHours: json("opening_hours").$type<TimeAvailability[]>()
    .default([{ monday: { startTime: "09:00", endTime: "18:00"}}]),
  rating: integer("rating").default(0),
  mainImage: json("main_image").notNull(), 
  featured_images: json("featured_images").default([]).$type<DbImage>(),
  createdAt: timestamp("created_at").$default(() => new Date()),
  updatedAt: timestamp("updated_at").$default(() => new Date()),
  categoryId: uuid("category_id").notNull().references(() => categories.id) // references are typically kept on the many side
});

export const restaurantRelations = relations(restaurants, ({ many, one }) => ({
  menuItems: many(menuitems),
  categories: one(categories, {
    fields: [restaurants.categoryId],
    references: [categories.id]
  }),
  menus: many(menus),
  subMenuItemGroups: many(subMenuItemGroup)
}));

export const selectRestaurantSchema = createSelectSchema(restaurants);

// const zodTimeTransformer = z.custom((value) => {
//   if (typeof value !== "string") throw new Error("invalid type");
//   const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/; 
  
//   if (!timeRegex.test(value)) {
//     throw new Error("Invalid 24-hour time format");
//   }

//   const [hours, minutes] = value.split(":").map(Number);
//   if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
//     throw new Error("Invalid hours or minutes");
//   }

//   return new Date(`2000-01-01T${value}:00Z`);
// });

export const insertRestaurantSchema = createInsertSchema(restaurants, {
  name: (schema) => schema.name.nonempty().trim().min(3),
  address: z.object({
    streetName: z.string(),
    number: z.string(),
    postalCode: z.string()
  }),
  location: z.object({
    longitude: z.string(),
    latitude: z.string()
  }),
  phone: (schema) => schema.phone.min(10).max(11),
  cuisines: z.array(z.enum(["african", "nigerian", "italian"])),
  openingHours: z.object({
    open: z.string(),
    close: z.string()
  })
  // image: (schema) => schema.image.
});

export const uniqueRestaurantFields = createSelectSchema(restaurants, {
  name: (schema) => schema.name.nonempty().trim().min(3),
  phone: (schema) => schema.phone.min(10).max(11)
})

// export const deleteRestaurantSchema = createCheckSchema((fields) => )

export type RestaurantSchema = typeof restaurants.$inferSelect;
export type NewRestaurantSchema = typeof restaurants.$inferInsert;
