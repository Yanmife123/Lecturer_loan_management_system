import { LoanReviewsTable } from "@/components/pages/admin/dashboard/loans-requests/loan-reviews/loan-reviews-table";
import { PageHeader } from "@/components/shared/header/page-header2";

export default function LoanRequestReview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Loan Reviews"
        description="These are loans that needs to be approve by Chairman"
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
            label: "Loan Reviews Request",
          },
        ]}
      />
      <LoanReviewsTable />
    </div>
  );
}
