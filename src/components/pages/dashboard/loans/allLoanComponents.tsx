"use client";
import { useQuery } from "@tanstack/react-query";
import { allLoanType, LoanTypeArrary } from "@/lib/api/loan/all_loan_type";
import { SmallSkeletonCard } from "@/components/shared/skeleton/skeleton-card";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function LoansComponent() {
  const {
    data: LoanTypes,
    isLoading,
    error,
    isSuccess,
  } = useQuery<LoanTypeArrary>({
    queryKey: ["loanTypes"],
    queryFn: allLoanType,
  });
  return (
    <div className="font-sans space-y-6 max-w-7xl">
      <div className="space-y-3">
        <h1 className="text-primaryT font-medium text-[30px] leading-9">
          Apply for Loan
        </h1>
        <p className="text-[#64748B] leading-7 text-base">
          Select your loan type to begin{" "}
        </p>
      </div>

      {isLoading ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <SmallSkeletonCard />
          <SmallSkeletonCard />
          <SmallSkeletonCard />
          <SmallSkeletonCard />
          <SmallSkeletonCard />
          <SmallSkeletonCard />
        </div>
      ) : error ? (
        <p>Error loading loan types.</p>
      ) : LoanTypes ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {LoanTypes.data.map((loan) => (
            <Card
              key={loan.id}
              className="border-1 border-[#1B2E5E1A] bg-[#FFFFFF] py-[25px]"
            >
              <CardHeader className="">
                <h2 className="text-lg font-medium leading-7 text-primaryT">
                  {loan.name}
                </h2>
              </CardHeader>
              <CardContent className="">
                <div className="flex justify-between gap-5 items-center">
                  <p className="text-sm text-[#64748B] leading-5 font-medium">
                    Max Amount:
                  </p>
                  <p className="text-primaryT text-sm leading-5 font-medium">
                    {loan.max_amount ?? "No maximum Amount"}
                  </p>
                </div>
                <div className="flex justify-between gap-5 items-center">
                  <p className="text-sm text-[#64748B] leading-5 font-medium">
                    Period:
                  </p>
                  <p className="text-primaryT text-sm leading-5 font-medium">
                    {loan.max_duration_months} months
                  </p>
                </div>
                <div className="flex justify-between gap-5 items-center">
                  <p className="text-sm text-[#64748B] leading-5 font-medium">
                    Interest Rate:
                  </p>
                  <p className="text-primaryT text-sm leading-5 font-medium">
                    {parseInt(loan.interest_rate) +
                      "%" +
                      " " +
                      loan.interest_type}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="bg-white border-none">
                <Link
                  href={`/dashboard/loans/${loan.id}`}
                  className="text-[#C89B2A] text-sm leading-5 font-medium flex items-center gap-1"
                >
                  Apply{" "}
                  <div className="flex items-center mt-1">
                    <ArrowRight className="w-[14px] h-[14px]" />
                  </div>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div>No data</div>
      )}
    </div>
  );
}
