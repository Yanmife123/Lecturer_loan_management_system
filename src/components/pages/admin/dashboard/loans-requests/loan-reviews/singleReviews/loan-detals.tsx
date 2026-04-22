"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import InfoField from "./info-field";
import { LoanApplication } from "@/lib/type/admin/dashboard/loan-requests/pendingRequest";
import LoanStatusBadge from "@/components/shared/LoanStatus";

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
          <LoanStatusBadge status={data.status} />
        </div>

        {/* Right Column */}
      </div>
    </Card>
  );
}
