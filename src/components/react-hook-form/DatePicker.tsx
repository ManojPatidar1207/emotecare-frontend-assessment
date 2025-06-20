import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Controller, type FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { RHFDatePickerProps } from "@/components/react-hook-form/types";
import dayjs from "dayjs";

const RHFDatePicker = <T extends FieldValues>({
  name,
  control,
  label = "Date",
  required,
  error,
}: RHFDatePickerProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label htmlFor={name} className="px-1">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id={name}
                className={`w-32 justify-between font-normal rounded-md ${
                  error ? "border-red-500" : ""
                }`}
                type="button"
              >
                {field.value
                  ? dayjs(field.value).format("MMM D, YYYY")
                  : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                captionLayout="dropdown"
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
};

RHFDatePicker.displayName = "RHFDatePicker";

export default RHFDatePicker;
