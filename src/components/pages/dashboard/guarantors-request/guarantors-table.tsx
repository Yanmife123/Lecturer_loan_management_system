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
interface GuarantorRequest {
  id: number | string;
  fullname: string;
  amount: string | number;
  type: string;
  period: string;
  interest: string;
}

const GuarantorRequestColumns: TableColumn<GuarantorRequest>[] = [
  { key: "fullname", label: "Full Name", sortable: true },
  { key: "amount", label: "Amount", sortable: true },
  { key: "type", label: "Loan Type", sortable: true },
  { key: "period", label: "Loan Period", sortable: true },
  { key: "interest", label: "Interest", sortable: true },
];

const guarantorRequests: GuarantorRequest[] = [
  {
    id: "REQ-001",
    fullname: "Dr. Adeyemi Johnson Oluwaseun",
    amount: 500000,
    type: "Normal Loan",
    period: "24 months",
    interest: "1% reducing balance",
  },
  {
    id: "REQ-002",
    fullname: "Prof. Sarah Chinedu",
    amount: 250000,
    type: "Emergency Loan",
    period: "12 months",
    interest: "10% flat",
  },
  {
    id: "REQ-003",
    fullname: "Mr. Babatunde Raji",
    amount: 150000,
    type: "Commodity Loan",
    period: "12 months",
    interest: "10% flat",
  },
  {
    id: "REQ-004",
    fullname: "Dr. Elizabeth Amadi",
    amount: 850000,
    type: "Enhancement Loan",
    period: "10 months",
    interest: "10% flat",
  },
  {
    id: "REQ-005",
    fullname: "Engr. Victor Okafor",
    amount: 80000,
    type: "Soft Loan",
    period: "5 months",
    interest: "5% flat",
  },
  {
    id: "REQ-006",
    fullname: "Dr. Funmilayo Bello",
    amount: 1200000,
    type: "Normal Loan",
    period: "36 months",
    interest: "1% reducing balance",
  },
  {
    id: "REQ-007",
    fullname: "Mrs. Grace Temitope",
    amount: 300000,
    type: "Emergency Loan",
    period: "12 months",
    interest: "10% flat",
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
  const GuarantorRequestActions: TableAction<GuarantorRequest>[] = [
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
              data={guarantorRequests}
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
