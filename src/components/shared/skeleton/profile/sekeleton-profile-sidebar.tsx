import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSidebarSkeleton() {
  return (
    <div className="md:w-[435px] w-full max-w-3xl font-sans">
      <Card className="p-6 space-y-3">
        {/* Avatar Section */}
        <div className="flex justify-center border-b pb-4 border-[#1B2E5E1A]">
          <div className="relative">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="absolute bottom-2 right-2 h-8 w-8 rounded-full" />
          </div>
        </div>

        {/* Membership Info */}
        <div className="space-y-4 text-sm text-center">
          <div className="border-b border-[#1B2E5E1A] pb-3 flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-6 w-44" />
          </div>

          <div className="border-b border-[#1B2E5E1A] py-3 flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="border-b border-[#1B2E5E1A] py-3 flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      </Card>
    </div>
  );
}
