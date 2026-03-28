"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/utility/form/custom-input";
import { EmailInput } from "@/components/utility/form/email-Input";
import { step3Schema, Step3FormData } from "./types";

type Props = {
  onNext: (data: Step3FormData) => void;
  onBack: () => void;
  isPending: boolean;
};

export function NextOfKinForm({ onNext, onBack, isPending }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <CustomInput
        label="Full Name of Next of Kin (Surname First)"
        inputname="nokFullName"
        register={register}
        type="text"
        placeholder="e.g., Adeyemi, Grace Oluwaseun"
        error={errors.nokFullName?.message}
      />
      <CustomInput
        label="Relationship"
        inputname="nokRelationship"
        register={register}
        type="text"
        placeholder="e.g., Spouse, Sibling, Parent"
        error={errors.nokRelationship?.message}
      />
      <CustomInput
        label="Contact Address"
        inputname="nokContactAddress"
        register={register}
        type="text"
        error={errors.nokContactAddress?.message}
      />
      <CustomInput
        label="Phone Number"
        inputname="nokPhone"
        register={register}
        type="tel"
        placeholder="+234 800 000 0000"
        error={errors.nokPhone?.message}
      />
      <EmailInput
        label="Email Address"
        inputname="nokEmail"
        register={register}
        error={errors.noKinEmail?.message}
      />

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 py-6 rounded-[16px]"
          disabled={isPending}
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 py-6 rounded-[16px] bg-[#C89B2A] hover:bg-[#b08a24] text-white"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
