"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import { Modal, ConfirmModal } from "@/components/shared/Modal";
import { CustomInput } from "@/components/utility/form/custom-input";

export interface ApproveFormValues {
  membership_no: string;
  effective_date_of_membership: Date;
  total_oustanding_loan: number;
  total_saving: number;
}

interface ApproveMemberModalProps {
  open: boolean;
  onClose: () => void;
  memberName: string;
  memberId: string | number;
  onApprove: (payload: {
    id: string;
    data: ApproveFormValues;
  }) => Promise<void>;
}

export function ApproveMemberModal({
  open,
  onClose,
  memberName,
  onApprove,
  memberId,
}: ApproveMemberModalProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingData, setPendingData] = useState<ApproveFormValues | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApproveFormValues>();

  // Step 1 — validate form, open confirm dialog
  const onSubmit = (data: ApproveFormValues) => {
    setPendingData(data);
    setConfirmOpen(true);
  };

  // Step 2 — user confirmed, run the actual action
  const handleConfirm = async () => {
    if (!pendingData) return;
    setLoading(true);
    try {
      await onApprove({
        id: memberId.toString(),
        data: pendingData,
      });
      console.log(pendingData);
      setConfirmOpen(false);
      reset();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        size="md"
        title="Approve Membership"
        description={`Fill in the membership details for ${memberName}`}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CustomInput
            label="Membership Number"
            inputname="membership_no"
            type="text"
            placeholder="e.g. RCS-2024-001"
            register={register}
            error={errors.membership_no?.message}
          />

          <CustomInput
            label="Effective Date of Membership"
            inputname="effective_date_of_membership"
            type="date"
            register={register}
            error={errors.effective_date_of_membership?.message}
          />

          <CustomInput
            label="Total Outstanding Loan (₦)"
            inputname="total_oustanding_loan"
            type="number"
            placeholder="0.00"
            step="0.01"
            register={register}
            error={errors.total_oustanding_loan?.message}
          />

          <CustomInput
            label="Total Saving (₦)"
            inputname="total_saving"
            type="number"
            placeholder="0.00"
            step="0.01"
            register={register}
            error={errors.total_saving?.message}
          />

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-[#F5A623] hover:bg-[#e09510] text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle size={16} />
              Approve Member
            </button>
          </div>
        </form>
      </Modal>

      {/* Step 2: Confirmation dialog */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Approval"
        description={`Are you sure you want to approve ${memberName}  as a member? This action cannot be undone.`}
        confirmLabel="Yes, Approve"
        confirmVariant="success"
        loading={loading}
      />
    </>
  );
}
