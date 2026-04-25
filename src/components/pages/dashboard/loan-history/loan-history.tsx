"use client";
import {
  DynamicTable,
  TableAction,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";
import { StatCard } from "@/components/pages/dashboard/statsCard";
import { PiggyBank, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getLoanHistory } from "@/lib/api/loan/loanApplication";
import { DashboardSkeleton } from "@/components/shared/skeleton/skeleton-card";
import { useState } from "react";
import { formatDate } from "@/components/utility/functions/data-fn";
import { LaravelPaginationMeta } from "@/components/shared/table/laravel-pagination-type";
import LoanStatusBadge from "@/components/shared/LoanStatus";

interface LoanHistory {
  loanname: string;
}
export default function LoanHistory() {
  const [page, setPage] = useState(1);
  const {
    data: LoanHistory,
    isPending,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["LoanHistory", page],
    queryFn: () => getLoanHistory(page),
  });

  interface LoanHistoryT {
    id: number;
    loan_type: string;
    amount: string;
    amount_paid: number;
    balance: number;
    date_Applied: string;
    date_approved: string;
    purpose: string;
    repayment_period: string;
    status: "disbursed" | "repaid" | "pending";
  }
  const meta: LaravelPaginationMeta | undefined =
    LoanHistory?.pagination.current_page != null
      ? {
          current_page: LoanHistory.pagination.current_page,
          last_page: LoanHistory.pagination.last_page,
          per_page: LoanHistory.pagination.per_page,
          total: LoanHistory.pagination.total,
          from: LoanHistory.pagination.from ?? null,
          to: LoanHistory.pagination.to ?? null,
        }
      : undefined;

  const columns: TableColumn<LoanHistoryT>[] = [
    { label: "ID", key: "id" },
    { label: "Loan Type", key: "loan_type" },
    { label: "Purpose", key: "purpose" },
    {
      label: "Amount",
      key: "amount",
      render(value, row) {
        return (
          "₦ " +
          Number(row.amount).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      },
    },
    {
      label: "Date Applied",
      key: "date_Applied",
      render(value) {
        return formatDate(value, "month-year");
      },
    },
    {
      label: "Date Approved",
      key: "date_approved",
      render(value) {
        return formatDate(value, "month-year");
      },
    },
    { label: "Repayment Period", key: "repayment_period" },
    {
      label: "Amount Paid",
      key: "amount_paid",
      render(value) {
        return (
          "₦ " +
          Number(value).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      },
    },
    {
      label: "Balance",
      key: "balance",
      render(value) {
        return (
          "₦ " +
          Number(value).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      },
    },
    {
      label: "Status",
      key: "status",
      render(value, row) {
        return <LoanStatusBadge status={value} />;
      },
    },
  ];

  return (
    <div>
      {isPending && <DashboardSkeleton />}
      {isSuccess ? (
        LoanHistory && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              <StatCard
                icon={FileText}
                value={LoanHistory.summary.active_loans}
                label="Total Loans Taken"
                iconVariant="blue"
              />
              <StatCard
                icon={PiggyBank}
                //  value={LoanHistory.summary.total_amount_borrowed}
                value={`₦ 
         ${Number(LoanHistory.summary.total_amount_borrowed).toLocaleString(
           "en-NG",
           {
             minimumFractionDigits: 2,
             maximumFractionDigits: 2,
           },
         )}`}
                label="Total Amount Borrowed"
                iconVariant="blue"
              />
              <StatCard
                icon={CheckCircle}
                value={`₦ 
         ${Number(LoanHistory.summary.total_amount_repaid).toLocaleString(
           "en-NG",
           {
             minimumFractionDigits: 2,
             maximumFractionDigits: 2,
           },
         )}`}
                label="Total Amount Repaid"
                iconVariant="green"
              />
              <StatCard
                icon={AlertCircle}
                value={`₦ 
         ${Number(LoanHistory.summary.total_oustanding).toLocaleString(
           "en-NG",
           {
             minimumFractionDigits: 2,
             maximumFractionDigits: 2,
           },
         )}`}
                label="Outstanding Balance"
                iconVariant="yellow"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-end items-center gap-3 flex-wrap">
                <div className="grid  grid-cols-1 gap-3 max-md:w-full">
                  <Button variant="outline">
                    <Link href="/dashboard/loan-History/ongoing-request">
                      Ongoing Pending Loan Requests
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <DynamicTable
              columns={columns}
              data={LoanHistory.data.data}
              pagination={meta ?? undefined}
              onPageChange={(p) => setPage(p)}
              emptyMessage="No loan Records found."
            />
          </div>
        )
      ) : (
        <div>{error?.message ?? "Failed to get Loan History"}</div>
      )}
    </div>
  );
}
