"use client";

import { ShowDate } from '@/components/ShowDate';
import { DeleteGoalsAction } from '@/features/goals/goalaction';
import type { Goal } from '@/features/goals/goalSchema';
import { useGoal } from '@/features/goals/GoalStore';
import { useSubgoal } from '@/features/subGoals/subgoalStore';
import { Calendar, Clock, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const GoalCard = ({ goal }: { goal: Goal }) => {
  const { id, name, description, category, endDate } = goal;
  const { deleteGoal } = useGoal();
  const { subgoals } = useSubgoal();

  // ✅ Filter subgoals for this goal
  const goalSubgoals = subgoals.filter((sg) => sg.goal_id === id);

  // ✅ Determine status from subgoals
  let calculatedStatus: "Not Started" | "In Progress" | "Completed";
  if (goalSubgoals.length === 0) {
    calculatedStatus = "Not Started";
  } else if (goalSubgoals.every((sg) => sg.status === "Completed")) {
    calculatedStatus = "Completed";
  } else {
    calculatedStatus = "In Progress";
  }

  const categoryStyles: Record<string, { bg: string; text: string; icon: string; cardBg: string; emoji: string }> = {
    Health: { bg: 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200', text: 'text-emerald-700', icon: 'bg-emerald-100', cardBg: 'bg-gradient-to-br from-emerald-50/70 via-white to-green-50/40', emoji: '🏃‍♂️' },
    Career: { bg: 'bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200', text: 'text-blue-700', icon: 'bg-blue-100', cardBg: 'bg-gradient-to-br from-blue-50/70 via-white to-sky-50/40', emoji: '💼' },
    Learning: { bg: 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200', text: 'text-purple-700', icon: 'bg-purple-100', cardBg: 'bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/40', emoji: '📚' },
    Personal: { bg: 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200', text: 'text-yellow-700', icon: 'bg-yellow-100', cardBg: 'bg-gradient-to-br from-yellow-50/70 via-white to-amber-50/40', emoji: '🌟' },
    Finance: { bg: 'bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200', text: 'text-indigo-700', icon: 'bg-indigo-100', cardBg: 'bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/40', emoji: '💰' },
    Coding: { bg: 'bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200', text: 'text-slate-700', icon: 'bg-slate-100', cardBg: 'bg-gradient-to-br from-slate-50/70 via-white to-gray-50/40', emoji: '💻' },
  };

  const getCategoryStyle = (cat: string) =>
    categoryStyles[cat] || {
      bg: 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200',
      text: 'text-gray-700',
      icon: 'bg-gray-100',
      cardBg: 'bg-gradient-to-br from-gray-50/70 via-white to-slate-50/40',
      emoji: '🎯',
    };

  const categoryStyle = getCategoryStyle(category || '');
  const isNearDeadline = endDate && new Date(endDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const handleDelete = async () => {
    deleteGoal(id);
    DeleteGoalsAction(id);
  };

  return (
    <div className="relative group">
      {/* Delete Button - visible only on hover */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 p-2 rounded-full bg-red-50 text-red-600 shadow-sm hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <Link href={`/goals/${id}`} passHref>
        <div
          className={`group ${categoryStyle.cardBg} rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col cursor-pointer`}
        >
          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`p-3 rounded-xl ${categoryStyle.icon} text-xl shrink-0 group-hover:scale-105 transition-transform duration-200`}
              >
                {categoryStyle.emoji}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-slate-800 line-clamp-2 group-hover:text-slate-900 transition-colors leading-tight">
                  {name}
                </h3>
                {category && (
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border mt-1.5 ${categoryStyle.bg} ${categoryStyle.text} group-hover:shadow-sm`}
                  >
                    {category}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {description && (
              <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                {description}
              </p>
            )}

            {/* Deadline */}
            {endDate && (
              <div
                className={`flex items-center gap-2 mt-auto text-xs font-medium ${
                  isNearDeadline ? 'text-orange-600' : 'text-slate-500'
                }`}
              >
                {isNearDeadline ? <Clock className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                <span>
                  Ends <ShowDate date={endDate} />
                </span>
              </div>
            )}

            {/* Status */}
            <span
              className={`mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${categoryStyle.bg} ${categoryStyle.text} group-hover:shadow-sm`}
            >
              {calculatedStatus}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GoalCard;
