import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableSkeleton() {
  return (
    <Card className="w-full overflow-x-auto px-[25px] py-4">
      {/* Title skeleton */}
      <Skeleton className="h-5 w-48 mb-4" />

      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-900">
          <TableRow className="border-b border-gray-200 dark:border-gray-800">
            {/* Match your column widths */}
            <TableHead className="py-3 px-4">
              <Skeleton className="h-4 w-28" />
            </TableHead>
            <TableHead className="py-3 px-4">
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead className="py-3 px-4">
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead className="py-3 px-4">
              <Skeleton className="h-4 w-10" />
            </TableHead>
            <TableHead className="py-3 px-4">
              <Skeleton className="h-4 w-14" />
            </TableHead>
            <TableHead className="py-3 px-4">
              <Skeleton className="h-4 w-12" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableRow
              key={i}
              className={`border-b border-gray-200 dark:border-gray-800 ${
                i % 2 === 0
                  ? "bg-gray-50 dark:bg-gray-900/30"
                  : "bg-white dark:bg-transparent"
              }`}
            >
              <TableCell className="py-4 px-4">
                <Skeleton className="h-4 w-36" />
              </TableCell>
              <TableCell className="py-4 px-4">
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="py-4 px-4">
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell className="py-4 px-4">
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="py-4 px-4">
                <Skeleton className="h-4 w-20" />
              </TableCell>
              {/* Badge-shaped skeleton for Status */}
              <TableCell className="py-4 px-4">
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
