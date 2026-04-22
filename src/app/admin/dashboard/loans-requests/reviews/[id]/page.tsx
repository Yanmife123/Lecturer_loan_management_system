import AdminLoanRequestReviewsProfile from "@/components/pages/admin/dashboard/loans-requests/loan-reviews/singleReviews/profile-page";
import { PageHeader } from "@/components/shared/header/page-header2";

export default async function SingleLoanRequestReviews({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
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
            label: "Loan Reviews Request",
            href: "/admin/dashboard/loans-requests/reviews",
          },
          {
            label: "Single Loan Reviews Info",
          },
        ]}
      />
      <AdminLoanRequestReviewsProfile id={id} />
    </div>
  );
}
