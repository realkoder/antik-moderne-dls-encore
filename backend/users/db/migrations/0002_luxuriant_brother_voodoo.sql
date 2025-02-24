CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "privilege_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"role" "role"
);
--> statement-breakpoint
ALTER TABLE "privilege_roles" ADD CONSTRAINT "fk_privilege_role_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;