"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { FileSpreadsheet, X } from "lucide-react";

type Props = {
  error?: string;
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  inputname: string;
  label: string;
  hint?: string;
};

export function SpreadsheetInput({
  error,
  register,
  inputname,
  label,
  hint = "Excel (.xlsx, .xls) or CSV, max 5MB",
}: Props) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const clearFile = () => {
    setFileName(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={inputname} className="text-foreground font-medium">
          {label}
        </Label>
        {hint && <span className="text-muted-foreground text-xs">{hint}</span>}
      </div>

      {!fileName ? (
        <label
          htmlFor={inputname}
          className="flex flex-col items-center justify-center h-32 w-full rounded-lg border-2 border-dashed border-input bg-background hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <FileSpreadsheet className="size-8 text-muted-foreground mb-2" />
          <span className="text-sm text-muted-foreground">
            Click to upload spreadsheet
          </span>
          <span className="text-xs text-muted-foreground mt-1">
            .xlsx, .xls or .csv
          </span>
          <Input
            id={inputname}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            {...register(inputname, { onChange: handleChange })}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-input bg-background px-4 py-3">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="size-6 text-green-600" />
            <span className="text-sm text-foreground font-medium truncate max-w-[250px]">
              {fileName}
            </span>
          </div>
          <button
            type="button"
            onClick={clearFile}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}
