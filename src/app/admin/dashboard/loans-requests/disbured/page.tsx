// import { ExecutiveLoanTable } from "@/components/pages/admin/dashboard/loans-requests/executives-approval/executive-loan-approval-table";
import { LoanApprovalTable } from "@/components/pages/admin/dashboard/loans-requests/pending-disburse/distubusement-table";
import { PageHeader } from "@/components/shared/header/page-header2";

export default function LoanDisburemnt() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Loan Disbursement"
        description="Manage and execute fund transfers for approved loan applications."
        breadcrumbs={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Loan Requests",
            href: "/admin/dashboard/loans-requests",
          },
          {
            label: "Awaiting Disbursement", // Clearer than "Executives Loan Approval"
          },
        ]}
      />
      <LoanApprovalTable />
    </div>
  );
}
