import AdminLoanRequestProfile from "@/components/pages/admin/dashboard/loans-requests/singleLoanRequestPending/member-single/profile-page";
import { PageHeader } from "@/components/shared/header/page-header2";

export default async function SingleLoanRequestPending({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <PageHeader
        title="Loan Pending Request Info"
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
            label: "Loan Pending Request Info",
          },
        ]}
      />
      <AdminLoanRequestProfile id={id} />
    </div>
  );
}
