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
          <div>
            <div className="text-center p-4 text-primaryT">
              You are not eligible for a loan at this time.
            </div>
            <p>
              You need to have been a member for at least 6 months before you
              can be eligible to request a loan.
            </p>
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
