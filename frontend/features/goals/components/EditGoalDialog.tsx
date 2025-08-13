"use client";

import React from "react";
import { useForm } from "react-hook-form";
import BaseDialog from "@/components/BaseDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectField } from "@/components/form/SelectField";
import { DateField } from "@/components/form/DateField";
import {
    Sparkles,
    FileText,
    Tag,
    Calendar,
    Target,
} from "lucide-react";
import { useGoal } from "@/features/goals/GoalStore";
import type { Goal } from "@/features/goals/goalSchema";
import { editGoalAction } from "@/features/goals/goalaction";

interface EditGoalDialogProps {
    open: boolean;
    initialData: Goal;
    setisOpen: (open: boolean) => void;
}

export default function EditGoalDialog({
    open,
    initialData,
    setisOpen,
}: EditGoalDialogProps) {
    const { editGoal } = useGoal();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Goal>({
        defaultValues: initialData,
    });

    const handleUpdate = (data: Goal) => {
        editGoal(data);
        setisOpen(false);
            editGoalAction({
        ...data,
    });
    };

    return (
        <BaseDialog
            isOpen={open}
            setisOpen={setisOpen}
            title="Edit Goal"
            description="Update your goal details"
        >
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4 mt-4">
                {/* Name */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        Goal Name *
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

                {/* Category */}
                <div className="space-y-2 w-full">
                    <Label htmlFor="category" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-purple-500" />
                        Category
                    </Label>
                    <SelectField<Goal>
                        name="category"
                        control={control}
                        options={["Personal", "Goal", "Tech"]}
                    />
                </div>

                {/* End Date */}
                <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-500" />
                        End Date
                    </Label>
                    <DateField<Goal> name="endDate" control={control} />
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
