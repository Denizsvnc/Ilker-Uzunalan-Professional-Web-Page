import { pgTable, uuid, varchar, foreignKey } from "drizzle-orm/pg-core";
import { project_details } from "./project_details";

export const my_projects = pgTable(
    "my_projects",
    {
        id: uuid("id").primaryKey().defaultRandom().notNull(),
        cover_img_url: varchar("cover_img_url", { length: 255 }).notNull(),
        details: uuid("details").notNull(),
        title_tr: varchar("title_tr", { length: 255 }),
        title_en: varchar("title_en", { length: 255 }),
        description_tr: varchar("description_tr", { length: 255 }),
        description_en: varchar("description_en", { length: 255 }),
        button_title_tr: varchar("button_title_tr", { length: 255 }),
        button_title_en: varchar("button_title_en", { length: 255 }),
        button_url: varchar("button_url", { length: 255 }),
    },
    (table) => [
        foreignKey({
            columns: [table.details],
            foreignColumns: [project_details.id],
        }),
    ]
);