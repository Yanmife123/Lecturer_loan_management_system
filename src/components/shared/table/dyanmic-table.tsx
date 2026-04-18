"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronUp,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode; // eslint-disable-line @typescript-eslint/no-explicit-any
  width?: string;
  className?: string;
}

export interface TableAction<T> {
  label: string;
  onClick: (row: T) => void;
  icon?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  /** Return false to hide this action for a specific row */
  show?: (row: T) => boolean;
}

/**
 * Laravel pagination meta shape.
 * Matches the default Laravel paginator JSON response.
 *
 * {
 *   current_page: 1,
 *   last_page: 10,
 *   per_page: 15,
 *   total: 142,
 *   from: 1,
 *   to: 15,
 * }
 */
export interface LaravelPaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface DynamicTableProps<T extends Record<string, any>> {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  title?: string;
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
  onRowClick?: (row: T) => void;
  sortable?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  emptyMessage?: string;

  // ── Pagination ─────────────────────────────────────────────────────────────
  /** Pass the Laravel paginator meta object to enable pagination */
  pagination?: LaravelPaginationMeta;
  /** Called when the user navigates to a new page */
  onPageChange?: (page: number) => void;
  /** Show a loading skeleton over the table while fetching */
  loading?: boolean;
}

// ── Pagination bar ────────────────────────────────────────────────────────────

function PaginationBar({
  meta,
  onPageChange,
  loading,
}: {
  meta: LaravelPaginationMeta;
  onPageChange: (page: number) => void;
  loading?: boolean;
}) {
  const { current_page, last_page, total, from, to } = meta;
  const isFirst = current_page === 1;
  const isLast = current_page === last_page;

  // Build a compact window of page numbers: [1] … [4 5 6] … [10]
  const pages = React.useMemo(() => {
    const delta = 1; // pages on either side of current
    const range: (number | "...")[] = [];
    const left = Math.max(2, current_page - delta);
    const right = Math.min(last_page - 1, current_page + delta);

    range.push(1);
    if (left > 2) range.push("...");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < last_page - 1) range.push("...");
    if (last_page > 1) range.push(last_page);

    return range;
  }, [current_page, last_page]);

  const btn = (
    page: number | "...",
    icon: React.ReactNode,
    disabled: boolean,
    label: string,
  ) => (
    <button
      key={label}
      aria-label={label}
      disabled={disabled || loading || page === "..."}
      onClick={() => typeof page === "number" && onPageChange(page)}
      className={`
        inline-flex items-center justify-center h-8 min-w-[2rem] px-1.5 rounded-md text-sm font-medium
        transition-colors select-none
        ${
          page === current_page
            ? "bg-[#F5A623] text-white shadow-sm"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
    >
      {icon ?? page}
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 pb-1 px-1">
      {/* Count summary */}
      <p className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
        {from !== null && to !== null ? (
          <>
            Showing{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {from}–{to}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {total.toLocaleString()}
            </span>{" "}
            results
          </>
        ) : (
          <>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {total.toLocaleString()}
            </span>{" "}
            total results
          </>
        )}
      </p>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        {btn(
          1,
          <ChevronsLeft className="w-3.5 h-3.5" />,
          isFirst,
          "First page",
        )}
        {btn(
          current_page - 1,
          <ChevronLeft className="w-3.5 h-3.5" />,
          isFirst,
          "Previous page",
        )}

        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="px-1 text-gray-400 select-none"
            >
              …
            </span>
          ) : (
            btn(p, null, false, `Page ${p}`)
          ),
        )}

        {btn(
          current_page + 1,
          <ChevronRight className="w-3.5 h-3.5" />,
          isLast,
          "Next page",
        )}
        {btn(
          last_page,
          <ChevronsRight className="w-3.5 h-3.5" />,
          isLast,
          "Last page",
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function DynamicTable<T extends Record<string, any>>({
  // eslint-disable-line @typescript-eslint/no-explicit-any
  title,
  columns,
  data,
  actions = [],
  onRowClick,
  sortable = true,
  striped = true,
  hoverable = true,
  emptyMessage = "No data available",
  pagination,
  onPageChange,
  loading = false,
}: DynamicTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortConfig || !sortable) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig, sortable]);

  const handleSort = (key: keyof T) => {
    if (!sortable) return;
    setSortConfig((current) =>
      current?.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof T }) => {
    if (!sortConfig || sortConfig.key !== columnKey)
      return <div className="w-4 h-4" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const visibleActions = (row: T) =>
    actions.filter((a) => !a.show || a.show(row));

  const renderActions = (row: T) => {
    const visible = visibleActions(row);
    if (visible.length === 0) return null;

    if (visible.length > 1) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {visible.map((action, idx) => (
              <DropdownMenuItem
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(row);
                }}
                className="cursor-pointer font-sans text-sm"
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return visible.map((action, idx) => (
      <Button
        key={idx}
        size="sm"
        variant={action.variant || "default"}
        onClick={(e) => {
          e.stopPropagation();
          action.onClick(row);
        }}
      >
        {action.icon && <span className="mr-2">{action.icon}</span>}
        {action.label}
      </Button>
    ));
  };

  const isEmpty = data.length === 0 && !loading;

  const tableContent = (
    <div
      className={`relative transition-opacity duration-200 ${loading ? "opacity-50 pointer-events-none" : ""}`}
    >
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-900">
          <TableRow className="border-b border-gray-200 dark:border-gray-800">
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                className={`py-3 px-4 text-left font-bold text-sm text-primaryT font-sans dark:text-gray-300 ${
                  column.width ? `w-${column.width}` : ""
                } ${column.className || ""}`}
                onClick={() =>
                  column.sortable !== false &&
                  sortable &&
                  handleSort(column.key)
                }
              >
                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">
                  <span>{column.label}</span>
                  {column.sortable !== false && sortable && (
                    <SortIcon columnKey={column.key} />
                  )}
                </div>
              </TableHead>
            ))}
            {actions.length > 0 && (
              <TableHead className="py-3 px-4 text-center font-semibold text-gray-700 dark:text-gray-300 w-12">
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isEmpty ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                className="py-16 text-center text-gray-500"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={`border-b border-gray-200 dark:border-gray-800 transition-colors ${
                  striped && rowIndex % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-900/30"
                    : "bg-white dark:bg-transparent"
                } ${hoverable ? "hover:bg-gray-100 dark:hover:bg-gray-800" : ""} ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    className={`py-4 px-4 text-primaryT text-sm font-sans dark:text-gray-300 ${column.className || ""}`}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] ?? "")}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell className="py-4 px-4 text-center font-sans">
                    {renderActions(row)}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-b-xl">
          <div className="w-6 h-6 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ── Desktop ── */}
      <Card className="hidden md:block w-full overflow-x-auto px-[25px]">
        {title && (
          <h2 className="text-xl font-medium font-sans mb-4 text-primaryT dark:text-gray-50">
            {title}
          </h2>
        )}

        {tableContent}

        {pagination && onPageChange && (
          <PaginationBar
            meta={pagination}
            onPageChange={onPageChange}
            loading={loading}
          />
        )}
      </Card>

      {/* ── Mobile Card View ── */}
      <Card className="md:hidden w-full space-y-4 px-[25px]">
        {title && (
          <h2 className="text-xl font-medium font-sans mb-6 text-primaryT dark:text-gray-50">
            {title}
          </h2>
        )}

        {/* Mobile total count */}
        {pagination && (
          <p className="text-sm text-gray-500 dark:text-gray-400 pb-1">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {pagination.total.toLocaleString()}
            </span>{" "}
            total results
          </p>
        )}

        {isEmpty ? (
          <div className="py-16 text-center text-gray-500">{emptyMessage}</div>
        ) : (
          sortedData.map((row, rowIndex) => (
            <Card
              key={rowIndex}
              className={`cursor-pointer transition-all hover:shadow-lg ${onRowClick ? "active:scale-95" : ""}`}
              onClick={() => onRowClick?.(row)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-sans">
                  {columns[0]?.render
                    ? columns[0].render(row[columns[0].key], row)
                    : String(row[columns[0]?.key] ?? "")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {columns.slice(1).map((column) => (
                  <div
                    key={String(column.key)}
                    className="flex justify-between items-center gap-2"
                  >
                    <span className="text-sm font-medium text-[#64748B] dark:text-gray-400">
                      {column.label}
                    </span>
                    <span className="text-sm text-primaryT dark:text-gray-100 font-semibold text-right">
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] ?? "")}
                    </span>
                  </div>
                ))}

                {actions.length > 0 && (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex gap-2 items-center flex-wrap">
                    {visibleActions(row).map((action, idx) => (
                      <Button
                        key={idx}
                        size="sm"
                        variant={action.variant || "default"}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(row);
                        }}
                        className="flex-1"
                      >
                        {action.icon && (
                          <span className="mr-2">{action.icon}</span>
                        )}
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}

        {/* Mobile pagination */}
        {pagination && onPageChange && (
          <PaginationBar
            meta={pagination}
            onPageChange={onPageChange}
            loading={loading}
          />
        )}
      </Card>
    </>
  );
}
