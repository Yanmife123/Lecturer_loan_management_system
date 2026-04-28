import { Banner } from "@/components/pages/dashboard/banner";
import { UsersDashboardStats } from "@/components/pages/dashboard/dashboard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Banner />
      <UsersDashboardStats />
      {/* <RecentActivity /> */}
    </div>
  );
}
