import { GuarantorRequestDetails } from "@/components/pages/dashboard/guarantors-request/id/SingleRequestComponent";
import { PageHeader } from "@/components/shared/header/page-header2";
export default async function SingleGuarantorRequest({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <PageHeader
        title={"Guarantor Request"}
        breadcrumbs={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            label: "All Guarantor Request",
            href: "/dashboard/guarantors-requests",
          },
          {
            label: "Guarantors Requests",
          },
        ]}
      />
      <GuarantorRequestDetails id={id} />
    </div>
  );
}
