"use client";

import { ShowDate } from '@/components/ShowDate';
import type { Subgoal } from '@/features/subGoals/subGoalschema'; 
export default function SubgoalCard({ subgoal }: { subgoal: Subgoal }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white hover:shadow transition-shadow duration-200">
      <h2 className="text-lg font-semibold text-gray-800">{subgoal.name}</h2>
      {subgoal.description && (
        <p className="text-gray-600 mt-1 text-sm">{subgoal.description}</p>
      )}
      <p className="text-sm mt-2">
        <span className="font-medium">Status:</span> {subgoal.status}
      </p>
      {subgoal.endDate && (
        <p className="text-sm">
          <span className="font-medium">End Date:</span>{' '}
          <ShowDate date={subgoal.endDate} />
        </p>
      )}
      <p className="text-sm">
        <span className="font-medium">Done:</span>{' '}
        {subgoal.isdone ? (
          <span className="text-green-600 ml-1">✅</span>
        ) : (
          <span className="text-red-600 ml-1">❌</span>
        )}
      </p>
    </div>
  );
}