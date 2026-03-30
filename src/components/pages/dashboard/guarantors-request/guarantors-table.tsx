"use client";
import {
  DynamicTable,
  TableAction,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";
import { useRouter } from "next/navigation";

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
      <DynamicTable
        title="Loan Guarantor Request"
        columns={GuarantorRequestColumns}
        actions={GuarantorRequestActions}
        data={guarantorRequests}
        sortable
      />
    </div>
  );
}
