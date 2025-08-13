"use client";

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { DateTimePicker } from "@/components/DateTimePicker";

interface DateFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export function DateField<T extends FieldValues>({name, control }: DateFieldProps<T>) {
  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DateTimePicker
            date={field.value}
            setDate={field.onChange}
            label={`Time`}
          />
        )}
      />
    </div>
  );
}
