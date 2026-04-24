"use client";
import {
  DynamicTable,
  TableColumn,
  TableAction,
} from "@/components/shared/table/dyanmic-table";
import { useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { allActiveMember } from "@/lib/api/member/all_member_request";
import { useState } from "react";
import { Member } from "@/lib/type/admin/dashboard/member-profile/member-underreview";
import { LaravelPaginationMeta } from "@/components/shared/table/laravel-pagination-type";
import { TableSkeleton } from "@/components/shared/skeleton/skeleton-table";
import { formatDate } from "@/components/utility/functions/data-fn";
// interface Member {
//   id: number;
//   MemberId: string;
//   name: string;
//   staffId: string;
//   dateJoined: string;
//   status: string;
// }

// const MEMBER_DATA: Member[] = [
//   {
//     id: 1,
//     MemberId: "MEMBER-001",
//     name: "Dr. Adeyemi Johnson Oluwaseun",
//     staffId: "RUN/2024/001",
//     dateJoined: "Jan 15, 2024",
//     status: "Active",
//   },
//   {
//     id: 2,
//     MemberId: "MEMBER-002",
//     name: "Mrs. Grace Okonkwo",
//     staffId: "RUN/2023/045",
//     dateJoined: "Mar 20, 2023",
//     status: "Active",
//   },
//   {
//     id: 3,
//     MemberId: "MEMBER-003",
//     name: "Prof. Samuel Adeleke",
//     staffId: "RUN/2022/112",
//     dateJoined: "Sep 5, 2022",
//     status: "Active",
//   },
// ];

export function MemberTable() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const {
    data: ActiveMember,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["allActiveMembers", page],
    queryFn: () => allActiveMember(page),
    placeholderData: keepPreviousData,
  });

  const meta: LaravelPaginationMeta | undefined =
    ActiveMember?.data.current_page != null
      ? {
          current_page: ActiveMember.data.current_page,
          last_page: ActiveMember.data.last_page,
          per_page: ActiveMember.data.per_page,
          total: ActiveMember.data.total,
          from: ActiveMember.data.from ?? null,
          to: ActiveMember.data.to ?? null,
        }
      : undefined;

  const columns: TableColumn<Member>[] = [
    { label: "ID", key: "id" },
    {
      label: "Member No",
      key: "membership_detail",
      id: "membership_no",
      render(value, row) {
        return `${row.membership_detail?.membership_no}`;
      },
    },
    {
      label: "Name",
      key: "surname",
      render(value, row) {
        return `${row.prefix} ${row.surname} ${row.other_names}`;
      },
    },
    { label: "email", key: "email" },
    { label: "gender", key: "gender" },

    {
      label: "Date Joined",
      key: "membership_detail",
      render(value, row) {
        return formatDate(
          row.membership_detail?.effective_date_of_membership,
          "month-year",
        );
      },
    },
    {
      label: "User Role",
      key: "role",
    },
    { label: "Status", key: "status" },
  ];
  const actions: TableAction<Member>[] = [
    {
      label: "View Profile",
      variant: "outline",
      onClick: (member: Member) => {
        // Handle view profile action
        // console.log("View profile for:", member);
        // For example, navigate to the member's profile page
        // router.push(`/admin/dashboard/members/profile/${member.id}`);
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      {isLoading && <TableSkeleton />}
      {isSuccess ? (
        ActiveMember && (
          <DynamicTable
            data={ActiveMember.data.data}
            columns={columns}
            actions={actions}
            pagination={meta ?? undefined}
            loading={isLoading}
            onPageChange={(p) => setPage(p)}
          />
        )
      ) : (
        <div>{error?.message}</div>
      )}
    </div>
  );
}
