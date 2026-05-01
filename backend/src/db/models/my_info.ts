import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const my_info = pgTable("my_info", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    pp_url: varchar("pp_url", { length: 255 }),
    phone_number: varchar("phone_number", { length: 255 }),
    email: varchar("email", { length: 255 }),
    linkedin_url: varchar("linkedin_url", { length: 255 }),
    instagram_url: varchar("instagram_url", { length: 255 }),
    youtube_url: varchar("youtube_url", { length: 255 }),


})