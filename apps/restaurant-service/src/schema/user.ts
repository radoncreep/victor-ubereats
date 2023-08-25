import { serial, text, timestamp, pgTable, pgEnum } from "drizzle-orm/pg-core";


enum UserRoleEnum {
  Customer = "customer",
  Vendor = "vendor",
  Rider = "rider"
}

export const roleEnum = pgEnum('role', [
  UserRoleEnum.Customer, 
  UserRoleEnum.Rider, 
  UserRoleEnum.Vendor 
]);

export const user = pgTable("user", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum('role').notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;