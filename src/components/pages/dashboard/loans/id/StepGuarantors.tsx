"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { LoanFormData } from "./types";
// import { CustomInput } from "@/components/custom-input";
import { CustomInput } from "@/components/utility/form/custom-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  register: UseFormRegister<LoanFormData>;
  errors: FieldErrors<LoanFormData>;
  onNext: () => void;
  onBack: () => void;
  isPending: boolean;
};

export default function StepGuarantors({
  register,
  errors,
  onNext,
  onBack,
  isPending,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-[#1B2E5E]">
          Step 4: Add Guarantors
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          A notification link will be sent to each guarantor for their consent.
        </p>
      </div>

      <div className="space-y-5">
        {/* Guarantor 1 */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#1B2E5E]">Guarantor 1</p>
          <CustomInput
            register={register}
            inputname="guarantor1_email"
            label="Email Address"
            placeholder="guarantor1@example.com"
            type="email"
            error={errors.guarantor1_email?.message}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Status:</span>
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs font-normal">
              Pending
            </Badge>
          </div>
        </div>

        <div className="border-t border-gray-100" />

        {/* Guarantor 2 */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#1B2E5E]">Guarantor 2</p>
          <CustomInput
            register={register}
            inputname="guarantor2_email"
            label="Email Address"
            placeholder="guarantor2@example.com"
            type="email"
            error={errors.guarantor2_email?.message}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Status:</span>
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs font-normal">
              Pending
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="flex-1 h-12 border-[#1B2E5E] text-[#1B2E5E]"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={isPending}
          className="flex-1 h-12 bg-[#1B2E5E] hover:bg-[#1B2E5E]/90 text-white font-medium"
        >
          {isPending ? "Sending..." : "Send Requests & Continue"}
        </Button>
      </div>
    </div>
  );
}
