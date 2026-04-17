"use client";
import {
  DynamicTable,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";
import { StatCard } from "../../dashboard/statsCard";
import { Clock, Text, TrendingUp, Users, Wallet } from "lucide-react";

interface loanRequesType {
  id: number | string;
  name: string;
  staffId: string;
  loanType: string;
  date: string;
  amount: string | number;
  status: string;
}
const loanRequests: loanRequesType[] = [
  {
    id: 1,
    name: "Dr. Adeyemi Johnson",
    staffId: "RUN/2024/001",
    loanType: "Normal Loan",
    amount: "₦500,000",
    date: "Apr 6, 2026",
    status: "Pending",
  },
  {
    id: 2,
    name: "Mrs. Grace Okonkwo",
    staffId: "RUN/2023/045",
    loanType: "Emergency Loan",
    amount: "₦300,000",
    date: "Apr 5, 2026",
    status: "Under Review",
  },
  {
    id: 3,
    name: "Prof. Samuel Adeleke",
    staffId: "RUN/2022/112",
    loanType: "Enhancement Loan",
    amount: "₦1,000,000",
    date: "Apr 4, 2026",
    status: "Pending",
  },
  {
    id: 4,
    name: "Mr. David Okoro",
    staffId: "RUN/2024/089",
    loanType: "Soft Loan",
    amount: "₦100,000",
    date: "Apr 3, 2026",
    status: "Approved",
  },
];
export function DashboardOverview() {
  const columns: TableColumn<loanRequesType>[] = [
    // { label: "ID", key: "id" },
    { label: "Applicant Name", key: "name" },
    { label: "Staff ID", key: "staffId" },
    { label: "Loan Type", key: "loanType" },
    { label: "Date", key: "date" },
    { label: "Amount", key: "amount" },
    { label: "Status", key: "status" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Total Members"
          value="1,234"
          icon={Users}
          iconVariant="blue"
        />
        <StatCard
          label="Active Saving"
          value="₦45.2M"
          icon={Wallet}
          iconVariant="green"
        />
        <StatCard
          label="Active Loans"
          value="89"
          icon={Text}
          iconVariant="yellow"
        />
        <StatCard
          label="Pending Requests"
          value="23"
          icon={TrendingUp}
          iconVariant="purple"
        />
        <StatCard
          label="Approved This Month"
          value="45"
          icon={Clock}
          iconVariant="orange"
        />
        <StatCard
          label="Total Disbursement"
          value="₦45.2M"
          icon={Wallet}
          iconVariant="blue"
        />
      </div>
      <DynamicTable
        title="Recent Loan Requests"
        columns={columns}
        data={loanRequests}
      />
    </div>
  );
}
