CREATE TABLE IF NOT EXISTS "ProductRating" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rate" text,
	"count" text,
	"product_id" uuid,
	"user_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_rating_product_id_index" ON "ProductRating" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_rating_user_id_index" ON "ProductRating" USING btree ("user_id");