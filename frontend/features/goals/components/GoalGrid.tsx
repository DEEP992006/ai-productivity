"use client";

import GoalCard from "@/features/goals/components/SingleGoal";
import type { Goal } from "@/features/goals/goalSchema";

interface GoalGridProps {
  goals: Goal[];
}

export default function GoalGrid({ goals }: GoalGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
      {goals.map((goal, index) => (
        <div
          key={goal.id}
          className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <GoalCard goal={goal} />
        </div>
      ))}
    </div>
  );
}
