"use client";

import { LoanFormData } from "./types";
import { Button } from "@/components/ui/button";

type Props = {
  data: Partial<LoanFormData>;
  onSubmit: () => void;
  onBack: () => void;
  isPending: boolean;
};

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-[#1B2E5E] font-medium">{value}</span>
    </div>
  );
}

export default function StepReviewSubmit({
  data,
  onSubmit,
  onBack,
  isPending,
}: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-[#1B2E5E]">
        Step 5: Review & Submit
      </h2>

      {/* Loan Details */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-[#F1F3F5] px-4 py-2.5">
          <p className="text-sm font-medium text-[#1B2E5E]">Loan Details</p>
        </div>
        <div className="px-4 py-2 divide-y divide-gray-100">
          <ReviewRow label="Loan Type" value="Normal Loan" />
          <ReviewRow
            label="Amount"
            value={
              data.loan_amount
                ? `₦${Number(data.loan_amount).toLocaleString()}`
                : "—"
            }
          />
          <ReviewRow
            label="Period"
            value={
              data.repayment_period ? `${data.repayment_period} months` : "—"
            }
          />
          <ReviewRow label="Bank" value={data.bank_name ?? "—"} />
          <ReviewRow label="Account" value={data.bank_account_number ?? "—"} />
        </div>
      </div>

      {/* Guarantors */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-[#F1F3F5] px-4 py-2.5">
          <p className="text-sm font-medium text-[#1B2E5E]">Guarantors</p>
        </div>
        <div className="px-4 py-2 divide-y divide-gray-100">
          <ReviewRow label="Guarantor 1" value={data.guarantor1_email ?? "—"} />
          <ReviewRow label="Guarantor 2" value={data.guarantor2_email ?? "—"} />
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
          onClick={onSubmit}
          disabled={isPending}
          className="flex-1 h-12 bg-[#C89B2A] hover:bg-[#C89B2A]/90 text-white font-medium"
        >
          {isPending ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </div>
  );
}
