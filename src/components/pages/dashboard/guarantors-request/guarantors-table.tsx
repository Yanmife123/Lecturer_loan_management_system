"use client";
import {
  DynamicTable,
  TableAction,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";
import { useRouter } from "next/navigation";
import { allGuarantorRequest } from "@/lib/api/loan/gaurantor";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/shared/skeleton/skeleton-table";
import { useState } from "react";
import { LaravelPaginationMeta } from "@/components/shared/table/laravel-pagination-type";
import { LoanApplicationResponse } from "@/lib/type/loanapplicaton";

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

const GuarantorRequestColumns: TableColumn<LoanApplicationResponse>[] = [
  {
    key: "user",
    label: "Full Name",
    id: "Surname",
    render(value, row) {
      return `${row.user.prefix} ${row.user.surname} ${row.user.other_names}`;
    },
  },
  { key: "amount", label: "Amount", sortable: true },
  {
    key: "loan_type",
    label: "Loan Type",
    id: "loan_name",
    sortable: true,
    render(value, row) {
      return `${row.loan_type.name}`;
    },
  },
  {
    key: "duration_month",
    label: "Loan Period",
    sortable: true,
    render(value, row) {
      return `${row.duration_month} months`;
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
    key: "loan_type",
    label: "Interest",
    id: "interest",
    sortable: true,
    render(value, row) {
      return (
        parseInt(row.loan_type.interest_rate) +
        "%" +
        " " +
        row.loan_type.interest_type
      );
    },
  },
];

export default function GuarantorsRequestsTable() {
  const [page, setPage] = useState(1);
  const {
    data: Request,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["GuarantorRequest", page], // page in key = auto refetch on change
    queryFn: () => allGuarantorRequest(page),
    placeholderData: keepPreviousData,
  });

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

  const Router = useRouter();
  const GuarantorRequestActions: TableAction<LoanApplicationResponse>[] = [
    {
      label: "View Details",
      onClick: (row) => {
        // Handle view details action
        Router.push(`/dashboard/guarantors-requests/${row.id}`);
      },
    },
  ];
  return (
    <div>
      {isLoading && <TableSkeleton />}
      {isSuccess ? (
        Request && (
          <div>
            <DynamicTable
              title="Loan Guarantor Request"
              columns={GuarantorRequestColumns}
              actions={GuarantorRequestActions}
              data={Request.data.data}
              pagination={meta ?? undefined}
              onPageChange={(p) => setPage(p)}
              sortable
            />
          </div>
        )
      ) : (
        <div>{error?.message}</div>
      )}
    </div>
  );
}
