import { StatCard } from "@/components/pages/dashboard/statsCard";
import { PiggyBank, Calendar, TrendingUp } from "lucide-react";
import SavingTable from "@/components/pages/dashboard/saving/savingTable";

export default function DashboardSavings() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
        <StatCard
          icon={PiggyBank}
          value="₦850,000"
          label="Total Savings to Date"
        />
        <StatCard
          icon={TrendingUp}
          value="₦50,000"
          label="Monthly Savings Amount"
          iconVariant="yellow"
        />
        <StatCard
          icon={Calendar}
          value="2.5 Years"
          label="Years as Member"
          iconVariant="blue"
        />
      </div>
      <SavingTable />
    </div>
  );
}
