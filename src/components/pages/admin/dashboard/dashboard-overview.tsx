"use client";
import {
  DynamicTable,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";
import { StatCard } from "../../dashboard/statsCard";
import { Clock, Text, TrendingUp, Users, Wallet } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { DashboardSkeleton } from "@/components/shared/skeleton/skeleton-card";
import { AdminDashboardStats } from "@/lib/api/adminD/dashboard";

export function DashboardOverview() {
  const {
    data: Data,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["AdminDashboardStats"],
    queryFn: AdminDashboardStats,
  });

  return (
    <div className="space-y-6">
      {isLoading && <DashboardSkeleton />}
      {isSuccess ? (
        Data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              label="Total Active Members"
              value={Data.data.total_members}
              icon={Users}
              iconVariant="blue"
            />
            <StatCard
              label="Active Saving"
              value={
                "₦ " +
                Number(Data.data.active_savings).toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }
              icon={Wallet}
              iconVariant="green"
            />
            <StatCard
              label="Active Loans"
              value={Data.data.active_loans}
              icon={Text}
              iconVariant="yellow"
            />
            <StatCard
              label="Pending Requests (Guarantor Accepted)"
              value={Data.data.pending_requests}
              icon={TrendingUp}
              iconVariant="purple"
            />
            <StatCard
              label="Approved This Month"
              value={Data.data.approved_this_month}
              icon={Clock}
              iconVariant="orange"
            />
            <StatCard
              label="Total Disbursement"
              value={
                "₦ " +
                Number(Data.data.total_disbursement).toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }
              icon={Wallet}
              iconVariant="blue"
            />
          </div>
        )
      ) : (
        <div>{error?.message}</div>
      )}
    </div>
  );
}
