import { LoanRequestsTable } from "@/components/pages/admin/dashboard/loans-requests/loan-requests-table";
import { PageHeader } from "@/components/shared/header/page-header2";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoansRequests() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Loan Requests Pending"
        description="These are loans that the Secretary has not responded to and have not been sent to the chairman"
        breadcrumbs={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Loan Requests Pending",
          },
        ]}
      />
      <div className="flex justify-end items-center gap-3 flex-wrap">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 max-md:w-full">
          <Button variant="outline">
            <Link href="/admin/dashboard/loans-requests/reviews">
              Loan Application Review
            </Link>
          </Button>
          <Button variant="outline">
            <Link href="/admin/dashboard/loans-requests/executive-approval">
              Executive Loan Approval
            </Link>
          </Button>
          {/* <Button variant="default">
            <Link href="/admin/dashboard/members/all-members">All Members</Link>
          </Button> */}
        </div>
      </div>
      <LoanRequestsTable />
    </div>
  );
}
