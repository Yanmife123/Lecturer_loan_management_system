import { MemberUnderReviewTable } from "@/components/pages/admin/dashboard/member-profile/member-underreview/member-underreview-table";
import { PageHeader } from "@/components/shared/header/page-header2";

export default function MemberUnderReview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Member Under Review"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Members", href: "/admin/dashboard/members" },
          {
            label: "Member Requests",
            href: "/admin/dashboard/members/member-requests",
          },
        ]}
      />
      <MemberUnderReviewTable />
    </div>
  );
}
