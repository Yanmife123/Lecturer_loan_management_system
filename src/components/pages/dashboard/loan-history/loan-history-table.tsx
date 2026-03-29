"use client";
import {
  DynamicTable,
  TableAction,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface LoanHistory {
  id: number | string;
  sn: number | string;
  type: string;
  amount: string | number;
  dateApplied: string;
  monthly: string;
  outstanding: string;
  status: "Ongoing" | "Rejected" | "Paid";
}

const LoanHistoryColumn: TableColumn<LoanHistory>[] = [
  {
    key: "sn",
    label: "S/N",
    sortable: true,
    width: "80px",
  },
  {
    key: "type",
    label: "Loan Type",
    sortable: true,
  },
  {
    key: "amount",
    label: "Amount (₦)",
    sortable: true,
  },
  {
    key: "dateApplied",
    label: "Date Applied",
    sortable: true,
  },
  {
    key: "monthly",
    label: "Monthly (₦)",
    sortable: true,
  },
  {
    key: "outstanding",
    label: "Outstanding (₦)",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value: string) => {
      const variants: Record<
        string,
        "default" | "secondary" | "outline" | "destructive"
      > = {
        Paid: "default",
        Ongoing: "secondary",
        Rejected: "destructive",
      };
      return <Badge variant={variants[value] || "outline"}>{value}</Badge>;
    },
  },
];

const loanHistoryData: LoanHistory[] = [
  {
    id: 1,
    sn: 1,
    type: "Emergency Loan",
    amount: "₦300,000",
    dateApplied: "Jan 10, 2026",
    monthly: "₦27,500",
    outstanding: "₦275,000",
    status: "Ongoing",
  },
  {
    id: 2,
    sn: 2,
    type: "Normal Loan",
    amount: "₦1,500,000",
    dateApplied: "Mar 5, 2025",
    monthly: "₦43,750",
    outstanding: "₦1,025,000",
    status: "Ongoing",
  },
  {
    id: 3,
    sn: 3,
    type: "Soft Loan",
    amount: "₦100,000",
    dateApplied: "Aug 20, 2024",
    monthly: "₦21,000",
    outstanding: "₦0",
    status: "Paid",
  },
  {
    id: 4,
    sn: 4,
    type: "Enhancement Loan",
    amount: "₦500,000",
    dateApplied: "Feb 10, 2024",
    monthly: "₦0",
    outstanding: "₦0",
    status: "Rejected",
  },
];

const LoanHistoryActions: TableAction<LoanHistory>[] = [
  {
    label: "View",
    icon: <Eye className="w-4 h-4" />,
    variant: "outline",
    onClick: (row) => {
      // setSelectedRow(row);
      console.log("Viewing:", row);
    },
  },
  {
    label: "View",
    icon: <Eye className="w-4 h-4" />,
    variant: "outline",
    onClick: (row) => {
      // setSelectedRow(row);
      console.log("Viewing:", row);
    },
  },
];

export default function LaonHistoryTable() {
  return (
    <div className="font-sans">
      <DynamicTable
        title="Detailed Loan History"
        columns={LoanHistoryColumn}
        data={loanHistoryData}
        actions={LoanHistoryActions}
        emptyMessage="No Loan History "
      />
    </div>
  );
}
