// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ChevronDown, ChevronUp, MoreVertical } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export interface TableColumn<T> {
//   key: keyof T;
//   label: string;
//   sortable?: boolean;
//   render?: (value: any, row: T) => React.ReactNode;
//   width?: string;
//   className?: string;
// }

// export interface TableAction<T> {
//   label: string;
//   onClick: (row: T) => void;
//   icon?: React.ReactNode;
//   variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
//   show?: (row: T) => boolean;
// }

// export interface DynamicTableProps<T extends Record<string, any>> {
//   title?: string;
//   columns: TableColumn<T>[];
//   data: T[];
//   actions?: TableAction<T>[];
//   onRowClick?: (row: T) => void;
//   sortable?: boolean;
//   striped?: boolean;
//   hoverable?: boolean;
//   emptyMessage?: string;
// }

// export function DynamicTable<T extends Record<string, any>>({
//   title,
//   columns,
//   data,
//   actions = [],
//   onRowClick,
//   sortable = true,
//   striped = true,
//   hoverable = true,
//   emptyMessage = "No data available",
// }: DynamicTableProps<T>) {
//   const [sortConfig, setSortConfig] = React.useState<{
//     key: keyof T;
//     direction: "asc" | "desc";
//   } | null>(null);

//   const sortedData = React.useMemo(() => {
//     if (!sortConfig || !sortable) return data;

//     const sorted = [...data].sort((a, b) => {
//       const aValue = a[sortConfig.key];
//       const bValue = b[sortConfig.key];

//       if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
//       if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
//       return 0;
//     });

//     return sorted;
//   }, [data, sortConfig, sortable]);

//   const handleSort = (key: keyof T) => {
//     if (!sortable) return;

//     setSortConfig((current) => {
//       if (current?.key === key) {
//         return {
//           key,
//           direction: current.direction === "asc" ? "desc" : "asc",
//         };
//       }
//       return { key, direction: "asc" };
//     });
//   };

//   const SortIcon = ({ columnKey }: { columnKey: keyof T }) => {
//     if (!sortConfig || sortConfig.key !== columnKey) {
//       return <div className="w-4 h-4" />;
//     }
//     return sortConfig.direction === "asc" ? (
//       <ChevronUp className="w-4 h-4" />
//     ) : (
//       <ChevronDown className="w-4 h-4" />
//     );
//   };

//   if (data.length === 0) {
//     return (
//       <div className="w-full p-8 text-center text-gray-500">{emptyMessage}</div>
//     );
//   }

//   return (
//     <>
//       {/* Desktop Table View */}
//       <div className="hidden md:block w-full overflow-x-auto">
//         {title && (
//           <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">
//             {title}
//           </h2>
//         )}
//         <Table>
//           <TableHeader className="bg-gray-50 dark:bg-gray-900">
//             <TableRow className="border-b border-gray-200 dark:border-gray-800">
//               {columns.map((column) => (
//                 <TableHead
//                   key={String(column.key)}
//                   className={`py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300 ${
//                     column.width ? `w-${column.width}` : ""
//                   } ${column.className || ""}`}
//                   onClick={() =>
//                     column.sortable !== false &&
//                     sortable &&
//                     handleSort(column.key)
//                   }
//                 >
//                   <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">
//                     <span>{column.label}</span>
//                     {column.sortable !== false && sortable && (
//                       <SortIcon columnKey={column.key} />
//                     )}
//                   </div>
//                 </TableHead>
//               ))}
//               {actions && actions.length > 0 && (
//                 <TableHead className="py-3 px-4 text-center font-semibold text-gray-700 dark:text-gray-300 w-12">
//                   Actions
//                 </TableHead>
//               )}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {sortedData.map((row, rowIndex) => (
//               <TableRow
//                 key={rowIndex}
//                 className={`border-b border-gray-200 dark:border-gray-800 transition-colors ${
//                   striped && rowIndex % 2 === 0
//                     ? "bg-gray-50 dark:bg-gray-900/30"
//                     : "bg-white dark:bg-transparent"
//                 } ${
//                   hoverable &&
//                   "hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
//                 } ${onRowClick ? "cursor-pointer" : ""}`}
//                 onClick={() => onRowClick?.(row)}
//               >
//                 {columns.map((column) => (
//                   <TableCell
//                     key={String(column.key)}
//                     className={`py-4 px-4 text-gray-700 dark:text-gray-300 ${
//                       column.className || ""
//                     }`}
//                   >
//                     {column.render
//                       ? column.render(row[column.key], row)
//                       : String(row[column.key])}
//                   </TableCell>
//                 ))}
//                 {actions && actions.length > 0 && (
//                   <TableCell className="py-4 px-4 text-center">
//                     {actions.filter((a) => !a.show || a.show(row)).length >
//                     1 ? (
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="sm">
//                             <MoreVertical className="w-4 h-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           {actions.map(
//                             (action, idx) =>
//                               (!action.show || action.show(row)) && (
//                                 <DropdownMenuItem
//                                   key={idx}
//                                   onClick={() => action.onClick(row)}
//                                   className="cursor-pointer"
//                                 >
//                                   {action.icon && (
//                                     <span className="mr-2">{action.icon}</span>
//                                   )}
//                                   {action.label}
//                                 </DropdownMenuItem>
//                               ),
//                           )}
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     ) : (
//                       actions
//                         .filter((a) => !a.show || a.show(row))
//                         .map((action, idx) => (
//                           <Button
//                             key={idx}
//                             size="sm"
//                             variant={action.variant || "default"}
//                             onClick={() => action.onClick(row)}
//                           >
//                             {action.icon && (
//                               <span className="mr-2">{action.icon}</span>
//                             )}
//                             {action.label}
//                           </Button>
//                         ))
//                     )}
//                   </TableCell>
//                 )}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Mobile Card View */}
//       <div className="md:hidden w-full space-y-4">
//         {title && (
//           <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50">
//             {title}
//           </h2>
//         )}
//         {sortedData.map((row, rowIndex) => (
//           <Card
//             key={rowIndex}
//             className={`cursor-pointer transition-all hover:shadow-lg ${
//               onRowClick ? "active:scale-95" : ""
//             }`}
//             onClick={() => onRowClick?.(row)}
//           >
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg">
//                 {columns[0]?.render
//                   ? columns[0]?.render(row[columns[0]?.key], row)
//                   : String(row[columns[0]?.key])}
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {columns.slice(1).map((column) => (
//                 <div
//                   key={String(column.key)}
//                   className="flex justify-between items-center gap-2"
//                 >
//                   <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                     {column.label}
//                   </span>
//                   <span className="text-sm text-gray-900 dark:text-gray-100 font-semibold text-right">
//                     {column.render
//                       ? column.render(row[column.key], row)
//                       : String(row[column.key])}
//                   </span>
//                 </div>
//               ))}

//               {/* Mobile Actions */}
//               {actions && actions.length > 0 && (
//                 <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex gap-2 flex-wrap">
//                   {actions
//                     .filter((a) => !a.show || a.show(row))
//                     .map((action, idx) => (
//                       <Button
//                         key={idx}
//                         size="sm"
//                         variant={action.variant || "default"}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           action.onClick(row);
//                         }}
//                         className="flex-1"
//                       >
//                         {action.icon && (
//                           <span className="mr-2">{action.icon}</span>
//                         )}
//                         {action.label}
//                       </Button>
//                     ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </>
//   );
// }
