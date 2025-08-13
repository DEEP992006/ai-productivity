import { Button } from '@/components/ui/button'
import EditGoalDialog from '@/features/goals/components/EditGoalDialog';
import type { Goal } from '@/features/goals/goalSchema';
import { useDialog } from '@/hooks/usedialog';
import { Pencil } from 'lucide-react'
import React from 'react'

const EditGoalButton = ({data}:{data:Goal}) => {
    const { open,isOpen,close } = useDialog();
  return (
    <>
    
     <Button
              size="lg"
              className="px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"

              onClick={open}
            >
            <Pencil className="w-5 h-5" />
                Edit Goal
                

            </Button>
            <EditGoalDialog open={isOpen} setisOpen={close} initialData={data}/>
            
    </>
  )
}

export default EditGoalButton