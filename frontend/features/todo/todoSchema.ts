import {
  pgTable,
  integer,
  varchar,
  boolean,
  timestamp,
  json,
  bigint
} from "drizzle-orm/pg-core";
import { goalTable, usersTable } from "@/db/schema";
import { subgoalTable } from "@/features/subGoals/subGoalschema";

// todo table
export const todoTable = pgTable("todotable", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 2000 }),

  user_id: integer("user_id").notNull().references(() => usersTable.id),

  isDone: boolean("is_done").default(false),
  category: varchar("category", { length: 100 }),
  priority: varchar("priority", { length: 100 }),
  startDate: timestamp("start_date", { mode: "date" }),
  endDate: timestamp("end_date", { mode: "date" }),

  // Foreign keys
  goal_id:  bigint("goal_id", { mode: "number" }).references(() => goalTable.id),
  subgoal_id:  bigint("subgoal_id", { mode: "number" }).references(() => subgoalTable.id),
});

// types
// for inserting
// for fetching
export type Todo = typeof todoTable.$inferSelect & {
  goalName: string | null;
  subgoalName: string | null;
};

export type NewTodo = typeof todoTable.$inferInsert & {
  goalName: string | null;
  subgoalName: string | null;
};