// @/features/subGoals/components/NewSubgoal.tsx
"use client";

import React from "react";
import BaseDialog from "@/components/BaseDialog";
import { DateTimePicker } from "@/components/DateTimePicker";
import SelectComponent from "@/components/Selectcomponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newSubGoalsAction } from "@/features/goals/goalaction";
import type { NewSubgoal } from "@/features/subGoals/subGoalschema";
import { useSubgoal } from "@/features/subGoals/subgoalStore";
import useUser from "@/store/useUser";
import { Label } from "@radix-ui/react-label";
import { Target, Sparkles, Calendar, Tag } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { generateUniqueId } from "@/lib/generateUniqueId";
import { STATUS_OPTIONS } from "@/features/subGoals/components/StatusConfig";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  goal_id: string;
}

const NewSubGoalDialog: React.FC<Props> = ({ isOpen, setIsOpen, goal_id }) => {
  const { register, control, handleSubmit, reset } = useForm<NewSubgoal>({
    defaultValues: {
      name: "",
      description: "",
      status: "Not Started", // ✅ Default value
      endDate: new Date(),
    },
  });

  const { user } = useUser();
  const { addSubgoal } = useSubgoal();

  const onSub = async (data: NewSubgoal) => {
    const id = generateUniqueId();
    const isdone = data.status === "Completed"; // ✅ Auto-set isdone if status is completed

    const subgoalWithId = {
      ...data,
      id,
      user_id: user,
      goal_id: Number(goal_id),
      isdone,
    };

    addSubgoal(subgoalWithId, user, Number(goal_id), id);
    setIsOpen(false);
    await newSubGoalsAction(subgoalWithId);
    reset();
  };

  return (
    <BaseDialog isOpen={isOpen} setisOpen={setIsOpen} title="" description="">
      <div className="text-center mb-6 pb-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Create New Milestone</h2>
        <p className="text-gray-600">Set your target and track your progress</p>
      </div>

      <form onSubmit={handleSubmit(onSub)} className="space-y-5">
        {/* Goal Name */}
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-semibold text-gray-700 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            Goal Name *
          </Label>
          <Input
            id="name"
            placeholder="What do you want to achieve?"
            {...register("name", { required: true })}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
            Description
          </Label>
          <Input
            id="description"
            placeholder="Add details about your goal"
            {...register("description")}
          />
        </div>

        {/* Status & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Tag className="w-4 h-4 text-purple-500" />
              Status
            </Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <SelectComponent
                  onchangefunc={field.onChange}
                  deafultvalue={field.value}
                  allvalues={STATUS_OPTIONS}
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-500" />
              Target Date
            </Label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker label="endDate" setDate={field.onChange} date={field.value} />
              )}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          >
            <Target className="w-4 h-4 mr-2" />
            Create Milestone
          </Button>
        </div>
      </form>
    </BaseDialog>
  );
};

export default NewSubGoalDialog;