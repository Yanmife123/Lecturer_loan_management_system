"use client";
import {
  DynamicTable,
  TableColumn,
  TableAction,
} from "@/components/shared/table/dyanmic-table";

interface LoansRequestsProps {
  id: string;
  name: string;
  staffId: string;
  faculty: string;
  loanType: string;
  date: string;
  amount: string | number;
  guarantorStatus: string;
}
const loanRequests: LoansRequestsProps[] = [
  {
    id: "1",
    name: "Dr. Adeyemi Johnson Oluwaseun",
    staffId: "RUN/2024/001",
    faculty: "Natural Sciences",
    loanType: "Normal Loan",
    amount: "₦500,000",
    date: "",
    guarantorStatus: "Both Accepted",
  },
  {
    id: "2",
    name: "Mrs. Grace Okonkwo",
    staffId: "RUN/2023/045",
    faculty: "Management Sciences",
    loanType: "Emergency Loan",
    amount: "₦300,000",
    date: "",
    guarantorStatus: "One Pending",
  },
  {
    id: "3",
    name: "Prof. Samuel Adeleke",
    staffId: "RUN/2022/112",
    faculty: "Engineering",
    loanType: "Enhancement Loan",
    amount: "₦1,000,000",
    date: "",
    guarantorStatus: "Both Accepted",
  },
];
export function LoanRequestsTable() {
  const columns: TableColumn<LoansRequestsProps>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "staffId", label: "Staff ID" },
    { key: "faculty", label: "Faculty" },
    { key: "loanType", label: "Loan Type" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
    { key: "guarantorStatus", label: "Guarantor Status" },
  ];
  const Actions: TableAction<LoansRequestsProps>[] = [
    {
      label: "Approve",
      onClick: () => {
        // Handle approve action
      },
    },
    {
      label: "Reject",
      variant: "destructive",
      onClick: () => {
        // Handle reject action
      },
    },
  ];

  return (
    <DynamicTable columns={columns} data={loanRequests} actions={Actions} />
  );
}
