"use client";

import { useEffect } from "react";
import { getAllUserTodos } from "@/features/todo/todoaction";
import TodoPage from "@/features/todo/components/TodoPage";
import { useTodo } from "@/features/todo/todostore";
import { getuser } from "@/lib/actions/getuser";

export default function DashboardTodosPage() {
  const { todos, setTodos } = useTodo();

  useEffect(() => {
    const fetchTodos = async () => {
      if (todos.length > 0) return; // Already cached, skip fetch

      const user_id = await getuser();
      if (!user_id) return;

      const allTodos = await getAllUserTodos(user_id);
      if (allTodos) setTodos(allTodos);
    };

    fetchTodos();
  }, [todos.length, setTodos]);

  return <TodoPage allTodo={todos} />;
}
