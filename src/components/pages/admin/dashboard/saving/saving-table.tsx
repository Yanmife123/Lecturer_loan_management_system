import {
  DynamicTable,
  TableColumn,
} from "@/components/shared/table/dyanmic-table";

interface savingRecordType {
  id: number | string;
  name: string;
  staffId: string;
  monthlySaving: number | string;
  totalSaving: number | string;
  lastContibutionDate: string;
  status: "active" | "inactive";
}

const savingRecords: savingRecordType[] = [
  {
    id: 1,
    name: "Dr. Adeyemi Johnson",
    staffId: "RUN/2024/001",
    monthlySaving: "₦50,000",
    totalSaving: "₦1,200,000",
    lastContibutionDate: "Mar 2026",
    status: "active",
  },
  {
    id: 2,
    name: "Mrs. Grace Okonkwo",
    staffId: "RUN/2023/045",
    monthlySaving: "₦35,000",
    totalSaving: "₦850,000",
    lastContibutionDate: "Mar 2026",
    status: "active",
  },
  {
    id: 3,
    name: "Prof. Samuel Adeleke",
    staffId: "RUN/2022/112",
    monthlySaving: "₦75,000",
    totalSaving: "₦2,500,000",
    lastContibutionDate: "Mar 2026",
    status: "active",
  },
  {
    id: 4,
    name: "Mr. David Okoro",
    staffId: "RUN/2024/089",
    monthlySaving: "₦40,000",
    totalSaving: "₦480,000",
    lastContibutionDate: "Mar 2026",
    status: "active",
  },
];

export function SavingTable() {
  const columns: TableColumn<savingRecordType>[] = [
    { label: "Name", key: "name" },
    { label: "Staff ID", key: "staffId" },
    { label: "Monthly Saving", key: "monthlySaving" },
    { label: "Total Saving", key: "totalSaving" },
    { label: "Last Contribution Date", key: "lastContibutionDate" },
    { label: "Status", key: "status" },
  ];

  return (
    <div>
      <DynamicTable data={savingRecords} columns={columns} />
    </div>
  );
}
