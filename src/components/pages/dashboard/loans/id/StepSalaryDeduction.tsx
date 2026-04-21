"use client";

import {
  Controller,
  Control,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { LoanFormData } from "./types";
import { Button } from "@/components/ui/button";
// import { FileInput } from "@/components/file-input";
// import { FileInput } from "@/components/utility/form/custom-file";
// import SignaturePad from "./SignaturePad";
// import { Member } from "@/types/member";
// import { Member } from "@/lib/type/profile/userProfile";
import { format } from "date-fns";
import { useUser } from "@/lib/hooks/useUser";

type Props = {
  // control: Control<LoanFormData>;
  // register: UseFormRegister<LoanFormData>;
  // errors: FieldErrors<LoanFormData>;
  onNext: () => void;
  onBack: () => void;
  // member: Member;
  loanAmount: number;
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-1 text-sm">
      <span className="text-gray-500 min-w-[120px]">{label}</span>
      <span className="text-[#1B2E5E] font-medium">{value}</span>
    </div>
  );
}

export default function StepSalaryDeduction({
  // control,
  // register,
  // errors,
  onNext,
  onBack,
  // member,
  loanAmount,
}: Props) {
  // const info = member.member_info;
  // const membership = member.membership_detail;
  const formattedAmount = loanAmount
    ? `₦${Number(loanAmount).toLocaleString()}`
    : "₦______";

  // const effectiveMonth = membership?.effective_date_of_membership
  //   ? format(new Date(membership.effective_date_of_membership), "MMMM yyyy")
  //   : "______";
  const { user, loading } = useUser();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-[#1B2E5E]">
        Step 3: Salary Deduction Authorization
      </h2>

      {/* Document */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white space-y-5">
        <div className="space-y-1">
          <p className="font-semibold text-sm text-[#1B2E5E] uppercase tracking-wide">
            Salary Deduction Authorization
          </p>
          <p className="text-xs text-gray-500">
            To: The Bursar, Redeemer&apos;s University
          </p>
        </div>

        {/* Passport photo placeholders */}
        <div className="flex gap-2 justify-end">
          <div className="h-16 w-14 border border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-400">
            Photo 1
          </div>
          <div className="h-16 w-14 border border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-400">
            Photo 2
          </div>
        </div>

        {/* Info Grid */}
        {!loading && user && (
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <InfoRow
              label="Membership No:"
              value={user.membership_detail.membership_no ?? "—"}
            />
            <InfoRow
              label="Staff File No:"
              value={user.member_info.staff_file_no ?? "—"}
            />
            <InfoRow label="Surname:" value={user.surname} />
            <InfoRow label="Other Names:" value={user.other_names} />
            <InfoRow
              label="Department:"
              value={user.member_info.department ?? "—"}
            />
            <InfoRow
              label="Designation:"
              value={user.member_info.designation ?? "—"}
            />
          </div>
        )}

        {/* <p className="text-sm text-gray-700 leading-relaxed">
          I hereby authorize you to deduct from my monthly salary the sum of{" "}
          <span className="font-semibold text-[#1B2E5E] underline">
            {formattedAmount}
          </span>{" "}
        
          .
        </p> */}
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
