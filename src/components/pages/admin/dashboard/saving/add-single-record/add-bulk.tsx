"use client";
import { Modal } from "@/components/shared/Modal";
import { useMutation } from "@tanstack/react-query";
import { createBulkSaving } from "@/lib/api/savings/created_saving_records";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { SpreadsheetInput } from "@/components/utility/form/spreadsheet";
import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface BulkModal {
  open: boolean;
  onClose: () => void;
}

interface FailedRow {
  row_number: number;
  row_data: Record<string, string>;
  errors: string[];
}

interface BulkSavingResponse {
  success: boolean;
  message: string;
  summary: {
    total: number;
    saved: number;
    failed: number;
  };
  failed_rows: FailedRow[];
}

const bulkSavingsSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Please upload a file.")
    .refine(
      (files) => files?.[0]?.size <= 5 * 1024 * 1024,
      "File must not exceed 5MB.",
    )
    .refine(
      (files) =>
        [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          "text/csv",
        ].includes(files?.[0]?.type),
      "Only .xlsx, .xls or .csv files are accepted.",
    ),
});

type BulkSavingsSchema = z.infer<typeof bulkSavingsSchema>;

export function UploadSavingCSV({ open, onClose }: BulkModal) {
  const [uploadResult, setUploadResult] = useState<BulkSavingResponse | null>(
    null,
  );

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<BulkSavingsSchema>({
    resolver: zodResolver(bulkSavingsSchema),
  });

  const mutation = useMutation({
    mutationFn: createBulkSaving,
    onSuccess: (data) => {
      setUploadResult(data);
      if (data.success) {
        toast.success("All savings recorded successfully!", {
          description: data.message,
        });
      } else {
        toast.warning("Upload completed with some errors", {
          description: data.message,
        });
      }
    },
    onError: (error) => {
      toast.error("Failed to Recored Savings", { description: error.message });
    },
  });
  const handleClose = () => {
    reset();
    onClose();
  };
  const onSubmit: SubmitHandler<BulkSavingsSchema> = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    mutation.mutate(formData);
  };
  return (
    <Modal
      open={open}
      title="Upload Saving Spreadsheet Upload"
      onClose={handleClose}
    >
      <div className="py-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SpreadsheetInput
            label="Upload Savings File"
            inputname="file"
            register={register}
            error={errors.file?.message}
          />
          <div>
            <Button
              className="py-6 px-5 w-full rounded-[16px]"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>{" "}
        {/* Result Summary */}
        {uploadResult && (
          <div className="space-y-4">
            {/* Summary Banner */}
            <div
              className={`flex items-center gap-3 p-4 rounded-lg ${
                uploadResult.success
                  ? "bg-green-50 text-green-700"
                  : "bg-yellow-50 text-yellow-700"
              }`}
            >
              {uploadResult.success ? (
                <CheckCircle2 className="size-5 shrink-0" />
              ) : (
                <AlertCircle className="size-5 shrink-0" />
              )}
              <div>
                <p className="font-medium text-sm">{uploadResult.message}</p>
                <p className="text-xs mt-0.5">
                  {uploadResult.summary.saved} saved ·{" "}
                  {uploadResult.summary.failed} failed ·{" "}
                  {uploadResult.summary.total} total
                </p>
              </div>
            </div>

            {/* Failed Rows */}
            {uploadResult.failed_rows?.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-destructive">
                  Failed Rows
                </p>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {uploadResult.failed_rows.map((row) => (
                    <div
                      key={row.row_number}
                      className="border border-destructive/30 bg-destructive/5 rounded-lg px-4 py-3 space-y-1"
                    >
                      <p className="text-xs font-semibold text-destructive">
                        Row {row.row_number} —{" "}
                        {row.row_data?.email ?? "Unknown email"}
                      </p>
                      <ul className="list-disc list-inside space-y-0.5">
                        {row.errors.map((err, i) => (
                          <li key={i} className="text-xs text-muted-foreground">
                            {err}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
