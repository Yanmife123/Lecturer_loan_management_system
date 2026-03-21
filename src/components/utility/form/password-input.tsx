"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
type Props = {
  error?: string | undefined;
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  inputname: string;
  placeholder?: string;
  label: string;
  defaultValue?: string;
};
export function PasswordInput({
  error,
  register,
  inputname,
  label,
  placeholder = "*********",
  defaultValue,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={inputname} className="text-foreground font-medium">
          {label}
        </Label>
      </div>
      <div className="relative">
        <Input
          id={inputname}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          defaultValue={defaultValue ?? ""}
          {...register(inputname)}
          className="h-11 bg-background border-input focus:border-primary transition-colors "
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 cursor-pointer"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}
