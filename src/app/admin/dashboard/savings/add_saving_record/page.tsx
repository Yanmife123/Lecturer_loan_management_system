import { AddSvingRecordForm } from "@/components/pages/admin/dashboard/saving/add-single-record/form";
import { PageHeader } from "@/components/shared/header/page-header2";

export default function AddSaving() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Savings Record"
        description="Enter a member's monthly savings contribution to update their account balance."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dasboard/" },
          {
            label: "Saving Record",
            href: "/admin/dashboard/savings",
          },
          { label: "Add Savings Record" },
        ]}
      />
      <AddSvingRecordForm />
    </div>
  );
}
