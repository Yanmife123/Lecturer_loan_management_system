import { StatCard } from "@/components/pages/dashboard/statsCard";
import { TrendingUp, Users, Wallet } from "lucide-react";

interface summary {
  total_savings: string;
  average_saving: string;
  total_records: string;
  this_month_savings: string;
}

export function SavingStats({ data }: { data: summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total Savings"
        value={
          "₦ " +
          Number(data.total_savings).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        }
        icon={Wallet}
      />
      <StatCard label="Total Records" value={data.total_records} icon={Users} />
      <StatCard
        label="This Months Saving"
        value={
          "₦ " +
          Number(data.this_month_savings).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        }
        icon={TrendingUp}
      />
      <StatCard
        label="Average Saving"
        value={
          "₦ " +
          Number(data.average_saving).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        }
        icon={Wallet}
      />
    </div>
  );
}
