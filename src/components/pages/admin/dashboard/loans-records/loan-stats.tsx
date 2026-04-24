import { StatCard } from "@/components/pages/dashboard/statsCard";
import { TrendingUp, Users, Wallet } from "lucide-react";

// types/loan.ts

export interface LoanStatistics {
  /** The cumulative sum of all loans ever taken by the user */
  total_loans: string;

  /** The count of loans currently in the 'disbursed' or 'active' state */
  active_loans: string;

  /** The mathematical mean of all loan applications */
  average_loan: string;
}

export default function LoanRecordsStats({ data }: { data: LoanStatistics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Replace with actual data */}
      <StatCard
        label="Total Loans"
        value={data.total_loans}
        icon={TrendingUp}
      />
      <StatCard label="Active Loans" value={data.active_loans} icon={Users} />
      <StatCard label="Loan Growth" value="+10%" icon={TrendingUp} />
      <StatCard
        label="Average Loan Amount"
        value={data.average_loan}
        icon={Wallet}
      />
    </div>
  );
}
