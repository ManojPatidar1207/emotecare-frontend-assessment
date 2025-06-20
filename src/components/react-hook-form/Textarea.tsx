import { Controller, type FieldValues } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { RHFTextareaProps } from "@/components/react-hook-form/types";

const RHFTextarea = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  error,
  placeholder,
  rows = 3,
}: RHFTextareaProps<T>) => {
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
          <Textarea
            id={name}
            placeholder={placeholder}
            rows={rows}
            {...field}
            className={error ? "border-red-500" : ""}
          />
        )}
      />
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
};

RHFTextarea.displayName = "RHFTextarea";

export default RHFTextarea;
