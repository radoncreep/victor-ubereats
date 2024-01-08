CREATE TABLE IF NOT EXISTS "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu-categories" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"menu-entity" jsonb,
	"menu-id" text,
	CONSTRAINT "menu-categories_id_unique" UNIQUE("id"),
	CONSTRAINT "menu-categories_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menus" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"availability" json DEFAULT '[{"monday":{"start_time":"09:00","end_time":"12:00"}}]'::json,
	CONSTRAINT "menus_id_unique" UNIQUE("id"),
	CONSTRAINT "menus_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menuitems" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"imageUrl" text NOT NULL,
	"restaurantId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"address" json NOT NULL,
	"location" json DEFAULT '{"location":0,"longitude":0}'::json,
	"phone" text NOT NULL,
	"cusines" json DEFAULT '[]'::json,
	"opening_hours" json DEFAULT '[{"monday":{"start_time":"09:00","end_time":"18:00"}}]'::json,
	"rating" integer DEFAULT 0,
	"main_image" json NOT NULL,
	"featured_images" json DEFAULT '[]'::json,
	"created_at" timestamp,
	"updated_at" timestamp,
	"category_id" uuid NOT NULL,
	CONSTRAINT "restaurants_name_unique" UNIQUE("name"),
	CONSTRAINT "restaurants_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sub-menu-items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"quantity_details" json DEFAULT '{"minQuantity":0,"maxQuantity":2}'::json,
	"display_type" text,
	"menu-id" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menuitems" ADD CONSTRAINT "menuitems_restaurantId_restaurants_id_fk" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
