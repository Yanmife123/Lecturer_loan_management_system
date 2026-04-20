"use client";
import { useUser } from "@/lib/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
export function Banner() {
  const { user, loading } = useUser();
  return (
    <div className="md:p-6 p-4 rounded-[16px] w-full bg-linear-to-r from-[#1B2E5E] to-[rgba(27,46,94,0.8)] font-sans space-y-2">
      <h2 className="text-white md:text-3xl sm:text-2xl text-xl leading-9 font-medium">
        {!loading ? (
          user && `   Welcome back, ${user.prefix} ${user.surname}!`
        ) : (
          <Skeleton className="w-64 h-8" />
        )}
      </h2>
      <p className="text-[#FFFFFFE5] leading-6 md:text-base text-sm ">
        Here's an overview of your cooperative account
      </p>
    </div>
  );
}
