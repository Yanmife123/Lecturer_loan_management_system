"use client";
import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/pages/dashboard/statsCard";
import { PiggyBank, FileText, User, TrendingUp } from "lucide-react";
import { UserDashboardStats } from "@/lib/api/adminD/dashboard";
import { DashboardSkeleton } from "@/components/shared/skeleton/skeleton-card";

export function UsersDashboardStats() {
  const {
    data: Data,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["UserDashboardStats"],
    queryFn: UserDashboardStats,
  });
  return (
    <div>
      {isLoading && <DashboardSkeleton />}{" "}
      {isSuccess ? (
        Data && (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            <StatCard
              icon={PiggyBank}
              value={
                "₦ " +
                Number(Data.data.savings_balance).toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }
              label="Savings Balance"
            />
            <StatCard
              icon={FileText}
              value={Data.data.active_loans}
              label="Active Loans"
              iconVariant="blue"
            />
            <StatCard
              icon={TrendingUp}
              value={Data.data.next_repayment}
              label="Next Repayment"
              iconVariant="yellow"
            />
            <StatCard
              icon={User}
              value={Data.data.membership_status}
              label="Membership Status"
            />
          </div>
        )
      ) : (
        <div>{error?.message}</div>
      )}
    </div>
  );
}
