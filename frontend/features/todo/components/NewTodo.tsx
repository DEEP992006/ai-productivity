"use client";

import React from "react";
import { useForm } from "react-hook-form";
import BaseDialog from "@/components/BaseDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectField } from "@/components/form/SelectField";
import { DateField } from "@/components/form/DateField";
import { useTodo } from "@/features/todo/todostore";
import useUser from "@/store/useUser";
import { newtodoaction } from "@/features/todo/todoaction";
import type { NewTodo } from "@/features/todo/todoSchema";
import { Sparkles, FileText, Tag, Flag, Calendar, Target } from "lucide-react";
import { log } from "console";

interface NewTodoDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;

  defaultSubgoalId?: number | null;
}

export default function NewTodoDialog({ isOpen, setIsOpen,defaultSubgoalId = null  }: NewTodoDialogProps) {
  const userId = useUser((s) => s.user);
  const { addTodo } = useTodo();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NewTodo>({
    defaultValues: {
      category: "Personal",
      priority: "Low",
      name: "",
      description: "",
      startDate: null,
      endDate: null,
      goal_id: null,
      subgoal_id: defaultSubgoalId,
    },
  });

  // Form Submit Handler
  const onSubmit = async (data: NewTodo) => {
    console.log("data",data);
    
    addTodo(data, userId ?? 0);
    reset();
    setIsOpen(false);
    await newtodoaction({ ...data, user_id: userId });
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      setisOpen={setIsOpen}
      title="Create New Todo"
      description="Organize your tasks efficiently"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        
        {/* Task Name */}
        <div className="space-y-2">
          {/* Label */}
          <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Task Name *
          </Label>
          <Input
            id="name"
            placeholder="What needs to be done?"
            {...register("name", { required: "Task name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          {/* Label */}
          <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            Description
          </Label>
          <Input
            id="description"
            placeholder="Optional details"
            {...register("description")}
          />
        </div>

        {/* Category & Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 w-full">
            {/* Label */}
            <Label htmlFor="category" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Tag className="w-4 h-4 text-purple-500" />
              Category
            </Label>
            <SelectField<NewTodo>
              name="category"
              control={control}
              options={["Personal", "Goal", "Tech"]}
            />
          </div>
          <div className="space-y-2 w-full">
            {/* Label */}
            <Label htmlFor="priority" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Flag className="w-4 h-4 text-red-500" />
              Priority
            </Label>
            <SelectField<NewTodo>
              name="priority"
              control={control}
              options={["Low", "Medium", "High"]}
            />
          </div>
        </div>

        {/* Start & End Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {/* Label */}
            <Label htmlFor="startDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-500" />
              Start Date
            </Label>
            <DateField<NewTodo> name="startDate" control={control} />
          </div>
          <div className="space-y-2">
            {/* Label */}
            <Label htmlFor="endDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-500" />
              End Date
            </Label>
            <DateField<NewTodo> name="endDate" control={control} />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 w-full flex items-center justify-center"
        >
          <Target className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </form>
    </BaseDialog>
  );
}
