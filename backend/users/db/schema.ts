import * as p from "drizzle-orm/pg-core";

// IMPORTANT WHEN THIS IS UPADTED 
// Run the following command in the directory containing drizzle.config.ts to generate migrations:
// >>>> npx drizzle-kit generate

export const users = p.pgTable("users", {
    id: p.text().primaryKey(),
    external_id: p.text().notNull(),
    first_name: p.varchar({ length: 200 }).notNull(),
    last_name: p.varchar({ length: 200 }).notNull(),
    username: p.varchar({ length: 200 }).notNull(),
    image_url: p.text(),
    primary_email_address_id: p.text(),
    created_at: p.bigint({mode: "number"}).notNull(),
    last_sign_in_at: p.bigint({mode: "number"}),
    updated_at: p.bigint({mode: "number"}),
});

export const email_addresses = p.pgTable("email_addresses", {
    id: p.text().primaryKey(),
    user_id: p.text().notNull(),
    email_address: p.text().notNull(),
}, (table) => [
    p.foreignKey({
        columns: [table.user_id],
        foreignColumns: [users.id],
        name: "fk_user_id"
    })
]);