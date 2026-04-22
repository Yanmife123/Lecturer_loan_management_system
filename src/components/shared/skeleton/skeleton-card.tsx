import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// ─── Small Skeleton Card (original + enhanced) ───────────────────────────────

export function SmallSkeletonCard() {
  return (
    <Card className="border border-[#1B2E5E1A] bg-white py-[25px] w-full max-w-xs">
      <CardHeader>
        <Skeleton className="h-7 w-3/4" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-5 items-center mb-4">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-5 w-1/3" />
        </div>
        <div className="flex justify-between gap-5 items-center mb-4">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-5 w-1/3" />
        </div>
        <div className="flex justify-between gap-5 items-center">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-5 w-1/3" />
        </div>
      </CardContent>
      <CardFooter className="bg-white border-none">
        <Skeleton className="h-5 w-16" />
      </CardFooter>
    </Card>
  );
}

// ─── Loan Application Form Skeleton ──────────────────────────────────────────

export function LoanApplicationSkeleton() {
  return (
    <div className="flex flex-col gap-5 p-6 max-w-xl w-full">
      {/* Back + Title */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-14" />
      </div>

      <div>
        <Skeleton className="h-7 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Step Indicator */}
      <div className="bg-gray-50 border border-[#1B2E5E1A] rounded-xl p-4 flex items-center justify-between">
        {[1, 2, 3, 4, 5].map((step, i) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i === 0 ? "bg-[#1B2E5E]" : "border border-gray-300"
                }`}
              >
                {i === 0 ? (
                  <span className="text-white text-xs font-medium">1</span>
                ) : (
                  <Skeleton className="w-3 h-3 rounded-full" />
                )}
              </div>
              <Skeleton className="h-2.5 w-12" />
            </div>
            {i < 4 && <Skeleton className="flex-1 h-0.5 mx-1 mb-3" />}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <Card className="border border-[#1B2E5E1A] bg-white p-5">
        <Skeleton className="h-5 w-2/5 mb-5" />

        <div className="flex flex-col gap-4">
          <div>
            <Skeleton className="h-3.5 w-2/5 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="h-3.5 w-1/2 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="h-3.5 w-1/3 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="flex gap-3 mt-1">
            <Skeleton className="flex-1 h-10 rounded-md" />
            <Skeleton className="w-28 h-10 rounded-md" />
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Dashboard Skeleton ───────────────────────────────────────────────────────

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6 w-full">
      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border border-[#1B2E5E1A] bg-white p-4">
            <Skeleton className="h-3 w-3/5 mb-3" />
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-2.5 w-2/5" />
          </Card>
        ))}
      </div>

      {/* Chart + SmallSkeletonCard */}
      <div className="grid grid-cols-5 gap-3">
        {/* Bar Chart */}
        <Card className="col-span-3 border border-[#1B2E5E1A] bg-white p-5">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-1/5" />
          </div>
          <div className="flex items-end gap-2 h-28 px-1">
            {[55, 75, 45, 90, 60, 80, 50].map((h, i) => (
              <Skeleton
                key={i}
                className="flex-1 rounded-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-2.5 w-5" />
            ))}
          </div>
        </Card>

        {/* Small Skeleton Card */}
        <div className="col-span-2">
          <SmallSkeletonCard />
        </div>
      </div>

      {/* Loan History Table */}
      <Card className="border border-[#1B2E5E1A] bg-white p-5">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/6" />
        </div>

        {/* Table Header */}
        <div className="flex justify-between pb-2 border-b border-[#1B2E5E1A] mb-3">
          {["w-1/5", "w-1/4", "w-1/6", "w-1/7"].map((w, i) => (
            <Skeleton key={i} className={`h-3 ${w}`} />
          ))}
        </div>

        {/* Table Rows */}
        <div className="flex flex-col gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-3.5 w-1/5" />
              <Skeleton className="h-3.5 w-1/4" />
              <Skeleton className="h-3.5 w-1/6" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Combined Page Skeleton (form + dashboard side by side) ──────────────────

export function LoanPageSkeleton() {
  return (
    <div className="grid grid-cols-[1fr_1.8fr] gap-5 p-6 min-h-screen">
      <LoanApplicationSkeleton />
      <DashboardSkeleton />
    </div>
  );
}
