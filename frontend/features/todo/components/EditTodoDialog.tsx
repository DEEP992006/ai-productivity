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
import { updatetodoData } from "@/features/todo/todoaction";
import type { Todo } from "@/features/todo/todoSchema";
import {
  Sparkles,
  FileText,
  Tag,
  Flag,
  Calendar,
  Save,
  Target,
} from "lucide-react";

interface EditTodoDialogProps {
  open: boolean;
  initialData: Todo;
  setisOpen: (open: boolean) => void;
}

export default function EditTodoDialog({
  open,
  initialData,
  setisOpen,
}: EditTodoDialogProps) {
  const { updateTodo } = useTodo();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Todo>({
    defaultValues: initialData,
  });

  // Form submit handler
  const handleUpdate = (data: Todo) => {
    updateTodo(data); // local store update
    setisOpen(false); // close dialog
    updatetodoData(data); // backend update
  };

  return (
    <BaseDialog
      isOpen={open}
      setisOpen={setisOpen}
      title="Edit Todo"
      description="Update your task details"
    >
      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4 mt-4">
        {/* Task Name */}
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-semibold text-gray-700 flex items-center gap-2"
          >
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
          <Label
            htmlFor="description"
            className="text-sm font-semibold text-gray-700 flex items-center gap-2"
          >
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
            <Label
              htmlFor="category"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Tag className="w-4 h-4 text-purple-500" />
              Category
            </Label>
            <SelectField<Todo>
              name="category"
              control={control}
              options={["Personal", "Goal", "Tech"]}
            />
          </div>
          <div className="space-y-2 w-full">
            <Label
              htmlFor="priority"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Flag className="w-4 h-4 text-red-500" />
              Priority
            </Label>
            <SelectField<Todo>
              name="priority"
              control={control}
              options={["Low", "Medium", "High"]}
            />
          </div>
        </div>

        {/* Start & End Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="startDate"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-green-500" />
              Start Date
            </Label>
            <DateField<Todo> name="startDate" control={control} />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="endDate"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-green-500" />
              End Date
            </Label>
            <DateField<Todo> name="endDate" control={control} />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
        >
          <Target className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </form>
    </BaseDialog>
  );
}
