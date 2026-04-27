"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { AllRepaymentRecord } from "@/lib/api/loan/repayments";
import { LaravelPaginationMeta } from "@/components/shared/table/laravel-pagination-type";
import {
  DynamicTable,
  TableAction,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";
import { useState } from "react";
import { DashboardSkeleton } from "@/components/shared/skeleton/skeleton-card";
import { RepaymentResponse } from "@/lib/type/admin/dashboard/repaymentrecords/repayemnt-records";
import { formatDate } from "@/components/utility/functions/data-fn";
import { StatCard } from "@/components/pages/dashboard/statsCard";
import { TrendingUp, Users, Wallet, FileText, Wallet2 } from "lucide-react";

export function LoanRepaymentTable() {
  const [page, setPage] = useState(1);
  const {
    data: records,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["LoanRepaymentRecord", page],
    queryFn: () => AllRepaymentRecord(page),
    placeholderData: keepPreviousData,
  });

  const meta: LaravelPaginationMeta | undefined =
    records?.data.records.current_page != null
      ? {
          current_page: records.data.records.current_page,
          last_page: records.data.records.last_page,
          per_page: records.data.records.per_page,
          total: records.data.records.total,
          from: records.data.records.from ?? null,
          to: records.data.records.to ?? null,
        }
      : undefined;

  const columns: TableColumn<RepaymentResponse>[] = [
    {
      label: "Installment no",
      key: "repayment_schedule",
      id: "repayment_no",
      render(value, row) {
        return row.repayment_schedule.installment_no;
      },
    },
    {
      label: "Member Name",
      key: "loan_application",
      id: "full_name",
      render(value, row) {
        return `${row.loan_application.user.prefix} ${row.loan_application.user.surname} ${row.loan_application.user.other_names}`;
      },
    },
    {
      label: "Loan Type",
      key: "loan_application",
      id: "loan_name",
      render(value, row) {
        return row.loan_application.loan_type.name;
      },
    },
    {
      label: "Amount paid",
      key: "amount_paid",
      render(value, row) {
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
      label: "Payment Method",
      key: "payment_method",
    },
    {
      label: "Payment date",
      key: "payment_date",
      render(value, row) {
        return formatDate(value, "full");
      },
    },
  ];
  return (
    <div className="space-y-6">
      {isLoading && <DashboardSkeleton />}
      {isSuccess ? (
        records && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Total Month Repayment amount"
                value={
                  "₦ " +
                  Number(
                    records.data.stats.this_month_collected,
                  ).toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }
                icon={Wallet}
              />
              <StatCard
                label="Total Records"
                value={records.data.stats.total_records}
                icon={FileText}
              />
              <StatCard
                label="Total Collected"
                value={
                  "₦ " +
                  Number(
                    records.data.stats.this_month_collected,
                  ).toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }
                icon={Wallet2}
              />
              <StatCard
                label="Overdue Schedules"
                value={records.data.stats.overdue_schedules}
                icon={FileText}
              />
            </div>
            <DynamicTable
              columns={columns}
              data={records.data.records.data}
              pagination={meta ?? undefined}
              onPageChange={(p) => setPage(p)}
              emptyMessage="No Repayemt Record found."
              loading={isLoading}
            />
          </div>
        )
      ) : (
        <div>{error?.message}</div>
      )}
    </div>
  );
}
