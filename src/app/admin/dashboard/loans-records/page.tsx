import { LoanTable } from "@/components/pages/admin/dashboard/loans-records/all-loans";
import LoanRecordsStats from "@/components/pages/admin/dashboard/loans-records/loan-stats";
import { PageHeader } from "@/components/shared/header/page-header2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function LoanRecords() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="All Loan Records"
        // description="View all loan records."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard/" },
          { label: "Loan Records" },
        ]}
      />

      <LoanTable />
    </div>
  );
}
