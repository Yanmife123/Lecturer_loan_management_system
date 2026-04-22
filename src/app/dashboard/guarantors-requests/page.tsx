import GuarantorsRequestsTable from "@/components/pages/dashboard/guarantors-request/guarantors-table";
import { PageHeader } from "@/components/shared/header/page-header2";

export default function GuarantorsRequests() {
  return (
    <div className="font-sans space-y-6">
      <PageHeader
        title="All Guarantor Request"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Guarantor Requests" },
        ]}
      />
      <GuarantorsRequestsTable />
    </div>
  );
}
