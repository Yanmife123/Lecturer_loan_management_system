import { MemberTable } from "@/components/pages/admin/dashboard/member-profile/member-table";
import { PageHeader } from "@/components/shared/header/page-header2";
export default function AllMembersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="All Members"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Members", href: "/admin/dashboard/members" },
          {
            label: "All Members",
            href: "/admin/dashboard/members/all-members",
          },
        ]}
      />
      <MemberTable />
    </div>
  );
}
