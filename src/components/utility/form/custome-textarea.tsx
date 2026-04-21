"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormRegister } from "react-hook-form";

type Props = {
  error?: string;
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  inputname: string;
  placeholder?: string;
  label: string;
  rows?: number;
};

export function CustomTextarea({
  error,
  register,
  inputname,
  label,
  placeholder,
  rows = 4,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={inputname} className="text-foreground font-medium">
          {label}
        </Label>
      </div>
      <Textarea
        id={inputname}
        placeholder={placeholder}
        {...register(inputname)}
        rows={rows}
        className="min-h-[80px] bg-background border-input focus:border-primary transition-colors resize-none"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}
