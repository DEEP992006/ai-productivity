// @/app/goals/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGoal } from "@/features/goals/GoalStore";
import { useSubgoal } from "@/features/subGoals/subgoalStore";
import { getaallsubgoal, toggleGoal } from "@/features/goals/goalaction";
import { ShowDate } from "@/components/ShowDate";
import { MilestoneCard } from "@/features/subGoals/components/MilestoneCard";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Target,
  ChevronLeft,
  Flag,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import type { Goal } from "@/features/goals/goalSchema";
import { useDialog } from "@/hooks/usedialog";
import NewSubGoalDialog from "@/features/subGoals/components/Newsubgoal";
import type { Subgoal } from "@/features/subGoals/subGoalschema";
import EditGoalButton from "@/features/goals/components/EditGoalButton";

const Page = () => {
  const params = useParams();
  const goalId = Number(params?.id);
  const { allGoals } = useGoal();
  const { subgoals, setSubgoals } = useSubgoal();
  const [singleGoal, setSingleGoal] = useState<Goal | null>(null);
  const { open, isOpen, close } = useDialog();

  const {updateGoalStatus } = useGoal();
  

  const goalSubgoals = subgoals
    .filter((sg): sg is Subgoal => sg.goal_id === goalId)
    .map((sg) => ({
      ...sg,
      description: sg.description || "",
    }));

  const completedCount = goalSubgoals.filter((sg) => sg.status === "Completed").length;

  useEffect(() => {
    const currentGoal = allGoals.find((g) => g.id === goalId) || null;
    setSingleGoal(currentGoal);

    if (subgoals.length === 0) {
      getaallsubgoal(goalId).then(setSubgoals);
    }
  }, [allGoals, goalId, subgoals.length, setSubgoals]);


useEffect(() => {
  if (!singleGoal) return;

  let newStatus: Goal["status"];

  if (goalSubgoals.length === 0) {
    newStatus = "Not Started";
  } else if (completedCount === goalSubgoals.length) {
    newStatus = "Completed";
  } else {
    newStatus = "In Progress";
  }

  if (singleGoal.status !== newStatus) {
    updateGoalStatus(goalId, newStatus);
    toggleGoal(goalId, newStatus)
  }
}, [goalSubgoals.length, completedCount, singleGoal, goalId, updateGoalStatus]);

  const categoryColors: Record<string, string> = {
    Health: "bg-green-50 text-green-700 border-green-200",
    Career: "bg-blue-50 text-blue-700 border-blue-200",
    Learning: "bg-purple-50 text-purple-700 border-purple-200",
    Personal: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Finance: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Coding: "bg-pink-50 text-pink-700 border-pink-200",
  };

  if (!singleGoal) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading goal details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-3 max-w-5xl">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            href="/goals"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 group transition-colors"
          >
            <div className="p-2 rounded-lg group-hover:bg-slate-100 mr-2 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to Goals</span>
          </Link>
        </div>

        {/* Goal Header */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-5 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                    {singleGoal.name}
                  </h1>
                  <p className="text-slate-600 text-lg mt-1">
                    {singleGoal.description || "No description provided."}
                  </p>
                </div>
              </div>

              {/* Category Pill */}
              {singleGoal.category && (
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm ${
                    categoryColors[singleGoal.category] ?? "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  {singleGoal.category}
                </span>
              )}
            </div>

            {/* Edit Button */}
           <EditGoalButton data={singleGoal}/>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium">Target Date</p>
                  <p className="text-base font-semibold text-slate-900">
                    {singleGoal.endDate ? <ShowDate date={singleGoal.endDate} /> : "Not set"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium">Status</p>
                  <p className="text-base font-semibold text-slate-900">{singleGoal.status}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium">Completion</p>
                  <p className="text-base font-semibold text-slate-900">
                    {completedCount} / {goalSubgoals.length} milestones
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-900">Milestones</h2>
              <span className="text-slate-500 text-lg">({goalSubgoals.length} total)</span>
            </div>

            <Button
              onClick={open}
              variant="outline"
              className="group border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 flex items-center gap-2 font-medium px-6 py-6 text-slate-700 rounded-xl"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4" />
              </span>
              Add New Milestone
            </Button>
          </div>

          {/* Milestone List */}
          {goalSubgoals.length > 0 ? (
            <div className="space-y-5">
              {goalSubgoals.map((subgoal) => {
                return (
                  <MilestoneCard
                    key={subgoal.id}
                    id={subgoal.id}
                    title={subgoal.name}
                    description={subgoal.description}
                    status={subgoal.status}
                    hrefBase={`/subgoals`}
                    className="hover:shadow-lg transition-shadow duration-200"
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flag className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-700">No milestones yet</h3>
              <p className="text-slate-500 mt-1">
                Click &quot;Add New Milestone&quot; to get started.
              </p>
            </div>
          )}

          {/* Dialog */}
          <NewSubGoalDialog isOpen={isOpen} setIsOpen={close} goal_id={String(goalId)} />
        </div>
      </div>
    </div>
  );
};

export default Page;