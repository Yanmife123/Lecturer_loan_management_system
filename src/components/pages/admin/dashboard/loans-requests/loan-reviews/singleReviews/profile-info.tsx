"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import InfoField from "./info-field";
import { LoanApplication } from "@/lib/type/admin/dashboard/loan-requests/pendingRequest";
import { formatDate } from "@/components/utility/functions/data-fn";

export default function ProfileInfo({ data }: { data: LoanApplication }) {
  return (
    <Card className="p-8 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg leading-6 font-medium text-primaryT">
          Profile Information
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        {/* Left Column */}
        <div className="space-y-6">
          <InfoField label="Prefix" value={data.user.prefix} />
          <InfoField label="Gender" value={data.user.gender} />

          <InfoField
            label="Email Address"
            value={data.user.email + " (read-only)"}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <InfoField
            label="Full Name"
            value={`${data.user.surname} ${data.user.other_names} `}
          />
          {/* <InfoField label="Date of Birth" value= /> */}
          <InfoField
            label="Telephone Number"
            value={formatDate(data.user.date_of_birth, "full")}
          />
          <div></div> {/* Spacer */}
          <div></div> {/* Spacer */}
          <div></div> {/* Spacer */}
        </div>
      </div>
    </Card>
  );
}
