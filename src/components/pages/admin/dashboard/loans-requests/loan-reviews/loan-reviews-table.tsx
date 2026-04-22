"use client";
import {
  DynamicTable,
  TableColumn,
  TableAction,
} from "@/components/shared/table/dyanmic-table";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { AllRequest, AllReviews } from "@/lib/api/loan/adminLoans";
import { TableSkeleton } from "@/components/shared/skeleton/skeleton-table";
import { useState } from "react";
import { LaravelPaginationMeta } from "@/components/shared/table/laravel-pagination-type";

import { LoanApplication } from "@/lib/type/admin/dashboard/loan-requests/pendingRequest";
import { formatDate } from "@/components/utility/functions/data-fn";
import { useRouter } from "next/navigation";
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

export function LoanReviewsTable() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const {
    data: Request,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["LoanRequestsPending", page], // page in key = auto refetch on change
    queryFn: () => AllReviews(page),
    placeholderData: keepPreviousData,
  });

  const columns: TableColumn<LoanApplication>[] = [
    {
      key: "user",
      label: "Name",
      id: "fullname",
      render(value, row) {
        return `${row.user.prefix} ${row.user.surname} ${row.user.other_names}`;
      },
    },
    {
      key: "user",
      label: "Membership ID",
      id: "membershipID",
      render(value, row) {
        return row.user.membership_detail?.membership_no;
      },
    },
    // { key: "user", label: "Faculty", id:"faculty" render(value, row) {
    //   return row.user.m
    // }, },
    {
      key: "loan_type",
      label: "Loan Type",
      id: "LoanName",
      render(value, row) {
        return row.loan_type.name;
      },
    },
    {
      key: "created_at",
      label: "Date",
      render(value, row) {
        return formatDate(value, "full");
      },
    },
    {
      key: "amount",
      label: "Amount",
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
      key: "guarantor_approval",
      label: "Guarantor Status",
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
      label: "Loan Status",
      render(value, row) {
        return <LoanStatusBadge status={row.status} />;
      },
    },
  ];
  const Actions: TableAction<LoanApplication>[] = [
    {
      label: "View Details",
      onClick: (row) => {
        // Handle approve action
        router.push(`/admin/dashboard/loans-requests/reviews/${row.id}`);
      },
    },
  ];
  const meta: LaravelPaginationMeta | undefined =
    Request?.data.current_page != null
      ? {
          current_page: Request.data.current_page,
          last_page: Request.data.last_page,
          per_page: Request.data.per_page,
          total: Request.data.total,
          from: Request.data.from ?? null,
          to: Request.data.to ?? null,
        }
      : undefined;

  return (
    <div>
      {isLoading && <TableSkeleton />}
      {isSuccess ? (
        Request && (
          <div>
            <DynamicTable
              columns={columns}
              data={Request.data.data}
              sortable
              actions={Actions}
              loading={isLoading}
              pagination={meta ?? undefined}
              onPageChange={(p) => setPage(p)}
              emptyMessage="No loan requests found."
            />
          </div>
        )
      ) : (
        <div>{error?.message}</div>
      )}
    </div>
  );
}
