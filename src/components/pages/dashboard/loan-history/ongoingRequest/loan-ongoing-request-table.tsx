"use client";
import {
  DynamicTable,
  TableAction,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getallMyLoan } from "@/lib/api/loan/loanApplication";
import { LaravelPaginationMeta } from "@/components/shared/table/laravel-pagination-type";
import { useState } from "react";
import { TableSkeleton } from "@/components/shared/skeleton/skeleton-table";
import { LoanApplication } from "@/lib/type/loanapplicaton/loan-hostory";
import { formatDate } from "@/components/utility/functions/data-fn";
import LoanStatusBadge from "@/components/shared/LoanStatus";

const getStatusDetails = (status: number | boolean | null | undefined) => {
  // Check for Accepted (1 or true)
  if (status === 1 || status === true) {
    return {
      label: "Accepted",
      classes: "bg-green-100 text-green-700 border-green-200",
    };
  }

  // Check for Declined (0 or false)
  // We use !== null because 0 is falsy, but so is null. We want to distinguish them.
  if (status === 0 || status === false) {
    return {
      label: "Declined",
      classes: "bg-red-100 text-red-700 border-red-200",
    };
  }

  // Fallback for null or undefined
  return {
    label: "Pending",
    classes: "bg-amber-100 text-amber-700 border-amber-200",
  };
};

const LoanHistoryColumn: TableColumn<LoanApplication>[] = [
  {
    key: "loan_type",
    label: "Loan Type",
    id: "Loan_name",
    sortable: true,
    render(value, row) {
      return row.loan_type.name;
    },
  },
  {
    key: "amount",
    label: "Amount (₦)",
    sortable: true,
  },
  {
    key: "created_at",
    label: "Date Applied",
    sortable: true,
    render(value, row) {
      return formatDate(row.created_at, "full");
    },
  },
  {
    key: "duration_month",
    label: "Monthly Duration",
    sortable: true,
    render(value, row) {
      return `${row.duration_month} months`;
    },
  },
  {
    key: "guarantor_approval",
    label: "Guarantor Approval Status",
    sortable: true,
    render(value, row) {
      const statusDetails = getStatusDetails(row.guarantor_approval);
      return (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusDetails.classes}`}
        >
          {statusDetails.label}
        </span>
      );
    },
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value: string) => {
      return <LoanStatusBadge status={value} />;
    },
  },
];

const LoanHistoryActions: TableAction<LoanApplication>[] = [
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

export default function LoanOngoingRequestTable() {
  const [page, setPage] = useState(1);
  const {
    data: LoansHistory,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["LoanRequest", page], // page in key = auto refetch on change
    queryFn: () => getallMyLoan(page),
    placeholderData: keepPreviousData,
  });
  const meta: LaravelPaginationMeta | undefined =
    LoansHistory?.data.current_page != null
      ? {
          current_page: LoansHistory.data.current_page,
          last_page: LoansHistory.data.last_page,
          per_page: LoansHistory.data.per_page,
          total: LoansHistory.data.total,
          from: LoansHistory.data.from ?? null,
          to: LoansHistory.data.to ?? null,
        }
      : undefined;

  return (
    <div className="font-sans">
      {isLoading && <TableSkeleton />}
      {isSuccess ? (
        LoansHistory && (
          <div>
            <DynamicTable
              title="Detailed Loan History"
              columns={LoanHistoryColumn}
              data={LoansHistory.data.data}
              actions={LoanHistoryActions}
              loading={isLoading}
              pagination={meta ?? undefined}
              onPageChange={(p) => setPage(p)}
              emptyMessage="No Ongoing Request Loan"
            />
          </div>
        )
      ) : (
        <div>{error?.message} </div>
      )}
    </div>
  );
}
