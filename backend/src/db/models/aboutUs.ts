import {pgTable, uuid, varchar} from "drizzle-orm/pg-core";

export const about_us = pgTable("about_us",{
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    img_url: varchar("img_url", {length:255}).notNull(),
    title_tr: varchar("title_tr", {length:255}),
    title_en: varchar("title_en", {length:255}),

    description_tr: varchar("description_tr", {length:255}),
    description_en: varchar("description_en", {length:255}),
    button_title_tr: varchar("button_title_tr", {length:255}),
    button_title_en: varchar("button_title_en", {length:255}),
    button_url: varchar("button_url", {length:255}),
});