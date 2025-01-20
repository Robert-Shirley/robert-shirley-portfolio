CREATE TABLE IF NOT EXISTS "Product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"image_url" text,
	"price" text,
	"inventory_count" text,
	"category_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"user_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProductCategory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"image_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"user_id" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Product" ADD CONSTRAINT "Product_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_category_id_index" ON "Product" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_name_index" ON "Product" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_category_name_index" ON "ProductCategory" USING btree ("name");