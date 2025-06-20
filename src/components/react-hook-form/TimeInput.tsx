import { Controller, type FieldValues } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { RHFTimeInputProps } from "@/components/react-hook-form/types";

const RHFTimeInput = <T extends FieldValues>({
  name,
  control,
  label = "Time",
  required,
  error,
}: RHFTimeInputProps<T>) => {
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
          <Input
            type="time"
            id={name}
            step="60"
            {...field}
            className={`bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none ${
              error ? "border-red-500" : ""
            }`}
          />
        )}
      />
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
};

RHFTimeInput.displayName = "RHFTimeInput";

export default RHFTimeInput;
