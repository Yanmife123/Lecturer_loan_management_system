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
      <LoanRecordsStats />
      <div className="space-y-3">
        <div className="flex justify-end items-center gap-2">
          {/* <Button variant="default" size="sm" asChild>
            <Link
              href="/admin/dashboard/loans-records/requests"
              className="flex items-center gap-2 text-primaryT"
            >
              View All Loan Requests
            </Link>
          </Button> */}
          <Button variant="outline" size="sm" asChild>
            <Link
              href="/admin/dashboard/loans-records/all-loan-repayments"
              className="flex items-center gap-2 text-primaryT"
            >
              View All Loan Repayments
            </Link>
          </Button>
        </div>
      </div>
      <LoanTable />
    </div>
  );
}
