CREATE TABLE IF NOT EXISTS "customers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"password" text NOT NULL,
	"delivery_address" jsonb DEFAULT '[{"address":{"streetName":"","number":""},"location":{"latitude":0,"longitude":0}}]'::jsonb NOT NULL,
	"payment_cards" jsonb NOT NULL,
	"role" text DEFAULT 'customer' NOT NULL,
	CONSTRAINT "customers_email_unique" UNIQUE("email"),
	CONSTRAINT "customers_phone_number_unique" UNIQUE("phone_number")
);
