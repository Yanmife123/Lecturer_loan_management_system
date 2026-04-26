import { SavingTable } from "@/components/pages/admin/dashboard/saving/saving-table";
import { PageHeader } from "@/components/shared/header/page-header2";

export default function AllSavingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="All Saving Records"
        description="View all saving records."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard/" },
          { label: "Saving Records", href: "/admin/dashboard/savings" },
          { label: "All Saving Records" },
        ]}
      />
      <SavingTable showStats={false} />
    </div>
  );
}
