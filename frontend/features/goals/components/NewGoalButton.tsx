import { Button } from "@/components/ui/button";
import NewGoalDialog from "@/features/goals/components/NewGoal";
import { useDialog } from "@/hooks/usedialog";
import { Plus } from "lucide-react";
import React from "react";

const NewGoalButton = () => {
  const { open, isOpen, close } = useDialog();

  return (
    <>
      <Button
        onClick={open}
        size="lg"
        className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 rounded-xl transform hover:scale-105 font-semibold"
      >
        <Plus className="w-5 h-5 mr-2" />
        New Goal
      </Button>
      <NewGoalDialog isOpen={isOpen} setIsOpen={close} />
    </>
  );
};

export default NewGoalButton;
