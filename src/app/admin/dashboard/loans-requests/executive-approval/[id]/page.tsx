import { PageHeader } from "@/components/shared/header/page-header2";
import AdminLoanRequestReviewsExecutiveProfile from "@/components/pages/admin/dashboard/loans-requests/executives-approval/single/profile-page";

export default async function SingleLoanRequestReviewsExecutive({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Loan Approval Info"
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
            label: "Exectives Loan Approval",
            href: "/admin/dashboard/loans-requests/executive-approval",
          },
          {
            label: "Single Executive Loan Review Info",
          },
        ]}
      />
      <AdminLoanRequestReviewsExecutiveProfile id={id} />
    </div>
  );
}
