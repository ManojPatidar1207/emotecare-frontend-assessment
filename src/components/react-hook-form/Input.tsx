import { Controller, type FieldValues } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RHFInputProps } from "@/components/react-hook-form/types";

const RHFInput = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  error,
  placeholder,
  type = "text",
}: RHFInputProps<T>) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            {...field}
            className={error ? "border-red-500" : ""}
          />
        )}
      />
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
};

RHFInput.displayName = "RHFInput";

export default RHFInput;
