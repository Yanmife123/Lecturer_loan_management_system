// import { LoanTable } from "@/components/pages/admin/dashboard/loans-records/all-loans";
import { LoanRepaymentTable } from "@/components/pages/admin/dashboard/loans-records/loan-repayment/loan-repayment";
import { PageHeader } from "@/components/shared/header/page-header2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function AllLoanRepaymentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="All Loan Repayments"
        // description="View all loan repayments."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard/" },
          { label: "Loan Records", href: "/admin/dashboard/loans-records" },
          { label: "Loan Repayments" },
        ]}
      />
      <div className="space-y-3">
        <div className="flex justify-end items-center gap-3 flex-wrap">
          <div className="grid grid-cols-1 gap-3 max-md:w-full">
            <Button variant="outline">
              <Link href="/admin/dashboard/loans-records/all-loan-repayments/search-member">
                Create Repayment Records
              </Link>
            </Button>
          </div>
        </div>
        <LoanRepaymentTable />
      </div>
    </div>
  );
}
