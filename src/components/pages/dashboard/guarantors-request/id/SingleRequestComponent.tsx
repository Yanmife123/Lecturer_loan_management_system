"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  singleGuarantorRequest,
  GuarantorAccept,
  GuarantorDecline,
} from "@/lib/api/loan/gaurantor";
import { ConfirmModal } from "@/components/shared/Modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LoanApplicationResponse } from "@/lib/type/loanapplicaton";
import { LoanApplicationSkeleton } from "@/components/shared/skeleton/skeleton-card";
import { formatDate } from "@/components/utility/functions/data-fn";
import { useState } from "react";
import { toast } from "sonner";

interface SingleGuarantor {
  data: LoanApplicationResponse;
}

export function GuarantorRequestDetails({ id }: { id: string }) {
  const [acceptModal, setAcceptModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const queryClient = useQueryClient();
  const {
    data: Request,
    isPending,
    isSuccess,
    error,
  } = useQuery<SingleGuarantor>({
    queryKey: ["SingleGuarantor", id],
    queryFn: () => singleGuarantorRequest(id),
  });

  const getStatusDetails = (status: number | boolean | null | undefined) => {
    // Check for Accepted (1 or true)
    if (status === 1 || status === true) {
      return {
        label: "Accepted",
        classes: "bg-green-100 text-green-700 border-green-200",
      };
    }

    // Check for Declined (0 or false)
    // We use !== null because 0 is falsy, but so is null. We want to distinguish them.
    if (status === 0 || status === false) {
      return {
        label: "Declined",
        classes: "bg-red-100 text-red-700 border-red-200",
      };
    }

    // Fallback for null or undefined
    return {
      label: "Pending",
      classes: "bg-amber-100 text-amber-700 border-amber-200",
    };
  };

  // Usage

  const statusDetails = getStatusDetails(Request?.data.guarantor_approval); // Replace with your actual variable
  const acceptMutation = useMutation({
    mutationFn: GuarantorAccept,
    onSuccess: (data) => {
      toast.success("Guarantor Request Accepted");
      setAcceptModal(false);
      queryClient.invalidateQueries({ queryKey: ["SingleGuarantor", id] });
    },
    onError: (error) => {
      toast.error("Failed to Accept Guarantor Request", {
        description: error.message,
      });
    },
  });
  const declineMutation = useMutation({
    mutationFn: GuarantorDecline,
    onSuccess: (data) => {
      toast.success("Guarantor Request Declined");
      setDeclineModal(false);
      queryClient.invalidateQueries({ queryKey: ["SingleGuarantor", id] });
    },
    onError: (error) => {
      toast.error("Failed to Decline Guarantor Request", {
        description: error.message,
      });
    },
  });

  const handleAccept = () => {
    acceptMutation.mutate(id);
  };
  const handleDecline = () => {
    declineMutation.mutate(id);
  };
  // const amount: number = Request?.data?.amount ?? Infinity;

  return (
    <div className="">
      {isPending && <LoanApplicationSkeleton />}
      {!isPending && isSuccess && Request && (
        <div className="space-y-6 max-w-3xl mx-auto font-sans">
          <Card className="p-6 space-y-3">
            <div className="flex gap-3 items-center">
              <div>
                <Image
                  src={"/logo.svg"}
                  alt="Logo icon"
                  height={55}
                  width={55}
                />
              </div>
              <div className="">
                <p className="text-primaryT font-sans text-base leading-6">
                  Redeemer's University
                </p>
                <p className="text-[#64748B] text-xs font-normal font-sans leading-4">
                  Staff Cooperative Multipurpose Society Ltd
                </p>
              </div>
            </div>
            <hr className="border-[#1B2E5E1A]" />
            <div>
              <h1 className="text-primaryT font-medium text-lg leading-7">
                Loan Guarantor Consent Request
              </h1>
              <p className="text-[#64748B] text-sm leading-5">
                You have been nominated as a guarantor for a loan application.
                Please review the details below before responding.
              </p>
            </div>
          </Card>
          <Card className="p-6 space-y-3">
            <div>
              <h3 className="text-[#64748B] text-xs leading-4 ">
                Borrower Details
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <h4 className="text-[#64748B] text-xs leading-4">
                  Prefix + Full Name
                </h4>
                <p className="text-primaryT text-base leading-6">
                  {Request.data.user.prefix +
                    " " +
                    Request.data.user.surname +
                    " " +
                    Request.data.user.other_names}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#64748B] text-xs leading-4">Staff ID</h4>
                  <p className="text-primaryT text-base leading-6">
                    {/* {Request.data.user.} */}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#64748B] text-xs leading-4">Faculty</h4>
                  <p className="text-primaryT text-base leading-6">
                    {Request.data.user.member_info.faculty}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#64748B] text-xs leading-4">
                    Department/Unit
                  </h4>
                  <p className="text-primaryT text-base leading-6">
                    {Request.data.user.member_info.department}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#64748B] text-xs leading-4">
                    Present Designation
                  </h4>
                  <p className="text-primaryT text-base leading-6">
                    {Request.data.user.member_info.designation}
                  </p>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-6 space-y-3">
            <div>
              <h3 className="text-[#64748B] text-xs leading-4 ">
                Loan Details
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#64748B] text-xs leading-4">
                    {" "}
                    Loan Type
                  </h4>
                  <p className="text-primaryT text-base leading-6">
                    {Request.data.loan_type.name}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#64748B] text-xs leading-4">
                    Amount in Figures
                  </h4>
                  <p className="text-primaryT text-base leading-6">
                    ₦
                    {Number(Request.data.amount).toLocaleString("en-NG", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
              {/* <div className="flex flex-col gap-4">
                <h4 className="text-[#64748B] text-xs leading-4">
                  Amount in Words
                </h4>
                <p className="text-primaryT text-base leading-6">
                  Five Hundred Thousand Naira Only
                </p>
              </div> */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#64748B] text-xs leading-4">
                    {" "}
                    Repayment Period
                  </h4>
                  <p className="text-primaryT text-base leading-6">
                    {Request.data.duration_month} months
                  </p>
                </div>
                {/* <div className="flex flex-col gap-4">
                  <h4 className="text-[#64748B] text-xs leading-4">
                    Monthly Deduction
                  </h4>
                  <p className="text-primaryT text-base leading-6">
                    ₦22,917.00
                  </p>
                </div> */}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#64748B] text-xs leading-4">
                    {" "}
                    Interest Rate
                  </h4>
                  <p className="text-primaryT text-base leading-6">
                    {Request.data.loan_type.interest_rate}%{" "}
                    {Request.data.loan_type.interest_type}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#64748B] text-xs leading-4">
                    Application Date
                  </h4>
                  <p className="text-primaryT text-base leading-6">
                    {formatDate(Request.data.created_at, "full")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#64748B] text-xs leading-4">
                    {" "}
                    Guarantor Accept Status
                  </h4>
                  <div className="flex">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusDetails.classes}`}
                    >
                      {statusDetails.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <div className="bg-[#FAEEDA] p-6 border border-[#EF9F27] rounded-[1rem] space-y-3">
            <div className="flex gap-3 items-center">
              <div className="p-1 rounded-full bg-[#EF9F27]">
                <AlertCircle className="w-[13px] h-[13px] text-[#fff]" />
              </div>
              <div className="text-[#633806] font-semibold text-lg leading-6">
                Important Legal Notice
              </div>
            </div>
            <p className="text-[#633806] text-sm leading-5">
              By accepting this request, you agree to serve as a guarantor for
              the loan detailed above. If the borrower defaults on repayment, is
              expelled, or resigns from Redeemer's University, you will be held
              fully liable for the total outstanding principal and interest.
              Your monthly salary may be subject to deduction to recover the
              outstanding balance.
            </p>
          </div>
          {Request.data.guarantor_approval === null && (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              <Button
                variant={"default"}
                size={"lg"}
                onClick={() => setAcceptModal(true)}
                className="w-full bg-[#2E7D32] hover:bg-[#2E7D32]   duration-300 shadow-sm h-[58px] text-medium leading-5 border-none rounded-[16px] text-white cursor-pointer"
              >
                I Accept – Serve as Guarantor
              </Button>
              <Button
                variant={"default"}
                size={"lg"}
                onClick={() => setDeclineModal(true)}
                className="w-full bg-transparent  border border-[#A32D2D] duration-300 shadow-sm h-[58px] text-medium leading-5 rounded-[16px] text-[#A32D2D] cursor-pointer"
              >
                I Decline This Request
              </Button>
            </div>
          )}
        </div>
      )}
      {!isPending && error && <div>{error?.message}</div>}
      <ConfirmModal
        open={acceptModal}
        onClose={() => setAcceptModal(false)}
        onConfirm={handleAccept}
        title="Confirm Guarantor Approval"
        description={`Are you sure you want to accept ${Request?.data.user.prefix} ${Request?.data.user.surname} ${Request?.data.user.other_names} request to be his/her guarantor? This action cannot be undone.`}
        confirmLabel="Yes, Accept"
        confirmVariant="success"
        loading={acceptMutation.isPending}
      />
      <ConfirmModal
        open={declineModal}
        onClose={() => setDeclineModal(false)}
        onConfirm={handleDecline}
        title="Confirm Guarantor Decline"
        description={`Are you sure you want to decline ${Request?.data.user.prefix} ${Request?.data.user.surname} ${Request?.data.user.other_names} request to be his/her guarantor? This action cannot be undone.`}
        confirmLabel="Yes, Decline"
        confirmVariant="danger"
        loading={declineMutation.isPending}
      />
    </div>
  );
}
