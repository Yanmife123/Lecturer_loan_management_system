import { LoanTable } from "@/components/pages/admin/dashboard/loans-records/all-loans";
import { PageHeader } from "@/components/shared/header/page-header2";
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
        <LoanTable />
      </div>
    </div>
  );
}
