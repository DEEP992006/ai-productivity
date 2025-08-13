"use client";

import { ShowDate } from "@/components/ShowDate";
import { useSubgoal } from "@/features/subGoals/subgoalStore";
import { SingleTodo } from "@/features/todo/components/SingleTodo";
import { useTodo } from "@/features/todo/todostore";
import {
  TrendingUp,
  Calendar,
  ListChecks,
  ChevronLeft,
  Target,
  Plus,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import NewTaskButton from "@/features/todo/components/NewTodoButton";
import EditSubGoalButton from "@/features/subGoals/components/EditSubGoalButton";

const Page = () => {
 const { id } = useParams();
  const { subgoals, updateSubgoalStatus } = useSubgoal();
  const { todos } = useTodo();

  const subgoal = subgoals.find((sg) => sg.id === Number(id));

  const tasks = subgoal
    ? todos.filter((t) => t.subgoal_id === subgoal.id)
    : [];

  // Auto-calculate status based on tasks
  let computedStatus: string;
  if (!subgoal || tasks.length === 0) {
    computedStatus = "Not Started";
  } else if (tasks.every((t) => t.isDone)) {
    computedStatus = "Completed";
  } else {
    computedStatus = "In Progress";
  }

  const completionPercentage = tasks.length
    ? Math.round(
        (tasks.filter((t) => t.isDone).length / tasks.length) * 100
      )
    : 0;

  // ✅ Hook is always called, even if subgoal is undefined
  useEffect(() => {
    if (subgoal && subgoal.status !== computedStatus) {
      updateSubgoalStatus(subgoal.id, computedStatus);
    }
  }, [computedStatus, subgoal, updateSubgoalStatus]);

  if (!subgoal) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading subgoal details...</p>
        </div>
      </div>
    );
  }
const { name, description, endDate, status, isdone } = subgoal;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href={`/goals/${subgoal.goal_id}`}
            className="inline-flex items-center text-slate-600 hover:text-slate-900 group transition-colors"
          >
            <div className="p-2 rounded-lg group-hover:bg-slate-100 mr-2 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to Goal</span>
          </Link>
        </div>

        {/* Subgoal Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                {name &&  <h1 className="text-3xl font-bold text-slate-900 leading-tight">
                  {name}
                </h1>}
                {description && (
                  <p className="text-slate-500 mt-2 max-w-2xl">{description}</p>
                )}
              </div>
            </div>

           
              <EditSubGoalButton data={subgoal} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Status Card */}
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  isdone
                    ? "bg-green-100"
                    : status === "In Progress"
                    ? "bg-yellow-100"
                    : "bg-purple-100"
                }`}
              >
                <TrendingUp
                  className={`w-5 h-5 ${
                    isdone
                      ? "text-green-600"
                      : status === "In Progress"
                      ? "text-yellow-600"
                      : "text-purple-600"
                  }`}
                />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Status</p>
                <p className="text-base font-semibold text-slate-900">
                  {computedStatus}
                </p>
              </div>
            </div>
          </div>

          {/* End Date Card */}
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">End Date</p>
                <p className="text-base font-semibold text-slate-900">
                  {endDate ? <ShowDate date={endDate} /> : "Not set"}
                </p>
              </div>
            </div>
          </div>

          {/* Completion Card */}
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <ListChecks className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-slate-500 text-sm">Progress</p>
                  <span className="text-sm font-medium text-slate-700">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {tasks.filter((t) => t.isDone).length} of {tasks.length} tasks
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-slate-900">Tasks</h2>
              <span className="text-slate-500 text-sm bg-slate-100 px-2 py-1 rounded-md">
                {tasks.length}
              </span>
            </div>

            <NewTaskButton subgoal_id={Number(id)}>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                <span>New Task</span>
              </Button>
            </NewTaskButton>
          </div>

          {tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map((t) => (
                <SingleTodo key={t.id} todo={t} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ListChecks className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-1">
                No tasks yet
              </h3>
              <p className="text-slate-500 mb-4 max-w-md mx-auto">
                Add your first task to start making progress on this milestone.
              </p>
              <NewTaskButton subgoal_id={Number(id)}>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Task</span>
                </Button>
              </NewTaskButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
