// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { CheckCircle, XCircle } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import {
//   DynamicTable,
//   type TableColumn,
//   type TableAction,
//   type LaravelPaginationMeta,
// } from "@/components/shared/table/dyanmic-table";
// import { ApproveMemberModal } from "@/components/ApproveMemberModal";
// import { DeclineMemberModal } from "@/components/DeclineMemberModal";

// // ── Types ─────────────────────────────────────────────────────────────────────

// interface MemberRequest {
//   id: number;
//   prefix: string;
//   surname: string;
//   other_names: string;
//   email: string;
//   phone_number: string;
//   status: "pending" | "approved" | "declined" | "suspended" | "exited";
//   created_at: string;
// }

// /** Exact shape Laravel's ->paginate() returns */
// interface LaravelPaginatedResponse {
//   data: MemberRequest[];
//   current_page: number;
//   last_page: number;
//   per_page: number;
//   total: number;
//   from: number | null;
//   to: number | null;
//   first_page_url: string;
//   last_page_url: string;
//   next_page_url: string | null;
//   prev_page_url: string | null;
//   path: string;
// }

// // ── Columns ───────────────────────────────────────────────────────────────────

// const columns: TableColumn<MemberRequest>[] = [
//   {
//     key: "surname",
//     label: "Full Name",
//     render: (_, row) => `${row.prefix} ${row.surname} ${row.other_names}`,
//   },
//   { key: "email", label: "Email" },
//   { key: "phone_number", label: "Phone" },
//   {
//     key: "created_at",
//     label: "Date Requested",
//     render: (val) =>
//       new Date(val).toLocaleDateString("en-NG", { dateStyle: "medium" }),
//   },
//   {
//     key: "status",
//     label: "Status",
//     sortable: false,
//     render: (val) => {
//       const map: Record<string, string> = {
//         pending: "bg-amber-100 text-amber-700",
//         approved: "bg-green-100 text-green-700",
//         declined: "bg-red-100 text-red-700",
//         suspended: "bg-gray-100 text-gray-600",
//         exited: "bg-slate-100 text-slate-600",
//       };
//       return (
//         <Badge className={map[val] ?? "bg-gray-100 text-gray-600"}>{val}</Badge>
//       );
//     },
//   },
// ];

// // ── Page ──────────────────────────────────────────────────────────────────────

// export default function MemberRequestsPage() {
//   const [rows, setRows] = useState<MemberRequest[]>([]);
//   const [meta, setMeta] = useState<LaravelPaginationMeta | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [approveTarget, setApproveTarget] = useState<MemberRequest | null>(
//     null,
//   );
//   const [declineTarget, setDeclineTarget] = useState<MemberRequest | null>(
//     null,
//   );

//   // ── Fetch ──────────────────────────────────────────────────────────────────
//   const fetchPage = useCallback(async (page: number) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/admin/members/pending?page=${page}`, {
//         headers: { Accept: "application/json" },
//       });
//       const json: LaravelPaginatedResponse = await res.json();

//       setRows(json.data);

//       // Map Laravel response → LaravelPaginationMeta (same keys, just picking what we need)
//       setMeta({
//         current_page: json.current_page,
//         last_page: json.last_page,
//         per_page: json.per_page,
//         total: json.total,
//         from: json.from,
//         to: json.to,
//       });
//     } catch (err) {
//       console.error("Failed to fetch member requests", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPage(currentPage);
//   }, [currentPage, fetchPage]);

//   const handlePageChange = (page: number) => setCurrentPage(page);

//   // ── Approve ────────────────────────────────────────────────────────────────
//   const handleApprove = async (formData: {
//     membership_no: string;
//     effective_date_of_membership: string;
//     total_oustanding_loan: string;
//     total_saving: string;
//   }) => {
//     await fetch(`/api/admin/members/${approveTarget?.id}/approve`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(formData),
//     });
//     // Refresh the current page after action
//     fetchPage(currentPage);
//   };

//   // ── Decline ────────────────────────────────────────────────────────────────
//   const handleDecline = async (reason: string) => {
//     await fetch(`/api/admin/members/${declineTarget?.id}/decline`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({ reason }),
//     });
//     fetchPage(currentPage);
//   };

//   // ── Actions — only visible on pending rows ─────────────────────────────────
//  export default function MemberRequestsPage() {
//   const { canAccess, isAdmin } = useRole();

//   // ── Actions ──────────────────────────────────────────────────────────────
//   const actions: TableAction<MemberRequest>[] = [
//     {
//       label:   "Approve",
//       icon:    <CheckCircle className="w-4 h-4 text-green-600" />,
//       variant: "ghost",
//       // row-level condition AND role check combined in show()
//       show:    (row) => row.status === "pending" && canAccess("secretary", "gen_secretary"),
//       onClick: (row) => setApproveTarget(row),
//     },
//     {
//       label:   "Decline",
//       icon:    <XCircle className="w-4 h-4 text-red-500" />,
//       variant: "ghost",
//       show:    (row) => row.status === "pending" && canAccess("secretary", "gen_secretary"),
//       onClick: (row) => setDeclineTarget(row),
//     },
//     {
//       label:   "View Details",
//       icon:    <Eye className="w-4 h-4 text-gray-500" />,
//       variant: "ghost",
//       // no role restriction — everyone sees this
//       onClick: (row) => router.push(`/admin/members/${row.id}`),
//     },
//     {
//       label:   "Delete",
//       icon:    <Trash2 className="w-4 h-4 text-red-500" />,
//       variant: "ghost",
//       // strictly admin only — no escalation
//       show:    () => isAdmin,
//       onClick: (row) => setDeleteTarget(row),
//     },
//   ];

//   const fullName = (row: MemberRequest | null) =>
//     row ? `${row.prefix} ${row.surname} ${row.other_names}` : "";

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <div className="p-6 space-y-4">
//       {/* Breadcrumb */}
//       <nav className="text-sm text-gray-400 font-sans">
//         Dashboard &rsaquo; Members &rsaquo;{" "}
//         <span className="text-primaryT font-medium">Member Requests</span>
//       </nav>

//       <h1 className="text-2xl font-semibold text-primaryT">Member Requests</h1>

//       <DynamicTable
//         columns={columns}
//         data={rows}
//         actions={actions}
//         loading={loading}
//         pagination={meta ?? undefined}
//         onPageChange={handlePageChange}
//         emptyMessage="No pending member requests"
//       />

//       {/* Approve modal */}
//       <ApproveMemberModal
//         open={!!approveTarget}
//         onClose={() => setApproveTarget(null)}
//         memberName={fullName(approveTarget)}
//         memberId={approveTarget?.id ?? ""}
//         onApprove={handleApprove}
//       />

//       {/* Decline modal */}
//       <DeclineMemberModal
//         open={!!declineTarget}
//         onClose={() => setDeclineTarget(null)}
//         memberName={fullName(declineTarget)}
//         memberId={declineTarget?.id ?? ""}
//         onDecline={handleDecline}
//       />
//     </div>
//   );
// }
