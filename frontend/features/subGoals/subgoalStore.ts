// stores/subgoalStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Subgoal, NewSubgoal } from "@/features/subGoals/subGoalschema";

interface SubgoalState {
  subgoals: Subgoal[];
  setSubgoals: (newSubgoals: Subgoal[]) => void;
  addSubgoal: (newSubgoal: NewSubgoal, user_id: number, goal_id: number, id: number) => void;
  updateSubgoal: (updated: Subgoal) => void;
  updateSubgoalStatus: (id: number, status: string) => void;
  deleteSubgoal: (id: number) => void;
  toggleSubgoal: (id: number) => void;
  //edit subgoal
  editSubgoal: (updated: Subgoal) => void;
}

export const useSubgoal = create<SubgoalState>()(
  persist(
    (set) => ({
      subgoals: [],

      setSubgoals: (newSubgoals) => set({ subgoals: newSubgoals }),

      addSubgoal: (newSubgoal, user_id, goal_id, id) =>
        set((state) => {
          const fullSubgoal = {
            ...newSubgoal,
            id,
            user_id,
            goal_id,
            isdone: false,
            status: "Not Started",
            createdAt: new Date(),
            updatedAt: new Date(),
          } as Subgoal;

          return { subgoals: [fullSubgoal, ...state.subgoals] };
        }),

      updateSubgoal: (updated) =>
        set((state) => ({
          subgoals: state.subgoals.map((sg) =>
            sg.id === updated.id ? { ...updated, updatedAt: new Date() } : sg
          ),
        })),

      updateSubgoalStatus: (id, status) =>
        set((state) => ({
          subgoals: state.subgoals.map((sg) =>
            sg.id === id ? { ...sg, status, updatedAt: new Date() } : sg
          ),
        })),

      deleteSubgoal: (id) =>
        set((state) => ({
          subgoals: state.subgoals.filter((sg) => sg.id !== id),
        })),

      toggleSubgoal: (id) =>
        set((state) => ({
          subgoals: state.subgoals.map((sg) =>
            sg.id === id ? { ...sg, isdone: !sg.isdone, updatedAt: new Date() } : sg
          ),
        })),
      editSubgoal: (updated) =>
        set((state) => ({
          subgoals: state.subgoals.map((sg) =>
            sg.id === updated.id ? { ...updated, updatedAt: new Date() } : sg
          ),
        })),
    }),
    { name: "subgoal-store" }
  )
);
