"use server"
import { and, eq, getTableColumns, inArray } from "drizzle-orm";
import { db } from "@/db";
import {Goal, goalTable, type NewGoal} from "@/features/goals/goalSchema"
import { subgoalTable, todoTable } from "@/db/schema";
import type { NewSubgoal, Subgoal } from "@/features/subGoals/subGoalschema";
//get all users goal
export const getAllUserGoals = async (user_id: number) => {
  try {
    const allgoals = await db
      .select()
      .from(goalTable)
      .where(eq(goalTable.user_id, user_id));
    return allgoals;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//new goal
export const newGoalsAction = async(newgoal: NewGoal) => {
  try {
    console.log(newgoal); 
    const todo = await db
    .insert(goalTable)
    .values(newgoal)
    .returning()
    return todo;
  } catch (error) {
    console.log(error);
  }
};

export const getsubGoal = async(id:number) => {
 try {
  const subgoal = await db
  .select()
  .from(subgoalTable)
  .where(eq(subgoalTable.goal_id,id))
  console.log(subgoal);
  return subgoal
 } catch (error) {
  console.log(error);
 }
};
export const getaallsubgoal = async(id:number) => {
    const a = await db.select()
    .from(subgoalTable)
    .where(eq(subgoalTable.goal_id,id))
    console.log(a);
    return a
}
export const newSubGoalsAction = async(NewSubgoal: NewSubgoal) => {
  try {
    console.log(NewSubgoal); 
    const todo = await db
    .insert(subgoalTable)
    .values(NewSubgoal)
    .returning()
    return todo;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteGoalsAction = async (id: number) => {
  try {
    // 1. Find all subgoal IDs for this goal
    const subgoals = await db
      .select({ id: subgoalTable.id })
      .from(subgoalTable)
      .where(eq(subgoalTable.goal_id, id));

    const subgoalIds = subgoals.map(sg => sg.id);

    if (subgoalIds.length > 0) {
      // 2. Delete all todos linked to these subgoals
      await db
        .delete(todoTable)
        .where(inArray(todoTable.subgoal_id, subgoalIds));

      // 3. Delete all subgoals for this goal
      await db
        .delete(subgoalTable)
        .where(eq(subgoalTable.goal_id, id));
    }

    // 4. Delete the goal
    const deletedGoal = await db
      .delete(goalTable)
      .where(eq(goalTable.id, id))
      .returning();

    return deletedGoal;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//toggle goal
export const toggleGoal = async (goalId: number, status: string) => {
  try {
    const updatedGoal = await db
      .update(goalTable)
      .set({ status: status })
      .where(eq(goalTable.id, goalId))
      .returning();
    return updatedGoal;
  } catch (error) {
    console.error("Error toggling goal:", error);
    throw error;
  }
};

//toggle subgoal 
export const toggleSubgoal = async (subgoalId: number, status: string) => {
  try {
    const updatedSubgoal = await db
      .update(subgoalTable)
      .set({ status: status })
      .where(eq(subgoalTable.id, subgoalId))
      .returning();
    return updatedSubgoal;
  } catch (error) {
    console.error("Error toggling subgoal:", error);
    throw error;
  }
};

//delete subgoal
export const DeleteSubGoalsAction = async (id: number) => {
  try {
    // 1. Find all todos linked to this subgoal
    const todos = await db
      .select({ id: todoTable.id })
      .from(todoTable)
      .where(eq(todoTable.subgoal_id, id));

    const todoIds = todos.map(todo => todo.id);

    if (todoIds.length > 0) {
      // 2. Delete all todos linked to this subgoal
      await db
        .delete(todoTable)
        .where(inArray(todoTable.subgoal_id, todoIds));
    }

    // 3. Delete the subgoal
    const deletedSubgoal = await db
      .delete(subgoalTable)
      .where(eq(subgoalTable.id, id))
      .returning();

    return deletedSubgoal;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//edit subgoal
export const EditSubGoalsAction = async (id: number, updatedSubgoal: NewSubgoal) => {
  try {
    const editedSubgoal = await db
      .update(subgoalTable)
      .set(updatedSubgoal)
      .where(eq(subgoalTable.id, id))
      .returning();

    return editedSubgoal;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//edit goal
export const EditGoalsAction = async (id: number, updatedGoal: NewGoal) => {
  try {
    const editedGoal = await db
      .update(goalTable)
      .set(updatedGoal)
      .where(eq(goalTable.id, id))
      .returning();

    return editedGoal;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//delete goal
export const deleteGoal = async (id: number) => {
  try {
    // 1. Find all subgoal IDs for this goal
    const subgoals = await db
      .select({ id: subgoalTable.id })
      .from(subgoalTable)
      .where(eq(subgoalTable.goal_id, id));

    const subgoalIds = subgoals.map(sg => sg.id);

    if (subgoalIds.length > 0) {
      // 2. Delete all todos linked to these subgoals
      await db
        .delete(todoTable)
        .where(inArray(todoTable.subgoal_id, subgoalIds));

      // 3. Delete all subgoals for this goal
      await db
        .delete(subgoalTable)
        .where(eq(subgoalTable.goal_id, id));
    }

    // 4. Delete the goal
    const deletedGoal = await db
      .delete(goalTable)
      .where(eq(goalTable.id, id))
      .returning();

    return deletedGoal;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//edit goal by only taking data json as goal type
export const editGoalAction = async (updatedGoal: Goal) => {
  try {
    const editedGoal = await db
      .update(goalTable)
      .set(updatedGoal)
      .where(eq(goalTable.id, updatedGoal.id))
      .returning();
    return editedGoal;
  } catch (error) {
    console.error("Error editing goal:", error);
    throw error;
  }
}

//edit subgoal by only taking data json as subgoal type
export const editSubgoalAction = async (updatedSubgoal: Subgoal) => {
  try {
    const editedSubgoal = await db
      .update(subgoalTable)
      .set(updatedSubgoal)
      .where(eq(subgoalTable.id, updatedSubgoal.id))
      .returning();
    return editedSubgoal;
  } catch (error) {
    console.error("Error editing subgoal:", error);
    throw error;
  }
}