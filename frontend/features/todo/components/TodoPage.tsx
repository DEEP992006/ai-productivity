"use client";
import { useEffect, useState } from "react";
import { useTodo } from "@/features/todo/todostore";
import { useDialog } from "@/hooks/usedialog";
import NewTodoDialog from "@/features/todo/components/NewTodo";
import TodoHeader from "@/features/todo/components/TodoHeader";
import TodoEmptyState from "@/features/todo/components/TodoEmptyStateTodoEmptyState";
import TodoStats from "@/features/todo/components/TodoStats";
import TodoList from "@/features/todo/components/TodoList";
import type { Todo } from "@/features/todo/todoSchema";

export default function TodoPage({ allTodo }: { allTodo: Todo[] }) {
  const { todos, setTodos } = useTodo();
  const [searchText, setSearchText] = useState("");
  const { isOpen, open, close } = useDialog();

  useEffect(() => {
    setTodos(allTodo);
  }, [allTodo, setTodos]);

  const completedTodos = todos.filter((t) => t.isDone).length;
  const totalTodos = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <TodoHeader searchText={searchText} setSearchText={setSearchText} openDialog={open} totalTodos={totalTodos} />
        {totalTodos === 0 ? (
          <TodoEmptyState onCreate={open} />
        ) : (
          <>
            <TodoStats total={totalTodos} completed={completedTodos} />
            <TodoList todos={todos.filter((t) =>
              searchText ? t.name.toLowerCase().includes(searchText.toLowerCase()) : true
            )} searchText={searchText} />
          </>
        )}
        <NewTodoDialog isOpen={isOpen} setIsOpen={close} />
      </div>
    </div>
  );
}
