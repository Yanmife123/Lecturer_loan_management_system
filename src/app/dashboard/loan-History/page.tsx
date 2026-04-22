import { StatCard } from "@/components/pages/dashboard/statsCard";
import { PiggyBank, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function DashboardLoanHistory() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        <StatCard
          icon={FileText}
          value="4"
          label="Total Loans Taken"
          iconVariant="blue"
        />
        <StatCard
          icon={PiggyBank}
          value="₦2,400,000"
          label="Total Amount Borrowed"
          iconVariant="blue"
        />
        <StatCard
          icon={CheckCircle}
          value="₦685,000"
          label="Total Amount Repaid"
          iconVariant="green"
        />
        <StatCard
          icon={AlertCircle}
          value="₦1,300,000"
          label="Outstanding Balance"
          iconVariant="yellow"
        />
      </div>
      <div className="space-y-3">
        <div className="flex justify-end items-center gap-3 flex-wrap">
          <div className="grid  grid-cols-1 gap-3 max-md:w-full">
            <Button variant="outline">
              <Link href="/dashboard/loan-History/ongoing-request">
                Ongoing Pending Loan Requests
              </Link>
            </Button>
          </div>
        </div>
        // Table will be here
      </div>
      <div>{/* <LaonHistoryTable /> */}</div>
    </div>
  );
}
