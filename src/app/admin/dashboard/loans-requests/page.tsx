import { LoanRequestsTable } from "@/components/pages/admin/dashboard/loans-requests/loan-requests-table";
import { PageHeader } from "@/components/shared/header/page-header2";

export default function LoansRequests() {
  return (
    <div className="space-y-6">
      <PageHeader title="Loan Requests" />
      <LoanRequestsTable />
    </div>
  );
}
