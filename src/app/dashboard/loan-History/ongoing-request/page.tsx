import LoanOngoingRequestTable from "@/components/pages/dashboard/loan-history/ongoingRequest/loan-ongoing-request-table";

import { PageHeader } from "@/components/shared/header/page-header2";

export default function LoanOngoingRequest() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ongoing Loans Requests"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Loan History", href: "/dashboard/loan-History" },
          { label: "Ongoing Loan Requests" },
        ]}
      />
      <LoanOngoingRequestTable />
      oa
    </div>
  );
}
