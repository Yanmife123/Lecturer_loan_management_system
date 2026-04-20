"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { LoanFormData } from "./types";
import { CustomInput } from "@/components/utility/form/custom-input";
import { Button } from "@/components/ui/button";

type Props = {
  register: UseFormRegister<LoanFormData>;
  errors: FieldErrors<LoanFormData>;
  onNext: () => void;
};

export default function StepLoanDetails({ register, errors, onNext }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-[#1B2E5E]">
        Step 1: Loan Details
      </h2>

      <div className="space-y-5">
        <CustomInput
          register={register}
          inputname="loan_amount"
          label="Loan Amount (₦)"
          placeholder="Enter amount"
          type="number"
          step="0.01"
          error={errors.loan_amount?.message}
        />

        <CustomInput
          register={register}
          inputname="repayment_period"
          label="Repayment Period (months)"
          placeholder="Enter period"
          type="number"
          error={errors.repayment_period?.message}
        />

        <CustomInput
          register={register}
          inputname="bank_name"
          label="Bank Name"
          placeholder=""
          type="text"
          error={errors.bank_name?.message}
        />

        <CustomInput
          register={register}
          inputname="bank_account_number"
          label="Bank Account Number"
          placeholder="Enter 10-digit account number"
          type="text"
          error={errors.bank_account_number?.message}
        />
      </div>

      <Button
        type="button"
        onClick={onNext}
        className="w-full h-12 bg-[#1B2E5E] hover:bg-[#1B2E5E]/90 text-white font-medium"
      >
        Save & Continue
      </Button>
    </div>
  );
}
