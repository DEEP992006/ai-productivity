import { Button } from '@/components/ui/button';
import EditSubgoalDialog from '@/features/subGoals/components/EditSubgoalDialog';
import type { Subgoal } from '@/features/subGoals/subGoalschema';
import { useDialog } from '@/hooks/usedialog';
import { Pencil } from 'lucide-react';
import React from 'react';

const EditSubGoalButton = ({ data }: { data: Subgoal }) => {
    const { open, isOpen, close } = useDialog();
    return (
        <>
            <Button
                size="lg"
                className="px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={open}
            >
                <Pencil className="w-5 h-5" />
                Edit SubGoal
            </Button>
            <EditSubgoalDialog open={isOpen} setisOpen={close} initialData={data} />
        </>
    );
};

export default EditSubGoalButton;