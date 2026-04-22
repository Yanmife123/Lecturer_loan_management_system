"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useUser } from "@/lib/hooks/useUser";
import { LoanFormData, LoanStep } from "./types";
import { Member } from "@/lib/type/profile/userProfile";
import LoanStepIndicator from "./LoanStepIndicator";
import StepLoanDetails from "./StepLoanDetails";
import StepLoanBond from "./StepLoanBond";
import StepSalaryDeduction from "./StepSalaryDeduction";
import StepGuarantors from "./StepGuarantors";
import StepReviewSubmit from "./StepReviewSubmit";
import SuccessModal from "./SuccessModal";
import { useQuery } from "@tanstack/react-query";
import { SingleLoan } from "@/lib/api/loan/all_loan_type";
import { LoanApplicationSkeleton } from "@/components/shared/skeleton/skeleton-card";
import { PageHeader } from "@/components/shared/header/page-header2";
import { Instance1 } from "@/lib/axios";
import { toast } from "sonner";
import { CreateLoanApplication } from "@/lib/api/loan/loanApplication";

const fileListSchema = z.custom<FileList>(
  (val) => typeof window === "undefined" || val instanceof FileList,
  { message: "Invalid file input" },
);

const MAX_FILE_SIZE = 2048 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const createStep1Schema = (maxAmount: number, maxDuration: number) =>
  z.object({
    amount: z.coerce
      .number({ invalid_type_error: "Enter a valid amount" })
      .positive("Amount must be greater than 0")
      .max(maxAmount, `Amount cannot exceed ₦${maxAmount.toLocaleString()}`),
    duration_month: z.coerce
      .number({ invalid_type_error: "Enter a valid period" })
      .int()
      .positive("Period must be greater than 0")
      .max(maxDuration, `Duration cannot exceed ${maxDuration} months`),
    bank_name: z.string().min(2, "Bank name is required"),
    bank_account: z
      .string()
      .min(10, "Account number must be at least 10 digits")
      .max(10, "Account number must be 10 digits"),
    net_salary: z.coerce
      .number({ invalid_type_error: "Enter a valid amount" })
      .positive("Amount must be greater than 0"),
    gross_salary: z.coerce
      .number({ invalid_type_error: "Enter a valid amount" })
      .positive("Amount must be greater than 0"),
    monthly_saving_during_repayments: z.coerce
      .number({ invalid_type_error: "Enter a valid amount" })
      .positive("Amount must be greater than 0"),
    purpose: z.string().min(2, "Purpose is required"),
    pay_slip: fileListSchema
      .refine((files) => files.length > 0, "Pay Slip is required")
      .refine(
        (files) => files[0]?.size <= MAX_FILE_SIZE,
        "Max file size is 2MB",
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
        "Only .jpg and .png files are accepted",
      ),
  });

const step2Schema = z.object({
  // borrower_signature: z.string().min(1, "Signature is required"),
});

const step3Schema = z.object({
  // salary_deduction_signature: z.string().min(1, "Signature is required"),
});

const step4Schema = z.object({
  guarantor_email: z.string().email("Enter a valid email"),
});

// ─── Component ───────────────────────────────────────────────────────────────

export default function LoanApplicationPage({ id }: { id: string }) {
  const router = useRouter();
  const [step, setStep] = useState<LoanStep>(1);
  const [submitted, setSubmitted] = useState(false);
  const { fullName, loading } = useUser();

  const {
    data: Loan,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["SingleLoan", id],
    queryFn: () => SingleLoan(id),
  });

  // ─── Derive constraints from fetched loan ──────────────────────────────────
  const maxAmount: number = Loan?.data?.max_amount ?? Infinity;
  const maxDuration: number = Loan?.data?.max_duration_months ?? Infinity;

  const schemaMap: Record<LoanStep, z.ZodTypeAny> = {
    1: createStep1Schema(maxAmount, maxDuration),
    2: step2Schema,
    3: step3Schema,
    4: step4Schema,
    5: z.object({}),
  };

  const {
    register,
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<LoanFormData>({
    resolver: zodResolver(schemaMap[step]),
    mode: "onTouched",
  });

  // ─── Submit mutation ──────────────────────────────────────────────────────
  const { mutate: submitLoan, isPending } = useMutation({
    mutationFn: async (data: LoanFormData) => {
      console.log(data);
      const formData = new FormData();
      formData.append("amount", String(data.amount));
      formData.append("duration_month", String(data.duration_month));
      formData.append("bank_name", data.bank_name);
      formData.append("bank_account", data.bank_account);
      formData.append("net_salary", String(data.net_salary));
      formData.append("gross_salary", String(data.gross_salary));
      formData.append("purpose", data.purpose);
      formData.append(
        "monthly_saving_during_repayments",
        String(data.monthly_saving_during_repayments),
      );
      if (data.pay_slip?.[0]) {
        formData.append("pay_slip", data.pay_slip[0]);
      }
      // formData.append("borrower_signature", data.borrower_signature);
      // formData.append(
      //   "salary_deduction_signature",
      //   // data.salary_deduction_signature,
      // );
      formData.append("loan_type_id", id);
      formData.append("guarantor_email", data.guarantor_email);

      // console.log(formData.getAll);

      return CreateLoanApplication(formData);
    },
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error) => {
      console.error("Loan submission failed:", error);
      toast.error("Loan submission failed:", { description: error.message });
    },
  });

  const formValues = getValues();

  // ─── Step navigation ──────────────────────────────────────────────────────
  const goNext = async () => {
    const valid = await trigger();
    if (valid) setStep((prev) => (prev < 5 ? ((prev + 1) as LoanStep) : prev));
  };

  const goBack = () =>
    setStep((prev) => (prev > 1 ? ((prev - 1) as LoanStep) : prev));

  const onFinalSubmit = handleSubmit(() => submitLoan(formValues));

  // ─── Render ───────────────────────────────────────────────────────────────
  if (submitted) return <SuccessModal />;

  return (
    <div className="font-sans">
      {isLoading && (
        <div className="flex justify-center">
          <LoanApplicationSkeleton />
        </div>
      )}
      {!isLoading && (
        <div className="max-w-2xl mx-auto space-y-6">
          <PageHeader
            title={`Apply for ${Loan.data.name}`}
            description="Complete the application process"
            breadcrumbs={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "All Loans", href: "/dashboard/loans" },
              { label: Loan.data.name },
            ]}
          />

          {/* Step Indicator */}
          <Card className="p-5">
            <LoanStepIndicator currentStep={step} />
          </Card>

          {/* Step Content */}
          <Card className="p-6 md:p-8">
            <form onSubmit={(e) => e.preventDefault()}>
              {step === 1 && (
                <StepLoanDetails
                  register={register}
                  errors={errors}
                  onNext={goNext}
                  maxAmount={maxAmount}
                  maxDuration={maxDuration}
                />
              )}

              {step === 2 && !loading && fullName && (
                <StepLoanBond
                  onNext={goNext}
                  onBack={goBack}
                  fullname={fullName}
                  loanAmount={formValues.amount}
                  repaymentPeriod={formValues.duration_month}
                />
              )}

              {step === 3 && (
                <StepSalaryDeduction
                  // control={control}
                  // register={register}
                  // errors={errors}
                  onNext={goNext}
                  onBack={goBack}
                  loanAmount={formValues.amount}
                />
              )}

              {step === 4 && (
                <StepGuarantors
                  register={register}
                  errors={errors}
                  onNext={goNext}
                  onBack={goBack}
                  isPending={isPending}
                />
              )}

              {step === 5 && (
                <StepReviewSubmit
                  data={formValues}
                  onSubmit={onFinalSubmit}
                  onBack={goBack}
                  isPending={isPending}
                />
              )}
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
