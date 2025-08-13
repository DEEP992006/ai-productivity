"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, Flag, Edit, Trash2, CheckCircle, Circle } from "lucide-react";
import { statusConfig, StatusType } from "@/features/subGoals/components/StatusConfig";
import { useTodo } from "@/features/todo/todostore";

interface MilestoneCardProps {
  id: number;
  title: string;
  description: string;
  status?: string;
  hrefBase?: string;
  className?: string;
}

export function MilestoneCard({
  id,
  title,
  description,
  status = "Not Started",
  hrefBase = "/subgoals",
  className,
}: MilestoneCardProps) {
  const router = useRouter();
  const { todos } = useTodo();

  // ✅ Filter todos for this subgoal
  const subgoalTodos = todos.filter((todo) => todo.subgoal_id === id);

  // ✅ Determine status automatically
  let calculatedStatus: StatusType;
  if (subgoalTodos.length === 0) {
    calculatedStatus = "Not Started";
  } else if (subgoalTodos.every((todo) => todo.isDone)) {
    calculatedStatus = "Completed";
  } else {
    calculatedStatus = "In Progress";
  }

  const theme = statusConfig[calculatedStatus];
  const href = `${hrefBase}/${id}`;

  // Toggle completion (placeholder)
  const handleToggleComplete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // your toggle complete logic here
  };

  // Delete subgoal (placeholder)
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this milestone?")) {
      // your delete logic here
    }
  };

  // Navigate to edit page
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`${href}/edit`);
  };

  return (
    <Link
      href={href}
      aria-label={`Open milestone ${title}`}
      className={cn(
        "block group focus:outline-none relative",
        "rounded-2xl border bg-white transition-all duration-200",
        "hover:shadow-lg hover:-translate-y-0.5",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        theme.ring,
        className
      )}
    >
      {/* Hover Action Buttons (no nested <a> anymore) */}
      <div className="absolute -top-2 -right-2 flex opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-10">
        <button
          onClick={handleToggleComplete}
          className={cn(
            "p-1.5 rounded-full text-xs border shadow-sm bg-white hover:bg-slate-50",
            "text-slate-600 hover:text-green-600 border-slate-300 hover:border-green-400"
          )}
          aria-label={
            calculatedStatus === "Completed" ? "Mark as incomplete" : "Mark as complete"
          }
        >
          {calculatedStatus === "Completed" ? (
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Circle className="w-3.5 h-3.5" />
          )}
        </button>

        <button
          onClick={handleEdit}
          className="p-1.5 ml-1 rounded-full text-xs border shadow-sm bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 border-slate-300 hover:border-blue-400"
          aria-label="Edit milestone"
        >
          <Edit className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleDelete}
          className="p-1.5 ml-1 rounded-full text-xs border shadow-sm bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border-slate-300 hover:border-red-400"
          aria-label="Delete milestone"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={cn("p-2 rounded-xl shadow-sm", theme.badgeBg)}>
              <Flag className={cn("w-4 h-4", theme.badgeText)} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900 text-sm md:text-base line-clamp-1">
                {title}
              </h3>
              {description ? (
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{description}</p>
              ) : (
                <p className="text-sm text-slate-400 mt-1 italic">No description</p>
              )}
            </div>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap",
              theme.badgeBg,
              theme.badgeText,
              theme.badgeBorder
            )}
          >
            {theme.icon}
            <span>{calculatedStatus}</span>
          </span>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-end text-slate-400 group-hover:text-slate-600 transition-colors">
          <span className="text-xs mr-1">Open</span>
          <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
