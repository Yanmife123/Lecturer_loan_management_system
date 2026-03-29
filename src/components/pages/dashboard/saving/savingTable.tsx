"use client";
import {
  DynamicTable,
  TableColumn,
  TableAction,
} from "@/components/shared/table/dyanmic-table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit2, Eye, Grid3x3, List } from "lucide-react";

export default function SavingTable() {
  interface SavingRecord {
    id: number;
    sn: number;
    month: string;
    year: number;
    amountSaved: string;
    cumulativeTotal: string;
    status: "Confirmed" | "Pending" | "Failed";
  }
  const savingsData: SavingRecord[] = [
    {
      id: 1,
      sn: 1,
      month: "February",
      year: 2026,
      amountSaved: "₦50,000",
      cumulativeTotal: "₦850,000",
      status: "Confirmed",
    },
    {
      id: 2,
      sn: 2,
      month: "January",
      year: 2026,
      amountSaved: "₦50,000",
      cumulativeTotal: "₦800,000",
      status: "Confirmed",
    },
    {
      id: 3,
      sn: 3,
      month: "December",
      year: 2025,
      amountSaved: "₦50,000",
      cumulativeTotal: "₦750,000",
      status: "Confirmed",
    },
    {
      id: 4,
      sn: 4,
      month: "November",
      year: 2025,
      amountSaved: "₦50,000",
      cumulativeTotal: "₦700,000",
      status: "Confirmed",
    },
    {
      id: 5,
      sn: 5,
      month: "October",
      year: 2025,
      amountSaved: "₦50,000",
      cumulativeTotal: "₦650,000",
      status: "Confirmed",
    },
    {
      id: 6,
      sn: 6,
      month: "September",
      year: 2025,
      amountSaved: "₦50,000",
      cumulativeTotal: "₦600,000",
      status: "Confirmed",
    },
    {
      id: 7,
      sn: 7,
      month: "August",
      year: 2025,
      amountSaved: "₦50,000",
      cumulativeTotal: "₦550,000",
      status: "Confirmed",
    },
    {
      id: 8,
      sn: 8,
      month: "July",
      year: 2025,
      amountSaved: "₦50,000",
      cumulativeTotal: "₦500,000",
      status: "Pending",
    },
  ];
  const savingsColumns: TableColumn<SavingRecord>[] = [
    {
      key: "sn",
      label: "S/N",
      sortable: true,
      width: "80px",
      //   render: (value) => (
      //     <span className="font-medium text-gray-900 dark:text-gray-50">
      //       {value}
      //     </span>
      //   ),
    },
    {
      key: "month",
      label: "Month",
      sortable: true,
    },
    {
      key: "year",
      label: "Year",
      sortable: true,
    },
    {
      key: "amountSaved",
      label: "Amount Saved (₦)",
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-green-600 dark:text-green-400">
          {value}
        </span>
      ),
    },
    {
      key: "cumulativeTotal",
      label: "Cumulative Total (₦)",
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: false,
      render: (value: string) => {
        const variants: Record<
          string,
          "default" | "secondary" | "outline" | "destructive"
        > = {
          Confirmed: "default",
          Pending: "secondary",
          Failed: "destructive",
        };
        return <Badge variant={variants[value] || "outline"}>{value}</Badge>;
      },
    },
  ];
  const savingsActions: TableAction<SavingRecord>[] = [
    {
      label: "View",
      icon: <Eye className="w-4 h-4" />,
      variant: "outline",
      onClick: (row) => {
        // setSelectedRow(row);
        console.log("Viewing:", row);
        alert(
          `Viewing record: ${row.month} ${row.year}\nAmount: ${row.amountSaved}`,
        );
      },
    },
    {
      label: "Edit",
      icon: <Edit2 className="w-4 h-4" />,
      variant: "outline",
      onClick: (row) => {
        console.log("Editing:", row);
        alert(`Editing record: ${row.month} ${row.year}`);
      },
      show: (row) => row.status === "Confirmed",
    },
    {
      label: "Delete",
      icon: <Trash2 className="w-4 h-4" />,
      variant: "destructive",
      onClick: (row) => {
        // setTableData((prev) => prev.filter((r) => r.id !== row.id));
        console.log("Deleted:", row);
      },
    },
  ];
  return (
    <div className="font-sans">
      <DynamicTable
        title="Savings History"
        data={savingsData}
        columns={savingsColumns}
        sortable
        actions={savingsActions}
        emptyMessage="No savings records found"
      />
    </div>
  );
}
