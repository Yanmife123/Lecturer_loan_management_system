import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function InfoFieldSkeleton({
  labelWidth = "w-24",
  valueWidth = "w-40",
}: {
  labelWidth?: string;
  valueWidth?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Skeleton className={`h-3.5 ${labelWidth}`} />
      <Skeleton className={`h-5 ${valueWidth}`} />
    </div>
  );
}

export default function ProfileInfoSkeleton() {
  return (
    <Card className="p-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-8 w-28 rounded-md" />
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        {/* Left Column */}
        <div className="space-y-6">
          <InfoFieldSkeleton labelWidth="w-12" valueWidth="w-10" />
          <InfoFieldSkeleton labelWidth="w-14" valueWidth="w-16" />
          <InfoFieldSkeleton labelWidth="w-24" valueWidth="w-20" />
          <InfoFieldSkeleton labelWidth="w-28" valueWidth="w-56" />
          <InfoFieldSkeleton labelWidth="w-20" valueWidth="w-24" />
          <InfoFieldSkeleton labelWidth="w-40" valueWidth="w-28" />
          <InfoFieldSkeleton labelWidth="w-36" valueWidth="w-52" />
          <InfoFieldSkeleton labelWidth="w-40" valueWidth="w-48" />
          <InfoFieldSkeleton labelWidth="w-24" valueWidth="w-44" />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <InfoFieldSkeleton labelWidth="w-20" valueWidth="w-36" />
          <InfoFieldSkeleton labelWidth="w-24" valueWidth="w-24" />
          <InfoFieldSkeleton labelWidth="w-16" valueWidth="w-44" />
          <InfoFieldSkeleton labelWidth="w-36" valueWidth="w-28" />
          <InfoFieldSkeleton labelWidth="w-20" valueWidth="w-28" />
          <InfoFieldSkeleton labelWidth="w-36" valueWidth="w-36" />
        </div>
      </div>
    </Card>
  );
}
