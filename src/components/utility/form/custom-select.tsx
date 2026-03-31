"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, Control } from "react-hook-form";

type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  error?: string;
  control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  inputname: string;
  placeholder?: string;
  label: string;
  options: SelectOption[];
};

export function SelectInput({
  error,
  control,
  inputname,
  label,
  placeholder = "Select an option",
  options,
}: Props) {
  return (
    <div className="space-y-2 font-sans">
      <div className="flex items-center justify-between">
        <Label htmlFor={inputname} className="text-foreground font-medium">
          {label}
        </Label>
      </div>
      <Controller
        name={inputname}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger
              id={inputname}
              className="h-11 py-5 w-full bg-background border-input focus:border-primary transition-colors"
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}
