"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import InfoField from "./info-field";
// import { LoanApplication } from "@/lib/type/admin/dashboard/loan-requests/pendingRequest";
import { LoanApplication } from "@/lib/type/admin/dashboard/loan-requests/loan-review-executive";
import LoanStatusBadge from "@/components/shared/LoanStatus";

const getExecutiveStatus = (status: number | null | undefined) => {
  // Check for Accepted (1 or true)
  if (status) {
    return {
      label: "Approved",
      classes: "bg-green-100 text-green-700 border-green-200",
    };
  }

  // Check for Declined (0 or false)
  // We use !== null because 0 is falsy, but so is null. We want to distinguish them.
  // Fallback for null or undefined
  return {
    label: "Pending",
    classes: "bg-amber-100 text-amber-700 border-amber-200",
  };
};

const ExecutiveStatus = ({ status }: { status: number | null | undefined }) => {
  const statusDetails = getExecutiveStatus(status);
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusDetails.classes}`}
    >
      {statusDetails.label}
    </span>
  );
};

export default function LoanInfo({ data }: { data: LoanApplication }) {
  return (
    <Card className="p-8 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg leading-6 font-medium text-primaryT">
          Loan Request Information
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        {/* Left Column */}
        <div className="space-y-6">
          <InfoField
            label="Request Loan Amount"
            value={
              "₦ " +
              Number(data.amount).toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          />
          <InfoField label="Loan Type" value={data.loan_type.name} />
          <InfoField
            label="interest Rate"
            value={`${data.loan_type.interest_rate}% ${data.loan_type.interest_type}`}
          />

          <InfoField
            label="Durations"
            value={String(data.duration_month) + " Months"}
          />
          <InfoField label={"Bank name"} value={data.bank_name} />
          <InfoField label={"Bank account"} value={data.bank_account_number} />
          <div className="font-sans">
            <p className="text-sm text-[#64748B] leading-5 font-medium mb-1">
              President Approval Status
            </p>
            <ExecutiveStatus status={data.loan_approval.president_id} />
          </div>
          <div className="font-sans">
            <p className="text-sm text-[#64748B] leading-5 font-medium mb-1">
              General Secretary Approval Status
            </p>
            <ExecutiveStatus status={data.loan_approval.secretary_id} />
          </div>
          <InfoField label={"Bank account"} value={data.bank_account_number} />
          <LoanStatusBadge status={data.status} />
        </div>

        {/* Right Column */}
      </div>
    </Card>
  );
}
