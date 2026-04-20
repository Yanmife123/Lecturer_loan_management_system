"use client";
import { useUser } from "@/lib/hooks/useUser";
import { SmallSkeletonCard } from "@/components/shared/skeleton/skeleton-card";
import { LoansComponent } from "@/components/pages/dashboard/loans/allLoanComponents";

export function CheckingEligiblityLoan() {
  const { loading, user } = useUser();

  return (
    <div>
      {loading ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <SmallSkeletonCard />
          <SmallSkeletonCard />
          <SmallSkeletonCard />
          <SmallSkeletonCard />
          <SmallSkeletonCard />
          <SmallSkeletonCard />
        </div>
      ) : user ? (
        user.is_loan_eligible ? (
          <LoansComponent />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-6 font-sans">
            {/* Icon */}
            <div className="w-18 h-18 rounded-full bg-amber-50 flex items-center justify-center p-4">
              <svg
                className="w-9 h-9 text-amber-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z" />
              </svg>
            </div>

            {/* Title & description */}
            <div className="flex flex-col gap-2 max-w-md">
              <h2 className="text-lg font-medium text-primaryT">
                Not eligible for a loan
              </h2>
              <p className="text-sm text-[#1B2E5E] leading-relaxed">
                You need to have been an active member for at least{" "}
                <span className="font-medium text-gray-700">6 months</span>{" "}
                before you can request a loan.
              </p>
            </div>

            {/* Info banner */}
            <div className="bg-[#FAEEDA] border border-[#EF9F27] rounded-xl px-5 py-4 max-w-md w-full flex gap-3 items-start text-left">
              <svg
                className="w-4 h-4 text-amber-700 mt-0.5 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z" />
              </svg>
              <p className="text-xs text-amber-900 leading-relaxed">
                Your membership duration is reviewed automatically. Once you've
                met the 6-month requirement, loan options will become available
                to you.
              </p>
            </div>
          </div>
        )
      ) : (
        <div className="text-center p-4 text-primaryT">
          Please log in to check your loan eligibility.
        </div>
      )}
    </div>
  );
}
