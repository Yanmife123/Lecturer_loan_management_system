import { SearchSection } from "@/components/pages/admin/dashboard/loans-records/loan-repayment/search-member/search-section";
import { PageHeader } from "@/components/shared/header/page-header2";

export default function SearchMember() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Post Loan Repayment"
        description="Search for a member by name or membership number to post a repayment against their active loan schedule."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard/" },
          { label: "Loan Records", href: "/admin/dashboard/loans-records" },
          {
            label: "Loan Repayments",
            href: "/admin/dashboard/loans-records/all-loan-repayments",
          },
          {
            label: "Post Loan Repayment",
          },
        ]}
      />
      <div className="space-y-6">
        <SearchSection />
      </div>
    </div>
  );
}
