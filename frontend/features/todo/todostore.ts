 import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo, NewTodo } from "@/features/todo/todoSchema";

interface TodoState {
  todos: Todo[];
  setTodos: (newTodos: Todo[]) => void;
  addTodo: (newTodo: NewTodo, user_id: number) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const useTodo = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],

      setTodos: (newTodos) => set({ todos: newTodos }),

      addTodo: (newTodo, user_id) =>
        set((state) => {
          const fullTodo = {
            ...newTodo,
            id: Math.floor(Math.random() * 1000000),
            user_id,
          } as Todo;
          return { todos: [fullTodo, ...state.todos] };
        }),

      updateTodo: (updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
          ),
        })),
    }),
    {
      name: "todo-store", // localStorage key
    }
  )
);        