"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import InfoField from "./info-field";
import { Member } from "@/lib/type/profile/userProfile";
import { formatDate } from "@/components/utility/functions/data-fn";

export default function ProfileInfo({ data }: { data: Member }) {
  return (
    <Card className="p-8 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg leading-6 font-medium text-primaryT">
          Profile Information
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#C89B2A]  hover:text-[#D4A835] focus:ring-[#D4A835] focus:ring-offset-0 focus:ring-2 cursor-pointer"
        >
          <PencilIcon className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        {/* Left Column */}
        <div className="space-y-6">
          <InfoField label="Prefix" value={data.prefix} />
          <InfoField label="Gender" value={data.gender} />
          <InfoField label="Marital Status" value={data.marital_status} />
          <InfoField
            label="Department/Div"
            value={data.member_info.department}
          />
          <InfoField label="Salary Scale" value="CONULS 01" />
          <InfoField label="Date of First Appointment" value="8/6/2020" />
          <InfoField
            label="Residential Address"
            value={data.residential_address}
          />
          <InfoField
            label="Permanent Home Address"
            value={data.permanent_address}
          />
          <InfoField
            label="Email Address"
            value={`${data.email} (read-only)`}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <InfoField
            label="Full Name"
            value={`${data.prefix} ${data.surname} ${data.other_names}`}
          />
          <InfoField
            label="Date of Birth"
            value={formatDate(data.date_of_birth, "short")}
          />
          <InfoField label="Faculty" value={data.member_info.faculty} />
          <InfoField
            label="Present Designation"
            value={data.member_info.designation}
          />
          <InfoField
            label="Staff File No"
            value={data.member_info.staff_file_no}
          />
          <InfoField label="Telephone Number" value={data.phone_number} />
          <div></div> {/* Spacer */}
          <div></div> {/* Spacer */}
          <div></div> {/* Spacer */}
        </div>
      </div>
    </Card>
  );
}
