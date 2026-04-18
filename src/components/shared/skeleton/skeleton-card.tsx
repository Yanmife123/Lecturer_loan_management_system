import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function SmallSkeletonCard() {
  return (
    <Card className="border-1 border-[#1B2E5E1A] bg-[#FFFFFF] py-[25px] w-full max-w-xs">
      <CardHeader className="">
        <Skeleton className="h-7 w-3/4" />
      </CardHeader>
      <CardContent className="">
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
