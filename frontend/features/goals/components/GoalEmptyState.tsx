import { Button } from "@/components/ui/button";
import NewGoalDialog from "@/features/goals/components/NewGoal";
import { useDialog } from "@/hooks/usedialog";
import { Plug, Target } from "lucide-react";
import React from "react";

const GoalEmptyState = () => {
  const { open, isOpen, close } = useDialog();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg">
            <Target className="w-10 h-10 text-blue-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-md">
            <Plug className="w-4 h-4 text-white" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-3">
          Ready to set your first goal?
        </h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Transform your aspirations into achievable milestones. Start your
          journey towards success today.
        </p>

        <Button
          onClick={open}
          size="lg"
          className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-4 rounded-xl transform hover:scale-105 font-semibold text-lg"
        >
          <Target className="w-6 h-6 mr-3" />
          Create Your First Goal
        </Button>
        <NewGoalDialog isOpen={isOpen} setIsOpen={close} />
      </div>
    </div>
  );
};

export default GoalEmptyState;
