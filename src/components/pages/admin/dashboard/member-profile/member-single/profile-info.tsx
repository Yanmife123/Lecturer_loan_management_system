"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import InfoField from "./info-field";

export default function ProfileInfo() {
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
          <InfoField label="Prefix" value="Dr." />
          <InfoField label="Gender" value="Male" />
          <InfoField label="Marital Status" value="Married" />

          <InfoField
            label="Residential Address"
            value="In University Staff Quarters, Redemption City"
          />
          <InfoField
            label="Permanent Home Address"
            value="45 Adeyemi Street, Ijeja, Lagos State"
          />
          <InfoField
            label="Email Address"
            value="a.johnsonu.edu.ng (read-only)"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <InfoField label="Full Name" value="Dr. Adeyemi Johnson" />
          <InfoField label="Date of Birth" value="3/8/1985" />
          <InfoField label="Telephone Number" value="+234 803 523 6567" />
          <div></div> {/* Spacer */}
          <div></div> {/* Spacer */}
          <div></div> {/* Spacer */}
        </div>
      </div>
    </Card>
  );
}
