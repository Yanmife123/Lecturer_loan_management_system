"use client";

import { Card } from "@/components/ui/card";
import { EmploymentInfos } from "./employment-infos";
import ProfileInfo from "./profile-info";
// import NextOfKin from "./next-of-kin";
import ProfileSidebar from "./profile-sidebar";
import { TrendingUp, Wallet } from "lucide-react";
// import Link from "next/link";
import GuarantorInfo from "./guarantor-info";
import ProfileInfoSkeleton from "@/components/shared/skeleton/profile/profile-info-skeleton";
import {
  GenSecApprove,
  PresidentApprove,
  SingleRequest,
} from "@/lib/api/loan/adminLoans";
// import { LoanApplication } from "@/lib/type/admin/dashboard/loan-requests/pendingRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoanInfo from "./loan-detals";
// import { formatDate } from "@/components/utility/functions/data-fn";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { ConfirmModal } from "@/components/shared/Modal";
import { useState } from "react";
import { useRole } from "@/lib/hooks/useRole";

export default function AdminLoanRequestReviewsExecutiveProfile({
  id,
}: {
  id: string;
}) {
  const [openPreApprove, setOpenPreApprove] = useState(false);
  const [openGenApprove, setOpenGenApprove] = useState(false);
  const queryClient = useQueryClient();
  const { hasRole } = useRole();
  const {
    data: Data,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["SingleReviewsRequest", id],
    queryFn: () => SingleRequest(id),
  });

  const acceptRequest = useMutation({
    mutationFn: PresidentApprove,
    onSuccess: (data) => {
      toast.success("Approved Sucessfully");
      setOpenGenApprove(false);
      queryClient.invalidateQueries({
        queryKey: ["SingleReviewsERequest", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["LoanRequestsReviewsExcutives"],
      });
    },
    onError: (error) => {
      toast.error("Failed to Approve application", {
        description: error.message,
      });
    },
  });

  const genSecApprove = useMutation({
    mutationFn: GenSecApprove,
    onSuccess: (data) => {
      toast.success("Approved Sucessfully");
      setOpenGenApprove(false);
      queryClient.invalidateQueries({ queryKey: ["SingleReviewsRequest", id] });
      queryClient.invalidateQueries({ queryKey: ["LoanRequestsReviews"] });
    },
    onError: (error) => {
      toast.error("Failed to Approve application", {
        description: error.message,
      });
    },
  });
  const PresidenthandleConfirm = () => {
    acceptRequest.mutate(id);
    // console.log("Clicking");
  };
  const GenhandleConfirm = () => {
    genSecApprove.mutate(id);
    // console.log("Clicking");
  };
  return (
    <div className="min-h-screen bg-transparent">
      {isLoading && <ProfileInfoSkeleton />}
      {isSuccess ? (
        Data && (
          <div className="space-y-6">
            <main className="flex gap-8  p-0 max-w-7xl mx-auto lg:flex-row flex-col max-lg:items-center">
              {/* Sidebar */}
              <div className="space-y-8">
                <ProfileSidebar data={Data.data} />

                <LoanInfo data={Data.data} />
              </div>

              {/* Main Content */}
              <div className="flex-1 space-y-6">
                <ProfileInfo data={Data.data} />
                <EmploymentInfos data={Data.data} />
                <GuarantorInfo data={Data.data} />
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="py-8 px-5 font-sans space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 flex justify-center items-center rounded-[12px] bg-[#C89B2A1A]">
                        <Wallet color="#C89B2A" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B] leading-5">
                          {Data.data.user.prefix} {Data.data.user.surname} Total
                          Savings
                        </p>
                        <p className="text-xl font-normal text-[#1B2E5E]  leading-7">
                          ₦{" "}
                          {Number(
                            Data.data.user.membership_detail?.total_saving,
                          ).toLocaleString("en-NG", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card className="py-8 px-5 font-sans space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 flex justify-center items-center rounded-[12px] bg-[#C89B2A1A]">
                        <Wallet color="#1B2E5E" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B] leading-5">
                          {Data.data.user.prefix} {Data.data.user.surname} Total
                          Oustanding Loan Balance
                        </p>
                        <p className="text-xl font-normal text-[#1B2E5E]  leading-7">
                          ₦{" "}
                          {Number(
                            Data.data.user.membership_detail
                              ?.total_oustanding_loan,
                          ).toLocaleString("en-NG", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
                {hasRole("admin", "president") &&
                  Data.data.status === "reviewed" &&
                  !Data.data.loan_approval.president_id && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <Button
                        onClick={() => {
                          setOpenPreApprove(true);
                        }}
                      >
                        Approve this Request For President
                      </Button>
                      <Button variant={"destructive"}>
                        Decline this Request For President
                      </Button>
                    </div>
                  )}
                {hasRole("admin", "gen_secretary") &&
                  Data.data.status === "reviewed" &&
                  !Data.data.loan_approval.secretary_id && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <Button
                        onClick={() => {
                          setOpenGenApprove(true);
                        }}
                      >
                        Approve this Request For Gen_Sec
                      </Button>
                      <Button variant={"destructive"}>
                        Decline this Request For Gen_Sec
                      </Button>
                    </div>
                  )}
              </div>
            </main>
            <ConfirmModal
              title="Confirm Approval For President"
              confirmVariant="success"
              open={openPreApprove}
              onClose={() => setOpenPreApprove(false)}
              description={`Are you sure you want to approve ${Data.data.user.prefix} ${Data.data.user.surname}  ${Data.data.name}?. This action cannot be undone.`}
              confirmLabel="Yes, Approve"
              onConfirm={PresidenthandleConfirm}
              loading={acceptRequest.isPending}
            />
            <ConfirmModal
              title="Confirm Approval For General Secretary"
              confirmVariant="success"
              open={openGenApprove}
              onClose={() => setOpenGenApprove(false)}
              description={`Are you sure you want to approve ${Data.data.user.prefix} ${Data.data.user.surname}  ${Data.data.name}?. This action cannot be undone.`}
              confirmLabel="Yes, Approve"
              onConfirm={GenhandleConfirm}
              loading={genSecApprove.isPending}
            />
          </div>
        )
      ) : (
        <div>{error?.message}</div>
      )}
    </div>
  );
}
