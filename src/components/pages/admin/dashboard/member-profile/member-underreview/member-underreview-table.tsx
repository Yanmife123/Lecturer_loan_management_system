"use client";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  allMemberRequestsReviews,
  GenSecApproveMemberReviews,
  PresidentApproveMemberReviews,
} from "@/lib/api/member/all_member_request";
import { LaravelPaginationMeta } from "@/components/shared/table/laravel-pagination-type";
import { useState } from "react";
import { TableSkeleton } from "@/components/shared/skeleton/skeleton-table";
import { ConfirmModal } from "@/components/shared/Modal";
import {
  DynamicTable,
  TableColumn,
  TableAction,
} from "@/components/shared/table/dyanmic-table";
import { Member } from "@/lib/type/admin/dashboard/member-profile/member-underreview";
import { useRole } from "@/lib/hooks/useRole";
import { toast } from "sonner";

export function MemberUnderReviewTable() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [openPresidentApprove, setOpenPresidentApprove] =
    useState<boolean>(false);
  const [openGenSecApprove, setOpenGenSecApprove] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<string>("");
  const { hasRole } = useRole();
  const {
    data: memberData,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["memberUnderreview", page],
    queryFn: () => allMemberRequestsReviews(page),
    placeholderData: keepPreviousData,
  });
  const meta: LaravelPaginationMeta | undefined =
    memberData?.data.current_page != null
      ? {
          current_page: memberData.data.current_page,
          last_page: memberData.data.last_page,
          per_page: memberData.data.per_page,
          total: memberData.data.total,
          from: memberData.data.from ?? null,
          to: memberData.data.to ?? null,
        }
      : undefined;

  const Columns: TableColumn<Member>[] = [
    {
      label: "Full Name",
      key: "surname",
      render(value, row) {
        return `${row.prefix} ${row.surname} ${row.other_names}`;
      },
    },
    {
      label: "Member ID",
      key: "membership_detail",
      id: "membership_no",
      render(value, row) {
        return `${row.membership_detail?.membership_no} `;
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
    { label: "Date Requested", key: "created_at" },
    {
      label: "President Approval",
      id: "President_approved_by",
      key: "membership_detail",
      render(value, row) {
        const approved = row.membership_detail?.President_approved_by != null;
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "2px 10px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 500,
              backgroundColor: approved
                ? "var(--color-background-success)"
                : "var(--color-background-warning)",
              color: approved
                ? "var(--color-text-success)"
                : "var(--color-text-warning)",
              border: `0.5px solid ${approved ? "var(--color-border-success)" : "var(--color-border-warning)"}`,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "10px" }}>{approved ? "✔" : "⏳"}</span>
            {approved ? "Approved" : "Awaiting President"}
          </span>
        );
      },
    },
    {
      label: "Secretary Approval",
      key: "membership_detail",
      id: "general_secretary_approved_by",
      render(value, row) {
        const approved =
          row.membership_detail?.general_secretary_approved_by != null;
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "2px 10px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 500,
              backgroundColor: approved
                ? "var(--color-background-success)"
                : "var(--color-background-warning)",
              color: approved
                ? "var(--color-text-success)"
                : "var(--color-text-warning)",
              border: `0.5px solid ${approved ? "var(--color-border-success)" : "var(--color-border-warning)"}`,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "10px" }}>{approved ? "✔" : "⏳"}</span>
            {approved ? "Approved" : "Awaiting Secretary"}
          </span>
        );
      },
    },
    { label: "Status", key: "status" },
  ];

  const actions: TableAction<Member>[] = [
    {
      label: "View Details",
      onClick: (memberRequest) => {
        // Handle view details action
      },
    },
    {
      label: "President Approve",
      variant: "outline",
      show: (row) =>
        row.status === "pending" &&
        !row.membership_detail?.President_approved_by &&
        hasRole("president", "admin"),
      onClick: (row) => {
        setSelectedRow(String(row.id));
        setOpenPresidentApprove(true);
      },
    },
    {
      label: "General Secretary Approve",
      variant: "outline",
      // Handle reject action
      onClick: (row) => {
        setSelectedRow(String(row.id));
        setOpenGenSecApprove(true);
      },
      show: (row) =>
        row.status === "pending" &&
        !row.membership_detail?.general_secretary_approved_by &&
        hasRole("gen_secretary", "admin"),
    },
  ];

  const presidentApproveMutation = useMutation({
    mutationFn: PresidentApproveMemberReviews,
    onSuccess: (data) => {
      toast.success("President Approved", { description: data.message });
      setOpenPresidentApprove(false);
      queryClient.invalidateQueries({ queryKey: ["memberUnderreview", page] });
    },
    onError: (error) => {
      toast.error("President Approval Failed", { description: error.message });
    },
  });
  const genSecApproveMutation = useMutation({
    mutationFn: GenSecApproveMemberReviews,
    onSuccess: (data) => {
      toast.success("General Secretary Approved", {
        description: data.message,
      });
      setOpenGenSecApprove(false);
      queryClient.invalidateQueries({ queryKey: ["memberUnderreview", page] });
    },
    onError: (error) => {
      toast.error("General Secretary Approval Failed", {
        description: error.message,
      });
    },
  });

  const handleSubmit = () => {
    presidentApproveMutation.mutate(selectedRow);
  };

  return (
    <div className="overflow-x-auto">
      {isLoading && <TableSkeleton />}
      {isSuccess ? (
        memberData && (
          <DynamicTable
            data={memberData.data.data}
            columns={Columns}
            loading={isLoading}
            actions={actions}
            onPageChange={(p) => setPage(p)}
            pagination={meta ?? undefined}
          />
        )
      ) : (
        <div>{error?.message}</div>
      )}

      <ConfirmModal
        open={openPresidentApprove}
        onClose={() => setOpenPresidentApprove(false)}
        title=" President Confirm Approval"
        description={`Are you sure you want to approve ${selectedRow} ?  This action cannot be undone.`}
        confirmLabel="Yes, Approve"
        confirmVariant="success"
        onConfirm={handleSubmit}
        loading={presidentApproveMutation.isPending}
      />
      <ConfirmModal
        open={openGenSecApprove}
        onClose={() => setOpenGenSecApprove(false)}
        title="General Secretary Confirm Approval"
        description={`Are you sure you want to approve ${selectedRow} ?  This action cannot be undone.`}
        confirmLabel="Yes, Approve"
        confirmVariant="success"
        onConfirm={() => {
          genSecApproveMutation.mutate(selectedRow);
        }}
        loading={genSecApproveMutation.isPending}
      />
    </div>
  );
}
