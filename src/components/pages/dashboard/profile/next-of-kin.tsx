"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import InfoField from "./info-field";

export default function NextOfKin() {
  return (
    <Card className="p-8 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg leading-6 font-medium text-primar">
          Next of Kin
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#C89B2A]  hover:text-[#D4A835] focus:ring-[#D4A835] focus:ring-offset-0 focus:ring-2 cursor-pointer"
        >
          <PencilIcon className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        {/* Left Column */}
        <div className="space-y-6">
          <InfoField
            label="Full Name (Surname First)"
            value="Johnson, Grace Oluwatosin"
          />
          <InfoField label="Phone Number" value="+254 805 987 6643" />
          <InfoField
            label="Residential Address"
            value="45 Adeyemi Street, Ijeja, Lagos State"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <InfoField label="Relationship" value="Spouse" />
          <InfoField label="Email Address" value="grace.johnson@gmail.com" />
          <div></div> {/* Spacer */}
        </div>
      </div>
    </Card>
  );
}
