import { StatCard } from "@/components/pages/dashboard/statsCard";
import { TrendingUp, Users, Wallet } from "lucide-react";

export function SavingStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Total Savings" value="$120,000" icon={Wallet} />
      <StatCard label="Active Savers" value="1,200" icon={Users} />
      <StatCard label="Savings Growth" value="+15%" icon={TrendingUp} />
      <StatCard label="Average Saving" value="$100" icon={Wallet} />
    </div>
  );
}
