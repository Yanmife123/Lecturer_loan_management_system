"use client";
import { CustomInput } from "@/components/utility/form/custom-input";
import { EmailInput } from "@/components/utility/form/email-Input";
import { SelectInput } from "@/components/utility/form/custom-select";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateSavingSingle } from "@/lib/api/savings/created_saving_records";
import { toast } from "sonner";
import { useState } from "react";
import { UploadSavingCSV } from "./add-bulk";

const savingsRecordSchema = z.object({
  email: z.string().email("Invalid email address"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  month: z.coerce.number().min(1, "Invalid month").max(12, "Invalid month"),
  year: z.coerce
    .number()
    .min(2000, "Invalid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  payment_method: z
    .enum(["salary_deduction", "bank_transfer", "cash"])
    .default("salary_deduction"),
});

type SavingsRecordSchema = z.infer<typeof savingsRecordSchema>;

export function AddSvingRecordForm() {
  const [openBulk, setOpenBulk] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<SavingsRecordSchema>({
    resolver: zodResolver(savingsRecordSchema),
  });

  const mutation = useMutation({
    mutationFn: CreateSavingSingle,
    onSuccess: (data) => {
      toast.success("Savings Recorded Successfully", {
        description: data.message,
      });
    },
    onError: (error) => {
      toast.error("Failed to Recored Savings", { description: error.message });
    },
  });

  const onSubmit: SubmitHandler<SavingsRecordSchema> = async (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center font-sans py-6 px-4 gap-6">
        <div className="flex justify-end">
          <Button
            variant={"outline"}
            onClick={() => {
              setOpenBulk(true);
            }}
            className="cursor-pointer"
          >
            Upload Saving File record
          </Button>
        </div>
        <Card className="w-full max-w-md py-10 space-y-6 px-7">
          <h2 className="text-2xl font-bold text-gray-800">
            Single Savings Entry
          </h2>
          <p></p>
          <div className="py-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <EmailInput
                  label="Memeber Email"
                  inputname="email"
                  register={register}
                  error={errors.email?.message}
                />{" "}
                <CustomInput
                  label="Saviing Amount"
                  inputname="amount"
                  placeholder="Enter amount"
                  type="number"
                  step="0.01"
                  register={register}
                  error={errors.amount?.message}
                />
                <SelectInput
                  label="Payment Method"
                  inputname="payment_method"
                  control={control}
                  options={[
                    { label: "Salary Deduction", value: "salary_deduction" },
                    { label: "Bank Transfer", value: "bank_transfer" },
                    { label: "Cash", value: "cash" },
                  ]}
                  error={errors.payment_method?.message}
                />
                <SelectInput
                  label="Saving months"
                  inputname="month"
                  control={control}
                  options={[
                    { value: "1", label: "January" },
                    { value: "2", label: "February" },
                    { value: "3", label: "March" },
                    { value: "4", label: "April" },
                    { value: "5", label: "May" },
                    { value: "6", label: "June" },
                    { value: "7", label: "July" },
                    { value: "8", label: "August" },
                    { value: "9", label: "September" },
                    { value: "10", label: "October" },
                    { value: "11", label: "November" },
                    { value: "12", label: "December" },
                  ]}
                  error={errors.month?.message}
                />
                <CustomInput
                  label="Year"
                  inputname="year"
                  placeholder={`e.g. ${new Date().getFullYear()}`}
                  type="number"
                  register={register}
                  error={errors.year?.message}
                />
              </div>
              <div>
                <Button
                  className="py-6 px-5 w-full rounded-[16px]"
                  type="submit"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Saving..." : "Save Record"}
                </Button>
              </div>
            </form>{" "}
          </div>
        </Card>
      </div>
      <UploadSavingCSV open={openBulk} onClose={() => setOpenBulk(false)} />
    </div>
  );
}
