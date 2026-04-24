"use client";
import {
  DynamicTable,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";
import { AllRecordsloan } from "@/lib/api/loan/adminLoans";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { LaravelPaginationMeta } from "@/components/shared/table/laravel-pagination-type";

import LoanRecordsStats from "@/components/pages/admin/dashboard/loans-records/loan-stats";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardSkeleton } from "@/components/shared/skeleton/skeleton-card";
import { formatDate } from "@/components/utility/functions/data-fn";

interface LoanRecord {
  id: string;
  borrower_name: string;
  member_no: string;
  loan_type: string;
  amount: number | string;
  date_approved: string;
  repayment_period: string;
  amount_paid: number | string;
  balance: number | string;
  status: string;
}

export function LoanTable() {
  const [page, setPage] = useState(1);
  const {
    data: Records,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["allLoanActivities", page], // page in key = auto refetch on change
    queryFn: () => AllRecordsloan(page),
    placeholderData: keepPreviousData,
  });

  if (!isLoading) {
    console.log(Records);
  }

  const meta: LaravelPaginationMeta | undefined =
    Records?.pagination.current_page != null
      ? {
          current_page: Records.pagination.current_page,
          last_page: Records.pagination.last_page,
          per_page: Records.pagination.per_page,
          total: Records.pagination.total,
          from: Records.pagination.from ?? null,
          to: Records.pagination.to ?? null,
        }
      : undefined;
  const columns: TableColumn<LoanRecord>[] = [
    { label: "ID", key: "id" },
    { label: "Borrower Name", key: "borrower_name" },
    { label: "Membership No", key: "member_no" },
    { label: "Loan Type", key: "loan_type" },
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
      label: "Date Approved",
      key: "date_approved",
      render(value, row) {
        return formatDate(value, "month-year");
      },
    },
    { label: "Repayment Period", key: "repayment_period" },
    {
      label: "Amount Paid",
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
      label: "Balance",
      key: "balance",
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
    { label: "Status", key: "status" },
  ];

  return (
    <div>
      {isLoading && <DashboardSkeleton />}
      {isSuccess ? (
        Records && (
          <div className="space-y-6">
            <LoanRecordsStats data={Records.summary} />
            <div className="space-y-3">
              <div className="flex justify-end items-center gap-2">
                {/* <Button variant="default" size="sm" asChild>
            <Link
              href="/admin/dashboard/loans-records/requests"
              className="flex items-center gap-2 text-primaryT"
            >
              View All Loan Requests
            </Link>
          </Button> */}
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href="/admin/dashboard/loans-records/all-loan-repayments"
                    className="flex items-center gap-2 text-primaryT"
                  >
                    View All Loan Repayments
                  </Link>
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <DynamicTable
                columns={columns}
                // data={Records.data}
                data={Records.data}
                pagination={meta ?? undefined}
                onPageChange={(p) => setPage(p)}
                emptyMessage="No loan Records found."
              />
            </div>
          </div>
        )
      ) : (
        <div>"Failed to get Loan Records"</div>
      )}
    </div>
  );
}
