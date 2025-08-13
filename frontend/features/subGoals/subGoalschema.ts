import {
  pgTable,
  integer,
  varchar,
  timestamp,
  boolean,
  pgEnum,
  bigint,
} from "drizzle-orm/pg-core";
import { goalTable, usersTable } from "@/db/schema";

export const subgoalTable = pgTable("subgoaltable", {
  id: bigint("id", { mode: "number" }).primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 2000 }),

  status: varchar("status").default("not_started").notNull(),

  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),

  goal_id: bigint("goal_id", { mode: "number" })
    .notNull()
    .references(() => goalTable.id),
  isdone:boolean().default(false),
  endDate: timestamp("created_at").defaultNow(),
});

export type Subgoal = typeof subgoalTable.$inferSelect;
export type NewSubgoal = typeof subgoalTable.$inferInsert;
