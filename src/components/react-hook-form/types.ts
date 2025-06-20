import type { Control, FieldError, FieldValues, Path } from "react-hook-form";

export interface RHFDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  error?: FieldError;
}

export interface RHFInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  error?: FieldError;
  placeholder?: string;
  type?: string;
}

export interface RHFTextareaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  error?: FieldError;
  placeholder?: string;
  rows?: number;
}

export interface RHFTimeInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  error?: FieldError;
}
