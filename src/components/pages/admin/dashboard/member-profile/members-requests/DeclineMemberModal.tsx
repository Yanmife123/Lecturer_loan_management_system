"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { XCircle } from "lucide-react";
import { Modal, ConfirmModal } from "@/components/shared/Modal";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DeclineFormValues {
  reason: string;
}

interface DeclineMemberModalProps {
  open: boolean;
  onClose: () => void;
  // memberName: string;
  // memberId: string | number;
  // onDecline: (reason: string) => Promise<void>;
}

export function DeclineMemberModal({
  open,
  onClose,
  // memberName,
  // onDecline,
}: DeclineMemberModalProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingReason, setPendingReason] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeclineFormValues>();

  // Step 1 — validate, open confirm dialog
  const onSubmit = (data: DeclineFormValues) => {
    setPendingReason(data.reason);
    setConfirmOpen(true);
  };

  // Step 2 — confirmed, run action
  const handleConfirm = async () => {
    setLoading(true);
    try {
      // await onDecline(pendingReason);
      console.log(pendingReason);
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
        size="sm"
        title="Decline Membership"
        description={`Provide a reason for declining 's request`}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-foreground font-medium">
              Reason for Declining
            </Label>
            <Textarea
              id="reason"
              placeholder="Explain why this membership request is being declined..."
              rows={4}
              className="resize-none bg-background border-input focus:border-primary transition-colors"
              {...register("reason", {
                required: "Please provide a reason for declining",
                minLength: {
                  value: 10,
                  message: "Reason must be at least 10 characters",
                },
              })}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <XCircle size={16} />
              Decline Request
            </button>
          </div>
        </form>
      </Modal>

      {/* Step 2: Confirmation */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Decline"
        description={`Are you sure you want to decline 's membership request? They will be notified with your reason.`}
        confirmLabel="Yes, Decline"
        confirmVariant="danger"
        loading={loading}
      />
    </>
  );
}
