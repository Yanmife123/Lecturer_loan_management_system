import { MemberRequestsTable } from "@/components/pages/admin/dashboard/member-profile/members-requests/requests-table";
import { PageHeader } from "@/components/shared/header/page-header2";
export default function MemberRequestsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Member Requests"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Members", href: "/admin/dashboard/members" },
          {
            label: "Member Requests",
            href: "/admin/dashboard/members/member-requests",
          },
        ]}
      />
      <MemberRequestsTable />
    </div>
  );
}
