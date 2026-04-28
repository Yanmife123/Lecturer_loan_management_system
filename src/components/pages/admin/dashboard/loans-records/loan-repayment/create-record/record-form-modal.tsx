import { Modal } from "@/components/shared/Modal";
import { boolean } from "zod";
import { Schedule } from "../search-member/types";
import { CustomInput } from "@/components/utility/form/custom-input";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectInput } from "@/components/utility/form/custom-select";
import { CreateRepaymentApi } from "@/lib/api/loan/repayments";
import { toast } from "sonner";

interface Modal {
  open: boolean;
  onClose: () => void;
  taget: Schedule | null;
  loanId: number;
}

export const savingsRecordSchema = z.object({
  amount_paid: z.coerce.number().min(0.01, "Amount must be at least 0.01"),
  payment_date: z.coerce
    .date()
    .max(new Date(), "Payment date cannot be in the future"),
  // Maps to 'payment_method'
  payment_method: z
    .enum(["salary_deduction", "bank_transfer", "cash"]) // Added common methods
    .default("salary_deduction"),
});

export type SavingsRecordSchema = z.infer<typeof savingsRecordSchema>;

export function CreateFormRecord({ open, onClose, taget, loanId }: Modal) {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<SavingsRecordSchema>({
    resolver: zodResolver(savingsRecordSchema),
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const mutation = useMutation({
    mutationFn: CreateRepaymentApi,
    onSuccess: (data) => {
      toast.success("Record saved Sucessfully");
      handleClose();
    },
    onError: (error) => {
      toast.error("Record Failed", { description: error.message });
    },
  });

  const onSubmit: SubmitHandler<SavingsRecordSchema> = async (data) => {
    const formData = {
      amount_paid: data.amount_paid,
      payment_date: data.payment_date,
      payment_method: data.payment_method,
      loan_application_id: loanId,
      repayment_schedule_id: taget?.id!,
    };
    mutation.mutate(formData);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`Create Record for Schedule ${taget?.label}`}
    >
      <div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Repayment Amount"
            inputname="amount_paid"
            placeholder="Enter amount"
            type="number"
            step="0.01"
            register={register}
            error={errors.amount_paid?.message}
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
          <CustomInput
            label="Date of Payment"
            inputname="payment_date"
            register={register}
            type="date"
            error={errors.payment_date?.message}
          />
          <div>
            <Button
              className="py-6 px-5 w-full rounded-[16px]"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save Record"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
