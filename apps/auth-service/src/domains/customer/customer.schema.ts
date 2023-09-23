import { pgTable, text, uuid, jsonb } from "drizzle-orm/pg-core";
import { Address, CardDetails, DeliveryAddress, UserRoles } from "ubereats-types";


export const customers = pgTable("customers", {
	customerId: uuid("id").primaryKey().notNull(),
	firstname: text("first_name").notNull(),
    lastname: text("last_name").notNull(),
	email: text("email").notNull().unique(),
    phone: text("phone_number").notNull().unique(),
    password: text("password").notNull(),
    deliveryAddress: jsonb("delivery_address")
		.$type<DeliveryAddress[]>()
		.default([{
			address: {
				streetName: "",
				number: ""
			},
			location: {
				latitude: 0.0,
				longitude: 0.0
			}
		}])
		.notNull(),
    paymentCards: jsonb("payment_cards").$type<CardDetails[]>().notNull(), 
	role: text("role").default(UserRoles.Customer).notNull()
	// verified true or false
	// deactivated
	// true or fa
	// preferences 
	// favourite restaurants 
	// favourite menuItems
});

export type NewCustomerSchema = typeof customers.$inferInsert;
export type CustomerSchema = typeof customers.$inferSelect;