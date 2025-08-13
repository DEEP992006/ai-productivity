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
    CheckCircle,
} from "lucide-react";
import { useSubgoal } from "@/features/subGoals/subgoalStore";
import type { Subgoal } from "@/features/subGoals/subGoalschema";
import { editGoalAction, editSubgoalAction } from "@/features/goals/goalaction";
import { da } from "date-fns/locale";


interface EditSubgoalDialogProps {
    open: boolean;
    initialData: Subgoal;
    setisOpen: (open: boolean) => void;
}

export default function EditSubgoalDialog({
    open,
    initialData,
    setisOpen,
}: EditSubgoalDialogProps) {
    const { editSubgoal } = useSubgoal();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Subgoal>({
        defaultValues: initialData,
    });

 const handleUpdate = (data: Subgoal) => {
  const fixedData: Subgoal = {
    ...data,
    isdone: data.isdone === true,
    endDate: data.endDate ? new Date(data.endDate) : null, // ✅ keep as Date
  };

  console.log("Sending data:", fixedData);

  editSubgoal(fixedData);
  setisOpen(false);
  editSubgoalAction(fixedData);
};



    return (
        <BaseDialog
            isOpen={open}
            setisOpen={setisOpen}
            title="Edit Subgoal"
            description="Update your subgoal details"
        >
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4 mt-4">
                {/* Name */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        Subgoal Name *
                    </Label>
                    <Input
                        id="name"
                        placeholder="What needs to be done?"
                        {...register("name", { required: "Subgoal name is required" })}
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

                {/* Status */}
                <div className="space-y-2 w-full">
                    <Label htmlFor="status" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-purple-500" />
                        Status
                    </Label>
                    <SelectField<Subgoal>
                        name="status"
                        control={control}
                        options={["not_started", "in_progress", "completed"]}
                    />
                </div>

                {/* Is Done */}
                <div className="space-y-2">
                    <Label htmlFor="isdone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Done
                    </Label>
                    <select
                        id="isdone"
                        {...register("isdone")}
                        className="border rounded px-2 py-1"
                    >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-500" />
                        End Date
                    </Label>
                    <DateField<Subgoal> name="endDate" control={control} />
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
