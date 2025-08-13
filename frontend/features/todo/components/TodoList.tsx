"use client";
import { Clock, CheckCircle2, Search } from "lucide-react";
import TodoSection from "./TodoSection";
import { SingleTodo } from "./SingleTodo";
import type { Todo } from "../todoSchema";

export default function TodoList({ todos, searchText }: { todos: Todo[]; searchText: string }) {
  const pending = todos.filter((t) => !t.isDone);
  const completed = todos.filter((t) => t.isDone);

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-700 mb-2">No todos found</h3>
        <p className="text-slate-500">
          {searchText ? `No todos match "${searchText}"` : "Create your first todo to get started!"}
        </p>
      </div>
    );
  }

  return (
    <>
      {pending.length > 0 && (
        <TodoSection title={`Pending Tasks (${pending.length})`} icon={<Clock className="w-5 h-5 text-orange-500" />}>
          {pending.map((todo) => (
            <SingleTodo key={todo.id} todo={todo} />
          ))}
        </TodoSection>
      )}
      {completed.length > 0 && (
        <TodoSection title={`Completed Tasks (${completed.length})`} icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}>
          {completed.map((todo) => (
            <div key={todo.id} className="opacity-70">
              <SingleTodo todo={todo} />
            </div>
          ))}
        </TodoSection>
      )}
    </>
  );
}
