CREATE TABLE IF NOT EXISTS "restaurant" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"address" json DEFAULT '{"streetName":"","number":"","postalCode":""}'::json,
	"location" json DEFAULT '{"location":0,"longitude":0}'::json,
	"phone" text NOT NULL,
	"cusines" json DEFAULT '[]'::json,
	"opening_hours" json DEFAULT '{"monday":{"open":"9:00","close":"18:00"}}'::json,
	"rating" integer DEFAULT 0,
	"created_at" timestamp,
	"updated_at" timestamp
);
