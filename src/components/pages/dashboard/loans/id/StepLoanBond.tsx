"use client";

import { Controller, Control, FieldErrors } from "react-hook-form";
import { LoanFormData } from "./types";
import { Button } from "@/components/ui/button";
import SignaturePad from "./SignaturePad";
// import { Member } from "@/types/member";
import { Member } from "@/lib/type/profile/userProfile";

type Props = {
  onNext: () => void;
  onBack: () => void;
  fullname: string;
  loanAmount: number;
  repaymentPeriod: number;
};

export default function StepLoanBond({
  onNext,
  onBack,
  fullname,
  loanAmount,
  repaymentPeriod,
}: Props) {
  const fullName = `${fullname}`;
  const formattedAmount = loanAmount
    ? `₦${Number(loanAmount).toLocaleString()}`
    : "₦______";
  const period = repaymentPeriod ? `${repaymentPeriod}` : "______";

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-[#1B2E5E]">Step 2: Loan Bond</h2>

      {/* Bond Document */}
      <div className="border border-gray-200 rounded-lg p-6 bg-white space-y-4">
        <div className="text-center space-y-1">
          <p className="font-semibold text-sm text-[#1B2E5E] uppercase tracking-wide">
            Loan Bond
          </p>
          <p className="text-xs text-gray-500">
            Redeemer&apos;s University Staff Cooperative Multipurpose Society
            Ltd
          </p>
        </div>

        <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
          <p>
            I, <span className="font-semibold text-[#1B2E5E]">{fullName}</span>,
            hereby acknowledge receipt of{" "}
            <span className="font-semibold text-[#1B2E5E]">
              {formattedAmount}
            </span>{" "}
            as a loan from the Redeemer&apos;s University Staff Cooperative
            Multipurpose Society Ltd.
          </p>
          <p>
            I agree to repay this loan over a period of{" "}
            <span className="font-semibold text-[#1B2E5E] underline">
              {period}
            </span>{" "}
            months at an interest rate of{" "}
            <span className="font-semibold">10% flat</span>.
          </p>
          <p className="text-xs text-gray-400 italic">
            This is a digitally generated document. Your signature will be
            captured below.
          </p>
        </div>

        {/* Signature */}
        <div></div>
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
          className="flex-1 h-12 bg-[#1B2E5E] hover:bg-[#1B2E5E]/90 text-white font-medium"
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
}
