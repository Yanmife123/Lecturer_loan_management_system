"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
// import { Eye, EyeOffIcon } from "lucide-react";

type Props = {
  error?: string;
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  inputname: string;
  placeholder?: string;
  label: string;
};
export function EmailInput({
  error,
  register,
  inputname,
  label,
  placeholder = "Email",
}: Props) {
  // const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={inputname} className="text-foreground font-medium">
          {label}
        </Label>
      </div>
      <div>
        <Input
          id={inputname}
          type="email"
          placeholder={placeholder}
          {...register(inputname)}
          className="h-11 bg-background border-input focus:border-primary transition-colors "
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}
