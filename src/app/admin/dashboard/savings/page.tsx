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
      <SavingStats />
      <div className="space-y-3">
        <div className="flex justify-end items-center">
          <Button variant="outline" size="sm" asChild>
            <Link
              href="/admin/dashboard/savings/allsaving"
              className="text-primaryT"
            >
              View All Savings
            </Link>
          </Button>
        </div>
        <SavingTable />
      </div>
    </div>
  );
}
