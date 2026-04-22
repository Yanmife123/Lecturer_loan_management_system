import React from "react";
import { Badge } from "@/components/ui/badge"; // Adjust path to your UI folder
import { LoanStatus } from "@/lib/type/loanapplicaton/loan-status"; // Adjust path to your types

interface LoanStatusBadgeProps {
  status: string | LoanStatus;
}

const LoanStatusBadge = ({ status }: LoanStatusBadgeProps) => {
  // Mapping statuses to Shadcn Badge variants or custom styles
  const config: Record<
    string,
    {
      variant: "outline" | "default" | "secondary" | "destructive";
      className: string;
    }
  > = {
    [LoanStatus.Pending]: {
      variant: "outline",
      className: "border-yellow-500 text-yellow-600 bg-yellow-50",
    },
    [LoanStatus.Reviewed]: {
      variant: "secondary",
      className: "bg-blue-100 text-blue-700",
    },
    [LoanStatus.Declined]: { variant: "destructive", className: "" },
    [LoanStatus.Rejected]: { variant: "destructive", className: "bg-red-700" },
    [LoanStatus.Cancelled]: { variant: "outline", className: "opacity-50" },
    [LoanStatus.Approved]: {
      variant: "default",
      className: "bg-green-600 hover:bg-green-600",
    },
    [LoanStatus.Disbursed]: { variant: "default", className: "bg-indigo-600" },
    [LoanStatus.Repaid]: {
      variant: "secondary",
      className: "bg-emerald-100 text-emerald-800",
    },
  };

  const style = config[status as LoanStatus] || {
    variant: "outline",
    className: "",
  };

  return (
    <Badge
      variant={style.variant}
      className={`capitalize font-medium ${style.className}`}
    >
      {status.replace("_", " ")}
    </Badge>
  );
};

export default LoanStatusBadge;
