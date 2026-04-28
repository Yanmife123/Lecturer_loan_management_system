"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
// import { MemberSearch } from "./MemberSearch";
// import { LoanCard } from "./LoanCard";
// import { MemberLoan, MemberSuggestionSingle, Schedule } from "./types";
import { MemberSearch } from "./MemberSearch";
import { LoanCard } from "./LoanCard";
import { ActiveLoanResponse, MemberSuggestionSingle, Schedule } from "./types";
import { MemberLoan as fetchMemberLoan } from "@/lib/api/loan/repayments";

export function SearchSection() {
  const [memberLoan, setMemberLoan] = useState<ActiveLoanResponse | null>(null);

  const loanMutation = useMutation({
    mutationFn: fetchMemberLoan,
    onSuccess: (data) => setMemberLoan(data),
  });

  function handleSelectMember(member: MemberSuggestionSingle) {
    loanMutation.mutate(member.membership_no);
  }

  function handleSelectSchedule(schedule: Schedule) {
    // handle payment posting here
  }

  return (
    <div className="space-y-6">
      <MemberSearch onSelectMember={handleSelectMember} />

      {loanMutation.isPending && (
        <p className="text-sm text-muted-foreground">Loading loan details...</p>
      )}
      {loanMutation.isError && (
        <p className="text-sm text-destructive">
          {(loanMutation.error as any)?.response?.data?.message ??
            "Failed to load loan."}
        </p>
      )}
      {memberLoan && (
        <LoanCard
          memberLoan={memberLoan.data}
          onSelectSchedule={handleSelectSchedule}
        />
      )}
    </div>
  );
}
