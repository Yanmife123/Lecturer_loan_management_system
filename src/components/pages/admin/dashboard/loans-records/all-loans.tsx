import {
  DynamicTable,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";

interface LoanRecord {
  id: string;
  borrowerName: string;
  staffId: string;
  loanType: string;
  amount: number | string;
  dataApproved: string;
  repayementPeriod: string;
  amountPaid: number | string;
  balance: number | string;
  status: string;
}

const LOAN_RECORDS: LoanRecord[] = [
  {
    id: "1",
    borrowerName: "Dr. Adeyemi Johnson",
    staffId: "RUN/2024/001",
    loanType: "Normal Loan",
    amount: "₦500,000",
    dataApproved: "Jan 15, 2026",
    repayementPeriod: "36 months",
    amountPaid: "₦150,000",
    balance: "₦350,000",
    status: "Ongoing",
  },
  {
    id: "2",
    borrowerName: "Mrs. Grace Okonkwo",
    staffId: "RUN/2023/045",
    loanType: "Emergency Loan",
    amount: "₦300,000",
    dataApproved: "Nov 10, 2025",
    repayementPeriod: "12 months",
    amountPaid: "₦300,000",
    balance: "₦0",
    status: "Fully Paid",
  },
  {
    id: "3",
    borrowerName: "Prof. Samuel Adeleke",
    staffId: "RUN/2022/112",
    loanType: "Soft Loan",
    amount: "₦100,000",
    dataApproved: "Dec 5, 2025",
    repayementPeriod: "5 months",
    amountPaid: "₦84,000",
    balance: "₦16,000",
    status: "Ongoing",
  },
];

export function LoanTable() {
  const columns: TableColumn<LoanRecord>[] = [
    { label: "ID", key: "id" },
    { label: "Borrower Name", key: "borrowerName" },
    { label: "Staff ID", key: "staffId" },
    { label: "Loan Type", key: "loanType" },
    { label: "Amount", key: "amount" },
    { label: "Date Approved", key: "dataApproved" },
    { label: "Repayment Period", key: "repayementPeriod" },
    { label: "Amount Paid", key: "amountPaid" },
    { label: "Balance", key: "balance" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="overflow-x-auto">
      <DynamicTable columns={columns} data={LOAN_RECORDS} />
    </div>
  );
}
