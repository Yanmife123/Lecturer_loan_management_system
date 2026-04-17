import { StatCard } from "@/components/pages/dashboard/statsCard";
import { TrendingUp, Users, Wallet } from "lucide-react";

export default function LoanRecordsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Replace with actual data */}
      <StatCard label="Total Loans" value="$500,000" icon={TrendingUp} />
      <StatCard label="Active Loans" value="300" icon={Users} />
      <StatCard label="Loan Growth" value="+10%" icon={TrendingUp} />
      <StatCard label="Average Loan Amount" value="$1,500" icon={Wallet} />
    </div>
  );
}
