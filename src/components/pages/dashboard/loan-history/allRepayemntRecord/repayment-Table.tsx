"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  DynamicTable,
  TableAction,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";
import { AllRepaymentRecordMe } from "@/lib/api/loan/repayments";
import { useState } from "react";
import { LaravelPaginationMeta } from "@/components/shared/table/laravel-pagination-type";
import { DashboardSkeleton } from "@/components/shared/skeleton/skeleton-card";
import { RepaymentResponse } from "@/lib/type/admin/dashboard/repaymentrecords/repayemnt-records";
import { formatDate } from "@/components/utility/functions/data-fn";

export function UserRepayemntTable() {
  const [page, setPage] = useState(1);
  const {
    data: records,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["LoanRepaymentRecordUser", page],
    queryFn: () => AllRepaymentRecordMe(page),
    placeholderData: keepPreviousData,
  });
  const meta: LaravelPaginationMeta | undefined =
    records?.data.current_page != null
      ? {
          current_page: records.data.current_page,
          last_page: records.data.last_page,
          per_page: records.data.per_page,
          total: records.data.total,
          from: records.data.from ?? null,
          to: records.data.to ?? null,
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
    <div>
      {" "}
      {isLoading && <DashboardSkeleton />}
      {isSuccess ? (
        records && (
          <div className="font-sans">
            <DynamicTable
              columns={columns}
              data={records.data.data}
              pagination={meta ?? undefined}
              onPageChange={(p) => setPage(p)}
              emptyMessage="No Repayemt Record found."
              loading={isLoading}
            />
          </div>
        )
      ) : (
        <div>{error?.message}</div>
      )}{" "}
    </div>
  );
}
