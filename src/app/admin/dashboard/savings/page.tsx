import { PageHeader } from "@/components/shared/header/page-header2";
import { SavingStats } from "@/components/pages/admin/dashboard/saving/saving-stats";
import { SavingTable } from "@/components/pages/admin/dashboard/saving/saving-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SavingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Saving Records"
        description="View and manage saving records."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dasboard/" },
          { label: "Saving Record" },
        ]}
      />
      {/* Content for the Savings Page */}

      <SavingTable showStats={true} />
    </div>
  );
}
