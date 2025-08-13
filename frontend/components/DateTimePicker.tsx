"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface DateTimePickerProps {
  date: Date | null | undefined;
  setDate: (date: Date) => void;
  label?: string;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const updatedDate = new Date(selectedDate);
    if (date) {
      updatedDate.setHours(date.getHours());
      updatedDate.setMinutes(date.getMinutes());
    }
    setDate(updatedDate);
    setOpen(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!date) return;
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const updatedDate = new Date(date);
    updatedDate.setHours(hours);
    updatedDate.setMinutes(minutes);
    setDate(updatedDate);
  };

  return (
    <div className="grid gap-2">
      {/* {label && <label className="text-sm font-medium">{label}</label>} */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP p") : <span>Pick date & time</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <Calendar
            mode="single"
            selected={date || new Date()}
            onSelect={handleDateChange}
            initialFocus
          />
          <div className="mt-2 flex items-center gap-2">
            <Input
              type="time"
              defaultValue={date ? format(date, "HH:mm") : "00:00"}
              onChange={handleTimeChange}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
