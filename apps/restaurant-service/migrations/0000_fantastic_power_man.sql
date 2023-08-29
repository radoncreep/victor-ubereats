CREATE TABLE IF NOT EXISTS "menuitems" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" text NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurant" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"address" json NOT NULL,
	"location" json DEFAULT '{"location":0,"longitude":0}'::json,
	"phone" text NOT NULL,
	"cusines" json DEFAULT '[]'::json,
	"opening_hours" json DEFAULT '{"monday":{"open":"9:00","close":"18:00"}}'::json,
	"rating" integer DEFAULT 0,
	"image" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
