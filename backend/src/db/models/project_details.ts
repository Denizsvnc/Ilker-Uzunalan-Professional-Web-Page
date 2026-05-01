import { datetime } from "drizzle-orm/mysql-core";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const project_details = pgTable("project_details", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    img_url: varchar("img_url", { length: 255 }).notNull(),
    video_url: varchar("video_url", { length: 255 }),
    title_tr: varchar("title_tr", { length: 255 }),
    title_en: varchar("title_en", { length: 255 }),
    description_tr: varchar("description_tr", { length: 255 }),
    description_en: varchar("description_en", { length: 255 }),

})