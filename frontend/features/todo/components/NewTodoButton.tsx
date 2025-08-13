import { Button } from "@/components/ui/button";
import NewTodoDialog from "@/features/todo/components/NewTodo";
import { useDialog } from "@/hooks/usedialog";
import { Plus } from "lucide-react";
import React from "react";

type NewTaskButtonProps = {
  subgoal_id: number;
  children?: React.ReactNode;
};

const NewTaskButton = ({ subgoal_id, children }: NewTaskButtonProps) => {
  const { open, isOpen, close } = useDialog();

  return (
    <>
      <div onClick={open} className="inline-block">
        {children ? (
          children
        ) : (
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 
                       hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 
                       text-white shadow-xl hover:shadow-2xl transition-all 
                       duration-300 px-8 py-4 rounded-xl transform hover:scale-105 
                       font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Task
          </Button>
        )}
      </div>

      <NewTodoDialog
        isOpen={isOpen}
        setIsOpen={close}
        defaultSubgoalId={subgoal_id}
      />
    </>
  );
};

export default NewTaskButton;
