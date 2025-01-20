ALTER TABLE "Product" ADD COLUMN "deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "Product" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "ProductCategory" ADD COLUMN "deleted" boolean DEFAULT false;