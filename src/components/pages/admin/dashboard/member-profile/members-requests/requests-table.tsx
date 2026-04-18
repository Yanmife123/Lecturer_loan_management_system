"use client";
import {
  DynamicTable,
  TableAction,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";
import { UserRole } from "@/lib/hooks/useUser";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { allMemberRequestsPending } from "@/lib/api/member/all_member_request";
import { TableSkeleton } from "@/components/shared/skeleton/skeleton-table";
import { useState } from "react";
import { LaravelPaginationMeta } from "@/components/shared/table/laravel-pagination-type";
import { ApproveMemberModal } from "./ApproveMemberModal";
import { DeclineMemberModal } from "./DeclineMemberModal";
import { useRole } from "@/lib/hooks/useRole";

export interface MemberRequest {
  id: string;
  prefix: string;
  surname: string;
  other_names: string;
  email: string;
  role: UserRole;
  member_type: "old" | "new";
  status: "active" | "suspended" | "exited" | "pending";
  gender: "male" | "female";
  date_of_birth: string;
  marital_status: string;
  residential_address: string;
  permanent_address: string;
  phone_number: string;
  created_at: string;
}

export function MemberRequestsTable() {
  const { canAccess } = useRole();
  const [page, setPage] = useState(1);
  const [approveTarget, setApproveTarget] = useState<MemberRequest | null>(
    null,
  );
  const [declineTarget, setDeclineTarget] = useState<MemberRequest | null>(
    null,
  );

  const {
    data: Member,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["memberRequests", page], // page in key = auto refetch on change
    queryFn: () => allMemberRequestsPending(page),
    placeholderData: keepPreviousData,
  });

  const meta: LaravelPaginationMeta | undefined =
    Member?.data.current_page != null
      ? {
          current_page: Member.data.current_page,
          last_page: Member.data.last_page,
          per_page: Member.data.per_page,
          total: Member.data.total,
          from: Member.data.from ?? null,
          to: Member.data.to ?? null,
        }
      : undefined;

  const columns: TableColumn<MemberRequest>[] = [
    {
      label: "Surname",
      key: "surname",
      render(value, row) {
        return `${row.prefix} ${row.surname} ${row.other_names}`;
      },
    },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone_number" },
    // { label: "Staff ID", key: "staffId" },
    { label: "Date Requested", key: "created_at" },
    { label: "Status", key: "status" },
  ];
  const actions: TableAction<MemberRequest>[] = [
    {
      label: "View Details",
      onClick: (memberRequest) => {
        // Handle view details action
      },
    },
    {
      label: "Approve",
      variant: "outline",
      show: (row) =>
        row.status === "pending" && canAccess("secretary", "gen_secretary"),
      onClick: (row) => setApproveTarget(row),
    },
    {
      label: "Reject",
      variant: "outline",
      // Handle reject action
      onClick: (row) => setDeclineTarget(row),
      show: (row) =>
        row.status === "pending" && canAccess("secretary", "gen_secretary"),
    },
  ];

  const handleApprove = () => {};
  const handleDecline = () => {};

  return (
    <div className="overflow-x-auto">
      {isLoading && <TableSkeleton />}

      {isSuccess ? (
        Member && (
          <div>
            <DynamicTable
              data={Member.data.data}
              columns={columns}
              actions={actions}
              loading={isLoading}
              pagination={meta ?? undefined}
              onPageChange={(p) => setPage(p)}
            />
            {/* Approve modal */}
            <ApproveMemberModal
              open={!!approveTarget}
              onClose={() => setApproveTarget(null)}
              // memberName={fullName(approveTarget)}
              // memberId={approveTarget?.id ?? ""}
              // onApprove={handleApprove}
            />

            {/* Decline modal */}
            <DeclineMemberModal
              open={!!declineTarget}
              onClose={() => setDeclineTarget(null)}
              // memberName={fullName(declineTarget)}
              // memberId={declineTarget?.id ?? ""}
              // onDecline={handleDecline}
            />
          </div>
        )
      ) : (
        <div>{error?.message}</div>
      )}
    </div>
  );
}
