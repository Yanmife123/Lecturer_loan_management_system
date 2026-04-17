"use client";
import {
  DynamicTable,
  TableColumn,
  TableAction,
} from "@/components/shared/table/dyanmic-table";
import { useRouter } from "next/navigation";

interface Member {
  id: number;
  MemberId: string;
  name: string;
  staffId: string;
  dateJoined: string;
  status: string;
}

const MEMBER_DATA: Member[] = [
  {
    id: 1,
    MemberId: "MEMBER-001",
    name: "Dr. Adeyemi Johnson Oluwaseun",
    staffId: "RUN/2024/001",
    dateJoined: "Jan 15, 2024",
    status: "Active",
  },
  {
    id: 2,
    MemberId: "MEMBER-002",
    name: "Mrs. Grace Okonkwo",
    staffId: "RUN/2023/045",
    dateJoined: "Mar 20, 2023",
    status: "Active",
  },
  {
    id: 3,
    MemberId: "MEMBER-003",
    name: "Prof. Samuel Adeleke",
    staffId: "RUN/2022/112",
    dateJoined: "Sep 5, 2022",
    status: "Active",
  },
];

export function MemberTable() {
  const router = useRouter();
  const columns: TableColumn<Member>[] = [
    { label: "Member ID", key: "MemberId" },
    { label: "Name", key: "name" },
    { label: "Staff ID", key: "staffId" },
    { label: "Date Joined", key: "dateJoined" },
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
        router.push(`/admin/dashboard/members/profile/${member.id}`);
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      <DynamicTable data={MEMBER_DATA} columns={columns} actions={actions} />
    </div>
  );
}
