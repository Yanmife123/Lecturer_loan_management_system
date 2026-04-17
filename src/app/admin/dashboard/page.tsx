import { DashboardOverview } from "@/components/pages/admin/dashboard/dashboard-overview";
import { PageHeader } from "@/components/shared/header/page-header2";
export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard Overview" />

      <DashboardOverview />
    </div>
  );
}
