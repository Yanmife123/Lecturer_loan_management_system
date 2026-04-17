import { Card } from "@/components/ui/card";
import InfoField from "./info-field";

export function EmploymentInfos() {
  return (
    <Card className="p-8 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg leading-6 font-medium text-primaryT">
          Employment Information
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        {/* Left Column */}
        <div className="space-y-6">
          <InfoField label="Present Designation" value="Senior Lecturer" />
          <InfoField label="Staff File No" value="BJN/2024/001" />
          <InfoField
            label="Department/Div"
            value="Department of Computer Science"
          />
        </div>
        <div className="space-y-6">
          <InfoField label="Salary Scale" value="CONULS 01" />
          <InfoField label="Date of First Appointment" value="8/6/2020" />
          <InfoField label="Faculty" value="Faculty of Natural Sciences" />
        </div>
      </div>
    </Card>
  );
}
