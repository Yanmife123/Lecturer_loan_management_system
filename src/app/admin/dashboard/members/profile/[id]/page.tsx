import AdminProfileComponent from "@/components/pages/admin/dashboard/member-profile/member-single/profile-page";
import { PageHeader } from "@/components/shared/header/page-header2";

export default async function SingleMemberProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Member Profile - ID: ${id}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Members", href: "/admin/dashboard/members" },
          { label: `Profile - ID: ${id}` },
        ]}
      />
      {/* Add member profile details here */}
      {/* <p>Details for member with ID: {id}</p> */}
      <AdminProfileComponent />
    </div>
  );
}
