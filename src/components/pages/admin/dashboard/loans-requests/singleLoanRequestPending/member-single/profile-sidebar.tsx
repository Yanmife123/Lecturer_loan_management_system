"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/components/utility/functions/data-fn";
import { LoanApplication } from "@/lib/type/admin/dashboard/loan-requests/pendingRequest";
import { CameraIcon } from "lucide-react";

export default function ProfileSidebar({ data }: { data: LoanApplication }) {
  return (
    <div className="md:w-[435px] w-full max-w-3xl font-sans">
      <Card className="p-6 space-y-3">
        {/* Avatar Section */}
        <div className="flex justify-center border-b pb-4 border-[#1B2E5E1A]">
          <div className="relative flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarFallback className="bg-blue-900 text-white text-3xl font-bold">
                {data.user.surname.charAt(0) +
                  data.user.other_names.charAt(0) || "NN"}
              </AvatarFallback>
            </Avatar>
            <div className="pb-3">
              <p className="text-[#64748B] text-sm capitalize leading-5 mb-1 text-center">
                {data.user.prefix} {data.user.surname} {data.user.other_names}
              </p>
              <p className="font-normal text-primaryT text-lg leading-7 text-center"></p>
            </div>
          </div>
        </div>

        {/* Membership Info */}
        <div className="space-y-4 text-sm text-center">
          <div className="border-b border-[#1B2E5E1A] pb-3">
            <p className="text-[#64748B] text-sm capitalize leading-5 mb-1">
              Membership Number
            </p>
            <p className="font-normal text-primaryT text-lg leading-7">
              {data.user.membership_detail?.membership_no}
            </p>
          </div>

          <div className="border-b border-[#1B2E5E1A] py-3">
            <p className="text-[#64748B] text-sm capitalize leading-5 mb-1">
              Member Since
            </p>
            <p className="font-normal text-primaryT text-base text-primaryT leading-6">
              {formatDate(
                data.user.membership_detail?.effective_date_of_membership,
                "month-year",
              )}
            </p>
          </div>

          <div className="border-b border-[#1B2E5E1A] py-3">
            <p className="text-[#64748B] text-sm capitalize leading-5 mb-1">
              Membership Status
            </p>
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {data.user.status}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
