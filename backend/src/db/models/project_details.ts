import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { my_projects } from "./my_projects";

export const project_details = pgTable("project_details", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    details: uuid("details").references(() => my_projects.id, { onDelete: 'cascade' }).notNull(),
    url: varchar("url", { length: 255 }).notNull(),
    type: varchar("type", { length: 20 }).notNull().default('image'),
})