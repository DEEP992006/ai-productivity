import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface SelectComponentProps {
  onchangefunc: (value: string) => void;
  deafultvalue?: string;
  allvalues: string[];
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  onchangefunc,
  deafultvalue,
  allvalues,
}) => {
  return (
    <Select
      onValueChange={onchangefunc}
      defaultValue={deafultvalue || allvalues[0]}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        {allvalues.map((value) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
