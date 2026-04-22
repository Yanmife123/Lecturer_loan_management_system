"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import InfoField from "./info-field";
import { LoanApplication } from "@/lib/type/admin/dashboard/loan-requests/pendingRequest";
import { formatDate } from "@/components/utility/functions/data-fn";

export default function GuarantorInfo({ data }: { data: LoanApplication }) {
  return (
    <Card className="p-8 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg leading-6 font-medium text-primaryT">
          Guarantor Information
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        {/* Left Column */}
        <div className="space-y-6">
          <InfoField label="Prefix" value={data.guarantor_id.prefix} />
          <InfoField label="Gender" value={data.guarantor_id.gender} />
          <InfoField
            label="Membership No"
            value={data.guarantor_id.membership_detail.membership_no}
          />

          <InfoField
            label="Residential Address"
            value={data.guarantor_id.residential_address}
          />
          <InfoField
            label="Permanent Home Address"
            value={data.guarantor_id.permanent_address}
          />
          <InfoField
            label="Email Address"
            value={data.guarantor_id.email + " (read-only)"}
          />
          <InfoField
            label="Total Saving"
            value={
              "₦ " +
              Number(
                data.guarantor_id.membership_detail.total_saving,
              ).toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          />
          <InfoField
            label="Total Oustanding Loan Balance"
            value={
              "₦ " +
              Number(
                data.guarantor_id.membership_detail.total_oustanding_loan,
              ).toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          />
          <InfoField
            label="Email Address"
            value={data.guarantor_id.email + " (read-only)"}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <InfoField
            label="Full Name"
            value={`${data.guarantor_id.surname} ${data.guarantor_id.other_names}`}
          />
          <InfoField
            label="Date Joined"
            value={formatDate(
              data.guarantor_id.membership_detail?.effective_date_of_membership,
            )}
          />
          <InfoField
            label="Telephone Number"
            value={data.guarantor_id.phone_number}
          />
          <div></div> {/* Spacer */}
          <div></div> {/* Spacer */}
          <div></div> {/* Spacer */}
        </div>
      </div>
    </Card>
  );
}
