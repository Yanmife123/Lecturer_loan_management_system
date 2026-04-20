import { Banner } from "@/components/pages/dashboard/banner";
import { RecentActivity } from "@/components/pages/dashboard/recentTable";
import { StatCard } from "@/components/pages/dashboard/statsCard";
import { PiggyBank, FileText, User, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Banner />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        <StatCard icon={PiggyBank} value="₦850,000" label="Savings Balance" />
        <StatCard
          icon={FileText}
          value="2"
          label="Active Loans"
          iconVariant="blue"
        />
        <StatCard
          icon={TrendingUp}
          value="March 15"
          label="Next Repayment"
          iconVariant="yellow"
        />
        <StatCard icon={User} value="Active" label="Membership Status" />
      </div>
      <RecentActivity />
    </div>
  );
}
