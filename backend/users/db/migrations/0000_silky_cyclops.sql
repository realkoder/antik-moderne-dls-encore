CREATE TABLE "email_addresses" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"email_address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"external_id" text NOT NULL,
	"first_name" varchar(200) NOT NULL,
	"last_name" varchar(200) NOT NULL,
	"username" varchar(200) NOT NULL,
	"image_url" text,
	"primary_email_address_id" text,
	"created_at" integer NOT NULL,
	"last_sign_in_at" integer,
	"updated_at" integer
);
--> statement-breakpoint
ALTER TABLE "email_addresses" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;