"use client";
import { formatDate } from "@/components/utility/functions/data-fn";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CameraIcon } from "lucide-react";
import { Member } from "@/lib/type/profile/userProfile";

export default function ProfileSidebar({ data }: { data: Member }) {
  return (
    <div className="md:w-[435px] w-full max-w-3xl font-sans">
      <Card className="p-6 space-y-3">
        {/* Avatar Section */}
        <div className="flex justify-center border-b pb-4 border-[#1B2E5E1A]">
          <div className="relative">
            <Avatar className="h-32 w-32">
              <AvatarFallback className="bg-blue-900 text-white text-3xl font-bold">
                {data.surname.charAt(0) + data.other_names.charAt(0) || "NN"}
              </AvatarFallback>
            </Avatar>
            <Badge className="absolute bottom-2 right-2 h-8 w-8 rounded-full flex items-center justify-center bg-[#C89B2A] text-white shadow-lg">
              <CameraIcon className="h-7 w-7" />
            </Badge>
          </div>
        </div>

        {/* Membership Info */}
        <div className="space-y-4 text-sm text-center">
          <div className="border-b border-[#1B2E5E1A] pb-3">
            <p className="text-[#64748B] text-sm capitalize leading-5 mb-1">
              Membership Number
            </p>
            <p className="font-normal text-primaryT text-lg leading-7">
              {data.membership_detail.membership_no}
            </p>
          </div>

          <div className="border-b border-[#1B2E5E1A] py-3">
            <p className="text-[#64748B] text-sm capitalize leading-5 mb-1">
              Member Since
            </p>
            <p className="font-normal text-primaryT text-base text-primaryT leading-6">
              {formatDate(
                data.membership_detail.effective_date_of_membership,
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
                {data.status}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
