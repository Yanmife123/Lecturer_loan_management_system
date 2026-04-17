import {
  DynamicTable,
  TableColumn,
  TableAction,
} from "@/components/shared/table/dyanmic-table";

interface LoanRequest {
  id: string;
  borrowerName: string;
  loanType: string;
  guarantorName: string;
  amount: number;
  repaymentPeriod: string;
  status: string;
}

const LOAN_DATA: LoanRequest[] = [
  {
    id: "LR-001",
    borrowerName: "Dr. Adeyemi Johnson",
    loanType: "Personal Loan",
    guarantorName: "Prof. Samuel Adeleke",
    amount: 500000,
    repaymentPeriod: "12 Months",
    status: "Pending",
  },
  {
    id: "LR-002",
    borrowerName: "Mrs. Grace Okonkwo",
    loanType: "Emergency Loan",
    guarantorName: "Mr. David Okoro",
    amount: 150000,
    repaymentPeriod: "3 Months",
    status: "Approved",
  },
  {
    id: "LR-003",
    borrowerName: "Mr. David Okoro",
    loanType: "Asset Financing",
    guarantorName: "Mrs. Grace Okonkwo",
    amount: 1200000,
    repaymentPeriod: "24 Months",
    status: "Approved",
  },
  {
    id: "LR-004",
    borrowerName: "Prof. Samuel Adeleke",
    loanType: "Education Loan",
    guarantorName: "Dr. Adeyemi Johnson",
    amount: 300000,
    repaymentPeriod: "6 Months",
    status: "Rejected",
  },
  {
    id: "LR-005",
    borrowerName: "Chioma Azikiwe",
    loanType: "Business Startup",
    guarantorName: "Samuel Adeleke",
    amount: 2500000,
    repaymentPeriod: "36 Months",
    status: "Pending",
  },
];

export function LoanRequestsTable() {
  const columns: TableColumn<LoanRequest>[] = [
    { key: "borrowerName", label: "Borrower Name" },
    { key: "loanType", label: "Loan Type" },
    { key: "guarantorName", label: "Guarantor Name" },
    {
      key: "amount",
      label: "Amount",
      // Optional: If your DynamicTable supports render functions, you could format this:
      // render: (value) => `₦${value.toLocaleString()}`
    },
    { key: "repaymentPeriod", label: "Repayment Period" },
    { key: "status", label: "Status" },
  ];

  return <DynamicTable columns={columns} data={LOAN_DATA} />;
}
