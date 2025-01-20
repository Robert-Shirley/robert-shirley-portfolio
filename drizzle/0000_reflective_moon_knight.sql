CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text,
	"password" text,
	"role" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"depreciated_id" text,
	"provider_id" uuid,
	"deleted" boolean DEFAULT false,
	"currently_enrolled" boolean DEFAULT true,
	"admin_id" text,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email_index" ON "User" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_role_index" ON "User" USING btree ("role");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_provider_id_index" ON "User" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_deleted_index" ON "User" USING btree ("deleted");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_currently_enrolled_index" ON "User" USING btree ("currently_enrolled");