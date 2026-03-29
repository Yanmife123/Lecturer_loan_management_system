import LaonHistoryTable from "@/components/pages/dashboard/loan-history/loan-history-table";
import { StatCard } from "@/components/pages/dashboard/statsCard";
import { PiggyBank, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function DashboardLoanHistory() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        <StatCard
          icon={FileText}
          value="4"
          label="Total Loans Taken"
          iconVariant="blue"
        />
        <StatCard
          icon={PiggyBank}
          value="₦2,400,000"
          label="Total Amount Borrowed"
          iconVariant="blue"
        />
        <StatCard
          icon={CheckCircle}
          value="₦685,000"
          label="Total Amount Repaid"
          iconVariant="green"
        />
        <StatCard
          icon={AlertCircle}
          value="₦1,300,000"
          label="Outstanding Balance"
          iconVariant="yellow"
        />
      </div>
      <div>
        <LaonHistoryTable />
      </div>
    </div>
  );
}
