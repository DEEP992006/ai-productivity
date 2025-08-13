import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Goal, NewGoal } from "@/features/goals/goalSchema";

// Define the store type
export type GoalStore = {
  allGoals: Goal[];
  setGoal: (newGoals: Goal[]) => void;
  addGoal: (newGoal: NewGoal) => void;
  deleteGoal: (id: number) => void;
  clearGoals: () => void;
  getGoalByIndex: (index: number) => Goal | undefined;
  updateGoalStatus: (goalId: number, status: Goal["status"]) => void;
  editGoal: (updatedGoal: Goal) => void; // <-- Added
};

export const useGoal = create<GoalStore>()(
  persist(
    (set, get) => ({
      allGoals: [],

      setGoal: (newGoals) => set({ allGoals: newGoals }),

      addGoal: (newGoal) =>
        set((state) => {
          const tempGoal: Goal = {
            ...newGoal,
            description: newGoal.description ?? null,
            category: newGoal.category ?? null,
            endDate: newGoal.endDate ?? null,
            status: newGoal.status ?? "not_started",
          };
          return {
            allGoals: [tempGoal, ...state.allGoals],
          };
        }),

      deleteGoal: (id) =>
        set((state) => ({
          allGoals: state.allGoals.filter((goal) => goal.id !== id),
        })),

      clearGoals: () => set({ allGoals: [] }),

      getGoalByIndex: (index) => get().allGoals[index],

      updateGoalStatus: (goalId, status) =>
        set((state) => ({
          allGoals: state.allGoals.map((goal) =>
            goal.id === goalId ? { ...goal, status } : goal
          ),
        })),

      // Add editGoal implementation
      editGoal: (updatedGoal) =>
        set((state) => ({
          allGoals: state.allGoals.map((goal) =>
            goal.id === updatedGoal.id ? { ...goal, ...updatedGoal } : goal
          ),
        })),
    }),
    {
      name: "goals-store",
    }
  )
);