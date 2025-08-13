"use client";

import React, { useState } from "react";
import { Todo } from "@/features/todo/todoSchema";
import { updateTodosStatus, deleteTodoFromdb } from "@/features/todo/todoaction";
import { Button } from "@/components/ui/button";
import EditTodoDialog from "./EditTodoDialog";
import { useTodo } from "@/features/todo/todostore";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Target, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShowDate } from "@/components/ShowDate";
import { useDialog } from "@/hooks/usedialog";
import { getPriorityConfig } from "@/features/todo/components/getPriorityConfig";

export const SingleTodo = ({ todo }: { todo: Todo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleTodo, deleteTodo } = useTodo();
  const { open, isOpen, close } = useDialog();

  const {
    id,
    user_id,
    name,
    description,
    category,
    priority,
    endDate,
    isDone,
    goalName,
    subgoalName,
  } = todo;

  // Toggle todo status
  const handleToggle = async () => {
    toggleTodo(id);
    await updateTodosStatus(user_id, id, !isDone);
  };

  // Delete todo
  const handleDelete = (id: number) => {
    deleteTodo(id);
    deleteTodoFromdb(id);
  };

  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-white shadow-sm transition-all duration-200",
        "hover:shadow-md hover:border-border",
        isDone && "opacity-75 bg-muted/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        {/* === Header === */}
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <Checkbox
            checked={!!isDone}
            onCheckedChange={handleToggle}
            className={cn(
              "h-5 w-5 rounded-full border-2 transition-all duration-200",
              "data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600",
              "hover:border-slate-400"
            )}
          />

          {/* Title + Description */}
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "text-base font-semibold leading-tight transition-all duration-200",
                isDone ? "line-through text-muted-foreground" : "text-foreground"
              )}
            >
              {name}
            </h3>
            {description && (
              <p className="mt-0 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div
            className={cn(
              "flex items-center gap-1 opacity-0 transition-all duration-200",
              "group-hover:opacity-100"
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground"
              onClick={open}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => handleDelete(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* === Metadata === */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {/* Priority */}
          {priority && priority !== "None" && (
            <Badge
              variant="outline"
              className={cn(
                "capitalize font-medium border flex items-center gap-1",
                getPriorityConfig(priority).className
              )}
            >
              {getPriorityConfig(priority).icon}
              <span>{priority}</span>
            </Badge>
          )}

          {/* Category */}
          {category && (
            <Badge
              variant="outline"
              className="capitalize font-medium text-emerald-700 border-emerald-200 bg-emerald-50"
            >
              {category}
            </Badge>
          )}

          {/* Goal */}
          {goalName && (
            <Badge
              variant="outline"
              className="font-medium text-violet-700 border-violet-200 bg-violet-50 flex items-center gap-1"
            >
              <Target className="h-3 w-3" />
              {goalName}
            </Badge>
          )}

          {/* Subgoal */}
          {subgoalName && (
            <Badge
              variant="secondary"
              className="font-medium bg-slate-100 text-slate-700"
            >
              {subgoalName}
            </Badge>
          )}

          {/* Due Date */}
          {endDate && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              <ShowDate date={endDate} />
            </div>
          )}
        </div>
      </div>

      {/* === Edit Dialog === */}
      <EditTodoDialog initialData={todo} open={isOpen} setisOpen={close} />
    </div>
  );
};
