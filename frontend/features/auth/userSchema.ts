import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { json } from "stream/consumers";

export const usersTable = pgTable("user", {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
export type UserSchema = typeof usersTable.$inferInsert;
