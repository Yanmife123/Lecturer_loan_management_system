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

// ─── Validation Schemas per step ────────────────────────────────────────────

const step1Schema = z.object({
  loan_amount: z.coerce
    .number({ invalid_type_error: "Enter a valid amount" })
    .positive("Amount must be greater than 0"),
  repayment_period: z.coerce
    .number({ invalid_type_error: "Enter a valid period" })
    .int()
    .positive("Period must be greater than 0"),
  bank_name: z.string().min(2, "Bank name is required"),
  bank_account_number: z
    .string()
    .min(10, "Account number must be at least 10 digits")
    .max(10, "Account number must be 10 digits"),
});

const step2Schema = z.object({
  borrower_signature: z.string().min(1, "Signature is required"),
});

const step3Schema = z.object({
  salary_deduction_signature: z.string().min(1, "Signature is required"),
});

const step4Schema = z.object({
  guarantor1_email: z.string().email("Enter a valid email"),
  guarantor2_email: z.string().email("Enter a valid email"),
});

const schemaMap: Record<LoanStep, z.ZodTypeAny> = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
  4: step4Schema,
  5: z.object({}),
};

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  member: Member;
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function LoanApplicationPage() {
  const router = useRouter();
  const [step, setStep] = useState<LoanStep>(1);
  const [submitted, setSubmitted] = useState(false);

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
    <div className="min-h-screen bg-[#F1F3F5] font-sans">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1B2E5E] transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-2xl font-semibold text-[#1B2E5E]">
            Apply for Loan
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Complete the application process
          </p>
        </div>

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
              />
            )}

            {step === 2 && !loading && fullName && (
              <StepLoanBond
                control={control}
                errors={errors}
                onNext={goNext}
                onBack={goBack}
                fullname={fullName}
                loanAmount={formValues.loan_amount}
                repaymentPeriod={formValues.repayment_period}
              />
            )}

            {step === 3 && (
              <StepSalaryDeduction
                control={control}
                register={register}
                errors={errors}
                onNext={goNext}
                onBack={goBack}
                // member={user ? user}
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
    </div>
  );
}
