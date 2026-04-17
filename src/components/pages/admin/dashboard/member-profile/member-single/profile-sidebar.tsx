"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CameraIcon } from "lucide-react";

export default function ProfileSidebar() {
  return (
    <div className="md:w-[435px] w-full max-w-3xl font-sans">
      <Card className="p-6 space-y-3">
        {/* Avatar Section */}
        <div className="flex justify-center border-b pb-4 border-[#1B2E5E1A]">
          <div className="relative flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarFallback className="bg-blue-900 text-white text-3xl font-bold">
                AJ
              </AvatarFallback>
            </Avatar>
            <div className="pb-3">
              <p className="text-[#64748B] text-sm capitalize leading-5 mb-1 text-center">
                Dr. Adeyemi Johnson Oluwaseun
              </p>
              <p className="font-normal text-primaryT text-lg leading-7 text-center">
                CCOP/2024/087
              </p>
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
              CCOP/2024/087
            </p>
          </div>

          <div className="border-b border-[#1B2E5E1A] py-3">
            <p className="text-[#64748B] text-sm capitalize leading-5 mb-1">
              Member Since
            </p>
            <p className="font-normal text-primaryT text-base text-primaryT leading-6">
              August 2024
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
                Active
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
