"use client";
import {
  DynamicTable,
  TableColumn,
  TableAction,
} from "@/components/shared/table/dyanmic-table";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/pages/dashboard/statsCard";
import { PiggyBank, Calendar, TrendingUp } from "lucide-react";
import { LaravelPaginationMeta } from "@/components/shared/table/laravel-pagination-type";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { MySaving } from "@/lib/api/savings/created_saving_records";
import { useState } from "react";
import { DashboardSkeleton } from "@/components/shared/skeleton/skeleton-card";
import { formatDate } from "@/components/utility/functions/data-fn";

export default function SavingTable() {
  const [page, setPage] = useState(1);
  interface SavingsRecord {
    id: number;
    amount: string; // String to preserve decimal precision ("100000.00")
    balance_before: string; // "2000000.00"
    balance_after: string; // "2100000.00"
    month: number; // 4
    year: number; // 2025
    payment_method: string; // "salary_deduction"
    user_id: number; // 7
    recorder_by_id: number; // 1
    created_at: string; // "2026-04-25T21:58:33.000000Z"
    updated_at: string; // "2026-04-25T21:58:33.000000Z"
  }
  const savingsColumns: TableColumn<SavingsRecord>[] = [
    {
      key: "month",
      label: "Month",
      render(value, row) {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return `${months[value - 1]}`;
      },
      sortable: true,
    },
    {
      key: "year",
      label: "Year",
      sortable: true,
    },
    {
      key: "amount",
      label: "Amount Saved (₦)",
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-green-600 dark:text-green-400">
          {"₦ " +
            Number(value).toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
        </span>
      ),
    },
    {
      key: "balance_after",
      label: "Cumulative Total (₦)",
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          {"₦ " +
            Number(value).toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
        </span>
      ),
    },
    {
      label: "Payment Method",
      key: "payment_method",
    },
    {
      label: "Date Recorded",
      key: "created_at",
      render(value, row) {
        return formatDate(value, "full");
      },
    },
  ];

  const {
    data: Saving,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["LoanRequestsReviewsExcutives", page], // page in key = auto refetch on change
    queryFn: () => MySaving(page),
    placeholderData: keepPreviousData,
  });

  const meta: LaravelPaginationMeta | undefined =
    Saving?.data.records.current_page != null
      ? {
          current_page: Saving.data.records.current_page,
          last_page: Saving.data.records.last_page,
          per_page: Saving.data.records.per_page,
          total: Saving.data.records.total,
          from: Saving.data.records.from ?? null,
          to: Saving.data.records.to ?? null,
        }
      : undefined;

  return (
    <>
      {isLoading && <DashboardSkeleton />}
      {isSuccess ? (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
            <StatCard
              icon={PiggyBank}
              value={
                "₦ " +
                Number(Saving.data.stats.total_savings).toLocaleString(
                  "en-NG",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  },
                )
              }
              label="Total Savings to Date"
            />
            <StatCard
              icon={TrendingUp}
              value={
                "₦ " +
                Number(Saving.data.stats.monthly_saving_amount).toLocaleString(
                  "en-NG",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  },
                )
              }
              label="Monthly Savings Amount"
              iconVariant="yellow"
            />
            <StatCard
              icon={Calendar}
              value={Saving.data.stats.years_as_member}
              label="Years as Member"
              iconVariant="blue"
            />
          </div>
          <div className="font-sans">
            <DynamicTable
              title="Savings History"
              data={Saving.data.records.data}
              columns={savingsColumns}
              sortable
              // actions={savingsActions}
              emptyMessage="No savings records found"
            />
          </div>
        </div>
      ) : (
        <div>{error?.message}</div>
      )}
    </>
  );
}
