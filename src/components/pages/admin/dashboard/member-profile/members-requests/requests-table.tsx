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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putPendingMemberUnderReview } from "@/lib/api/member/all_member_request";
import { toast } from "sonner";
// import { ApproveFormValues } from "./ApproveMemberModal";

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
  const queryClient = useQueryClient();
  const { hasRole } = useRole();
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
      label: "Full Name",
      key: "surname",
      render(value, row) {
        return `${row.prefix} ${row.surname} ${row.other_names}`;
      },
    },
    {
      label: "Member Type",
      key: "member_type",
      render(value, row) {
        const isNew = row.member_type === "new";
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "2px 10px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 500,
              backgroundColor: isNew
                ? "var(--color-background-info)"
                : "var(--color-background-secondary)",
              color: isNew
                ? "var(--color-text-info)"
                : "var(--color-text-secondary)",
              border: `0.5px solid ${isNew ? "var(--color-border-info)" : "var(--color-border-secondary)"}`,
              whiteSpace: "nowrap",
            }}
          >
            {isNew ? "New Member" : "Old Member"}
          </span>
        );
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
        row.status === "pending" &&
        hasRole("secretary", "gen_secretary", "admin"),
      onClick: (row) => setApproveTarget(row),
    },
    {
      label: "Reject",
      variant: "outline",
      // Handle reject action
      onClick: (row) => setDeclineTarget(row),
      show: (row) =>
        row.status === "pending" &&
        hasRole("secretary", "gen_secretary", "admin"),
    },
  ];

  const fullName = (row: MemberRequest | null) =>
    row ? `${row.prefix} ${row.surname} ${row.other_names}` : "";

  const approveMutation = useMutation({
    mutationFn: putPendingMemberUnderReview,
    onSuccess: (data) => {
      toast.success("Request Approved and Submitted", {
        description:
          "Requested has been approve my the Secretary and await the request of General Secretary and President",
      });
      queryClient.invalidateQueries({ queryKey: ["memberRequests", page] });
    },
    onError: (error) => {
      toast.error("Failed to Approve", { description: error.message });
    },
  });

  // const handleApprove = ({
  //   id,
  //   data,
  // }: {
  //   data: ApproveFormValues;
  //   id: string;
  // }) => {
  //   approveMutation.mutate({
  //     id: id,
  //     data: data,
  //   });
  // };
  // const handleDecline = () => {};

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
              memberName={fullName(approveTarget)}
              memberId={approveTarget?.id ?? ""}
              onApprove={approveMutation.mutateAsync}
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
