import { serial, text, timestamp, pgTable, json, integer, decimal, uuid } from "drizzle-orm/pg-core";
import { RestaurantAddress, RestaurantLocation, Cusine, OpeningHours } from "../entities/restaurant";


export const restaurant = pgTable("restaurant", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  address: json("address").default({ streetName: "", number: "", postalCode: "" }).$type<RestaurantAddress>(),
  location: json("location").default({ location: 0.0, longitude: 0.0 }).$type<RestaurantLocation>(),
  phone: text("phone").notNull(),
  cuisines: json("cusines").default([]).$type<Cusine[]>(),
  opening_hours: json("opening_hours").default({ monday: { open: "9:00", close: "18:00"}}).$type<OpeningHours>(),
  rating: integer("rating").default(0),
//   user_id: 
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export type RestaurantSchema = typeof restaurant.$inferSelect;
export type NewRestaurantSchema = typeof restaurant.$inferInsert;