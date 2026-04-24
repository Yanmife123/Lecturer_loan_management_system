import { ExecutiveLoanTable } from "@/components/pages/admin/dashboard/loans-requests/executives-approval/executive-loan-approval-table";
import { PageHeader } from "@/components/shared/header/page-header2";

export default function LoanRequestReview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Loan Approval"
        description="These are loan requests for the executive to approve or decline, apart from the chairman and secretary."
        breadcrumbs={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Loan Requests Pending",
            href: "/admin/dashboard/loans-requests",
          },
          {
            label: "Exectives Loan Approval",
          },
        ]}
      />
      <ExecutiveLoanTable />
    </div>
  );
}
