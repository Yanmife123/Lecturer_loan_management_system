import { Modal } from "@/components/shared/Modal";
import { useMutation } from "@tanstack/react-query";
import { SelectInput } from "@/components/utility/form/custom-select";
import { changeMemberRole } from "@/lib/api/member/changeRole";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

interface Role {
  role: string;
}

export function ChangeRoleModal({
  memberId,
  isOpen,
  onClose,
  memberName,
}: {
  memberId: string;
  isOpen: boolean;
  memberName?: string;
  onClose: () => void;
}) {
  //   const [selectedRole, setSelectedRole] = useState<string>("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (role: string) => changeMemberRole({ memberId, role }),
    onSuccess: () => {
      toast.success("Member role changed successfully!");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["memberProfile", memberId] }); // Invalidate member profile query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["allActiveMembers"] }); // Invalidate active members list to refetch updated data
    },
    onError: (error) => {
      toast.error("Failed to change member role.", {
        description: error.message,
      });
    },
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Role>();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: Role) => {
    if (!data.role) {
      toast.error("Please select a role.");
      return;
    }
    mutation.mutate(data.role);
  };

  return (
    <Modal
      title={`Change Role for ${memberName || "Member"}`}
      open={isOpen}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SelectInput
          label="New Role"
          control={control}
          inputname="role"
          options={[
            { value: "admin", label: "Admin" },
            { value: "member", label: "Member" },
            { value: "chairman", label: "Chairman" },
            { value: "gen_secretary", label: "General Secretary" },
            { value: "fin_secretary", label: "Financial Secretary" },
            { value: "secretary", label: "Secretary" },
            { value: "treasurer", label: "Treasurer" },
            { value: "president", label: "President" },
          ]}
          error={errors.role?.message}
        />
        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {mutation.isPending ? "Changing..." : "Change Role"}
        </Button>
      </form>
    </Modal>
  );
}
