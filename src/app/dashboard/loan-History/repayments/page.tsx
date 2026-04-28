import { UserRepayemntTable } from "@/components/pages/dashboard/loan-history/allRepayemntRecord/repayment-Table";
import { PageHeader } from "@/components/shared/header/page-header2";

export default function AllRepayemtnUser() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="All Repayments Records"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Loan History",
            href: "/dashboard/loan-History/",
          },
          {
            label: "Repayment Record",
            // href: "/dashboard/loan-History/",
          },
        ]}
      />
      <UserRepayemntTable />
    </div>
  );
}
