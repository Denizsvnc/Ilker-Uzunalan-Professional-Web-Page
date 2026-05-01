import {pgTable, uuid, varchar} from "drizzle-orm/pg-core";
import {userRoles} from "./enums";
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    name: varchar("name", {length:255}).notNull(),
    email: varchar("email", {length:255}).notNull().unique(),
    password: varchar("password", {length:255}).notNull(),
    role: userRoles("role").notNull().default("user"),
})