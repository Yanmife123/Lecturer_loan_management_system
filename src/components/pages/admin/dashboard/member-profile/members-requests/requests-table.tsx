import {
  DynamicTable,
  TableAction,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";

interface MemberRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  staffId: string;
  dateRequested: string;
  status: string;
}

const MEMBER_REQUESTS: MemberRequest[] = [
  {
    id: 1,
    name: "Dr. Adeyemi Johnson",
    email: "a.johnson@run.edu.ng",
    phone: "08012345678",
    staffId: "RUN/2024/001",
    dateRequested: "Apr 10, 2026",
    status: "Pending",
  },
  {
    id: 2,
    name: "Mrs. Grace Okonkwo",
    email: "g.okonkwo@run.edu.ng",
    phone: "08022223333",
    staffId: "RUN/2023/045",
    dateRequested: "Apr 12, 2026",
    status: "Approved",
  },
  {
    id: 3,
    name: "Prof. Samuel Adeleke",
    email: "s.adeleke@run.edu.ng",
    phone: "08033334444",
    staffId: "RUN/2022/112",
    dateRequested: "Apr 14, 2026",
    status: "Pending",
  },
  {
    id: 4,
    name: "Mr. David Okoro",
    email: "d.okoro@run.edu.ng",
    phone: "08055556666",
    staffId: "RUN/2024/089",
    dateRequested: "Apr 15, 2026",
    status: "Rejected",
  },
];

export function MemberRequestsTable() {
  const columns: TableColumn<MemberRequest>[] = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Staff ID", key: "staffId" },
    { label: "Date Requested", key: "dateRequested" },
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
      <DynamicTable
        data={MEMBER_REQUESTS}
        columns={columns}
        actions={actions}
      />
    </div>
  );
}
