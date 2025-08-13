import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import SelectComponent from "@/components/Selectcomponent";

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: string[];
}

export function SelectField<T extends FieldValues>({
  name,
  control,
  options
}: SelectFieldProps<T>) {
  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <SelectComponent
            onchangefunc={field.onChange}
            deafultvalue={field.value || ""}
            allvalues={options}
          />
        )}
      />
    </div>
  );
}
