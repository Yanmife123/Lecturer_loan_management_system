import { MemberTable } from "@/components/pages/admin/dashboard/member-profile/member-table";
import { MemberStats } from "@/components/pages/admin/dashboard/member-profile/users-stats";
import { PageHeader } from "@/components/shared/header/page-header2";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MemberProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Member Profile"
        // description="View member profile details."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard/" },
          { label: "Members", href: "/admin/dashboard/members" },
          //   { label: "Profile" },
        ]}
      />
      <MemberStats />
      <div className="space-y-3">
        <div className="flex justify-end items-center gap-3">
          <Button variant="outline">
            <Link href="/admin/dashboard/members/member-requests">
              Member Register Requests
            </Link>
          </Button>
          <Button variant="default">
            <Link href="/admin/dashboard/members/all-members">All Members</Link>
          </Button>
        </div>
        <MemberTable />
      </div>
    </div>
  );
}
