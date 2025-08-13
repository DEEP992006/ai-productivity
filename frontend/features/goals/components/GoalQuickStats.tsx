"use client";

import { StatCard } from "@/components/StateCard";
import { Target, TrendingUp } from "lucide-react";

interface GoalQuickStatsProps {
  totalGoals: number;
  completedGoals: number;
}

export default function GoalQuickStats({
  totalGoals,
  completedGoals,
}: GoalQuickStatsProps) {
  const successRate =
    totalGoals > 0
      ? `${Math.round((completedGoals / totalGoals) * 100)}%`
      : "0%";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <StatCard
        title="Total Goals"
        value={totalGoals}
        icon={<Target className="w-6 h-6" />}
        iconBgColor="bg-blue-100"
        Color="text-blue-600"
      />
      <StatCard
        title="Completed"
        value={completedGoals}
        icon={<TrendingUp className="w-6 h-6 text-green-600" />}
        iconBgColor="bg-green-100"
        Color="text-green-600"
      />
      <StatCard
        title="Success Rate"
        value={successRate}
        icon={
          <div className="w-6 h-6 rounded-full border-2 border-purple-600 flex items-center justify-center">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
          </div>
        }
        iconBgColor="bg-purple-100"
        Color="text-purple-600"
      />
    </div>
  );
}
