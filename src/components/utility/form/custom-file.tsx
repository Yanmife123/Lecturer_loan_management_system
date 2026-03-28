"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";

type Props = {
  error?: string;
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  inputname: string;
  label: string;
  hint?: string;
  accept?: string;
};

export function FileInput({
  error,
  register,
  inputname,
  label,
  hint = "JPG or PNG, max 2MB",
  accept = ".jpg,.jpeg,.png",
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={inputname} className="text-foreground font-medium">
          {label}
        </Label>
        {hint && <span className="text-muted-foreground text-xs">{hint}</span>}
      </div>

      {!preview ? (
        <label
          htmlFor={inputname}
          className="flex flex-col items-center justify-center h-32 w-full rounded-lg border-2 border-dashed border-input bg-background hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <ImageIcon className="size-8 text-muted-foreground mb-2" />
          <span className="text-sm text-muted-foreground">Click to upload</span>
          <Input
            id={inputname}
            type="file"
            accept={accept}
            className="hidden"
            {...register(inputname, { onChange: handleChange })}
          />
        </label>
      ) : (
        <div className="relative w-fit rounded-lg border border-input p-2">
          <Image
            src={preview}
            alt={`${label} preview`}
            width={200}
            height={80}
            className="object-contain rounded max-h-28"
          />
          <button
            type="button"
            onClick={clearPreview}
            className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-0.5 hover:bg-destructive/80 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}
