import BaseDialog from "@/components/BaseDialog";
import { DateField } from "@/components/form/DateField";
import { SelectField } from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateUniqueId } from "@/lib/generateUniqueId";
import { newGoalsAction } from "@/features/goals/goalaction";
import type { NewGoal } from "@/features/goals/goalSchema";
import { useGoal } from "@/features/goals/GoalStore";
import useUser from "@/store/useUser";
import { Label } from "@radix-ui/react-label";
import { Target, Sparkles, Calendar, Tag, FileText } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

const NewGoalDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const { register, control, handleSubmit, reset } = useForm<NewGoal>({
    defaultValues: {
      name: "",
      description: "",
      category: "Personal",
      status: "Not Started",
    },
  });
  const { user } = useUser();
  const { addGoal } = useGoal();

  // Form Submit Handler
  const onSub = async (data: NewGoal) => {
    const id = generateUniqueId();
console.log("Creating new goal with ID:",id);

    // Add to local state
    addGoal({
      ...data,
      user_id: user,
      id,
    });

    // Close dialog & send to backend
    setIsOpen(false);
    await newGoalsAction({
      ...data,
      user_id: user,
      id,
    });

    reset(); // Reset form
  };

  return (
    <div>
      <BaseDialog isOpen={isOpen} setisOpen={setIsOpen} title="" description="">
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Create New Goal
            </h2>
            <p className="text-gray-600">
              Set your target and track your progress
            </p>
          </div>

          {/* Form */}
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
                className="h-11 px-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
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
                placeholder="Add details about your goal"
                {...register("description")}
                className="h-11 px-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
            </div>

            {/*Category, Status, Date*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-purple-500" />
                  Category
                </Label>
                <SelectField<NewGoal>
                  name="category"
                  control={control}
                  options={[
                    "Career",
                    "Learning",
                    "Personal",
                    "Finance",
                    "Coding",
                  ]}
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-purple-500" />
                  Status
                </Label>
                <SelectField<NewGoal>
                  name="status"
                  control={control}
                  options={["Not Started", "In Process", "Completed"]}
                />
              </div>

              {/* Target Date */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  Target Date
                </Label>
                <DateField<NewGoal> name="endDate" control={control} />
              </div>
            </div>
            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="sm:order-1 px-6 py-2.5 rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="sm:order-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
              >
                <Target className="w-4 h-4 mr-2" />
                Create Goal
              </Button>
            </div>
          </form>
        </div>
      </BaseDialog>
    </div>
  );
};

export default NewGoalDialog;
