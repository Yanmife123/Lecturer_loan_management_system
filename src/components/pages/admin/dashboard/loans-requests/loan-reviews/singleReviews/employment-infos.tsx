import { Card } from "@/components/ui/card";
import InfoField from "./info-field";
import { LoanApplication } from "@/lib/type/admin/dashboard/loan-requests/pendingRequest";
import { formatDate } from "@/components/utility/functions/data-fn";

export function EmploymentInfos({ data }: { data: LoanApplication }) {
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
          <InfoField
            label="Present Designation"
            value={data.user.member_info.designation}
          />
          <InfoField
            label="Staff File No"
            value={data.user.member_info.staff_file_no}
          />
          <InfoField
            label="Department/Div"
            value={data.user.member_info.department}
          />
        </div>
        <div className="space-y-6">
          <InfoField
            label="Salary Scale Step"
            value={data.user.member_info.salary_scale_step}
          />
          <InfoField
            label="Salary Scale Level"
            value={data.user.member_info.salary_scale_level}
          />
          <InfoField
            label="Date of First Appointment"
            value={formatDate(
              data.user.member_info.date_of_first_appointment,
              "full",
            )}
          />
          <InfoField label="Faculty" value={data.user.member_info.faculty} />
        </div>
      </div>
    </Card>
  );
}
