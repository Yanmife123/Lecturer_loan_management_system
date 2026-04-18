"use client";
import {
  DynamicTable,
  TableAction,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";
import { UserRole } from "@/lib/hooks/useUser";

import { useQuery } from "@tanstack/react-query";
import { allMemberRequestsPending } from "@/lib/api/member/all_member_request";
import { TableSkeleton } from "@/components/shared/skeleton/skeleton-table";

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
  const {
    data: Member,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["memberRequests"],
    queryFn: allMemberRequestsPending,
  });
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
      onClick: (memberRequest) => {
        // Handle approve action
      },
    },
    {
      label: "Reject",
      variant: "outline",
      onClick: (memberRequest) => {
        // Handle reject action
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      {isLoading && <TableSkeleton />}

      {isSuccess ? (
        Member && (
          <DynamicTable
            data={Member.data.data}
            columns={columns}
            actions={actions}
          />
        )
      ) : (
        <div>{error?.message}</div>
      )}
    </div>
  );
}
