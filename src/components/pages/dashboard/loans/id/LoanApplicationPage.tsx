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
      const formData = new FormData();
      formData.append("loan_amount", String(data.loan_amount));
      formData.append("repayment_period", String(data.repayment_period));
      formData.append("bank_name", data.bank_name);
      formData.append("bank_account_number", data.bank_account_number);
      formData.append("borrower_signature", data.borrower_signature);
      formData.append(
        "salary_deduction_signature",
        data.salary_deduction_signature,
      );
      formData.append("guarantor1_email", data.guarantor1_email);
      formData.append("guarantor2_email", data.guarantor2_email);

      if (data.passport_photo_1?.[0]) {
        formData.append("passport_photo_1", data.passport_photo_1[0]);
      }
      if (data.passport_photo_2?.[0]) {
        formData.append("passport_photo_2", data.passport_photo_2[0]);
      }

      return axios.post("/api/loans/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => setSubmitted(true),
    onError: (error) => {
      console.error("Loan submission failed:", error);
    },
  });

  // ─── Step navigation ──────────────────────────────────────────────────────
  const goNext = async () => {
    const valid = await trigger();
    if (valid) setStep((prev) => (prev < 5 ? ((prev + 1) as LoanStep) : prev));
  };

  const goBack = () =>
    setStep((prev) => (prev > 1 ? ((prev - 1) as LoanStep) : prev));

  const onFinalSubmit = handleSubmit((data) => submitLoan(data));

  const formValues = getValues();

  // ─── Render ───────────────────────────────────────────────────────────────
  if (submitted) return <SuccessModal />;

  const { fullName, loading } = useUser();
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
                  loanAmount={formValues.loan_amount}
                  repaymentPeriod={formValues.repayment_period}
                />
              )}

              {step === 3 && (
                <StepSalaryDeduction
                  // control={control}
                  // register={register}
                  // errors={errors}
                  onNext={goNext}
                  onBack={goBack}
                  loanAmount={formValues.loan_amount}
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
