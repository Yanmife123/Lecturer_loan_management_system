"use client";
import { LaravelPaginationMeta } from "@/components/shared/table/laravel-pagination-type";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { allSaving } from "@/lib/api/savings/created_saving_records";
import { useState } from "react";
import {
  DynamicTable,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";

import { SavingStats } from "@/components/pages/admin/dashboard/saving/saving-stats";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardSkeleton } from "@/components/shared/skeleton/skeleton-card";
import { TableSkeleton } from "@/components/shared/skeleton/skeleton-table";
export interface UserBrief {
  id: number;
  surname: string;
  other_names: string;
  prefix: string;
  membership_detail: Membe;
  email: string;

  // Included because of the "..." in your snippet
}

export interface Membe {
  membership_no: string;
}

export interface SavingRecordResponse {
  id: number;
  amount: string; // Keep as string if API sends with decimals
  balance_before: string;
  balance_after: string;
  month: number;
  year: number;
  payment_method: "salary_deduction" | "bank_transfer" | "cash";
  user_id: number;
  recorder_by_id: number;
  created_at: string; // ISO format
  updated_at: string;

  // Nested Objects
  recorder: UserBrief;
  user: UserBrief;
}

export function SavingTable({ showStats }: { showStats: boolean }) {
  const [page, setPage] = useState(1);
  const columns: TableColumn<SavingRecordResponse>[] = [
    {
      label: "Name",
      key: "user",
      id: "fullname",
      render(value, row) {
        return `${row.user.prefix} ${row.user.surname} ${row.user.other_names}`;
      },
    },
    {
      label: "Membership No",
      key: "user",
      id: "Membership_no",
      render(value, row) {
        return row.user.membership_detail.membership_no;
      },
    },
    {
      label: "Email",
      key: "user",
      id: "email",
      render(value, row) {
        return row.user.email;
      },
    },
    { label: "Monthly Saving", key: "amount" },
    { label: "Savings After Record", key: "balance_after" },
    {
      label: "Month/Year",
      key: "month",
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
        return `${months[value - 1]} ${row.year}`;
      },
    },

    // { label: "Last Contribution Date", key:  },
    // { label: "Status", key: "status" },
  ];

  const {
    data: Saving,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["LoanRequestsReviewsExcutives", page], // page in key = auto refetch on change
    queryFn: () => allSaving(page),
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
    <div>
      {showStats && isLoading && <DashboardSkeleton />}
      {!showStats && isLoading && <TableSkeleton />}
      {isSuccess ? (
        Saving && (
          <div className="space-y-6">
            {showStats && (
              <div className="space-y-6">
                <SavingStats data={Saving.data.stats} />
                <div className="flex justify-end items-center">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href="/admin/dashboard/savings/allsaving"
                        className="text-primaryT"
                      >
                        View All Savings
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href="/admin/dashboard/savings/add_saving_record"
                        className="text-primaryT"
                      >
                        Add Savings Record
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <DynamicTable
              data={Saving.data.records.data}
              columns={columns}
              pagination={meta ?? undefined}
              onPageChange={(p) => setPage(p)}
              emptyMessage="No Saving Record found."
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
