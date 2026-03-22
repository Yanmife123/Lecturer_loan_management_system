"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/utility/form/custom-input";
import { step2Schema, Step2FormData } from "./types";

type Props = {
  onNext: (data: Step2FormData) => void;
  onBack: () => void;
  email: string;
};

export function PersonalInfoForm({ onNext, onBack, email }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <CustomInput
          label="Surname"
          inputname="surname"
          register={register}
          type="text"
          error={errors.surname?.message}
        />
        <CustomInput
          label="Other Names"
          inputname="otherNames"
          register={register}
          type="text"
          error={errors.otherNames?.message}
        />
        <CustomInput
          label="Gender"
          inputname="gender"
          register={register}
          type="text"
          error={errors.gender?.message}
        />
        <CustomInput
          label="Date of Birth"
          inputname="dateOfBirth"
          register={register}
          type="date"
          error={errors.dateOfBirth?.message}
        />
        <CustomInput
          label="Marital Status"
          inputname="maritalStatus"
          register={register}
          type="text"
          error={errors.maritalStatus?.message}
        />
        <CustomInput
          label="Faculty"
          inputname="faculty"
          register={register}
          type="text"
          error={errors.faculty?.message}
        />
        <CustomInput
          label="Department/Unit"
          inputname="departmentUnit"
          register={register}
          type="text"
          error={errors.departmentUnit?.message}
        />
        <CustomInput
          label="Date of First Appointment"
          inputname="dateOfFirstAppointment"
          register={register}
          type="date"
          error={errors.dateOfFirstAppointment?.message}
        />
        <CustomInput
          label="Present Designation"
          inputname="presentDesignation"
          register={register}
          type="text"
          error={errors.presentDesignation?.message}
        />
        <CustomInput
          label="Salary Scale"
          inputname="salaryScale"
          register={register}
          type="text"
          error={errors.salaryScale?.message}
        />
        <CustomInput
          label="Staff File No"
          inputname="staffFileNo"
          register={register}
          type="text"
          error={errors.staffFileNo?.message}
        />
        <CustomInput
          label="Telephone No"
          inputname="telephoneNo"
          register={register}
          type="tel"
          placeholder="+234 800 000 0000"
          error={errors.telephoneNo?.message}
        />
      </div>

      <CustomInput
        label="Residential Address"
        inputname="residentialAddress"
        register={register}
        type="text"
        error={errors.residentialAddress?.message}
      />
      <CustomInput
        label="Permanent Home Address"
        inputname="permanentHomeAddress"
        register={register}
        type="text"
        error={errors.permanentHomeAddress?.message}
      />

      {/* Read-only email carried over from Step 1 */}
      <div className="space-y-2">
        <label className="text-foreground font-medium text-sm">
          Email Address
        </label>
        <input
          value={email}
          readOnly
          className="h-11 w-full rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground cursor-not-allowed"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 py-6 rounded-[16px]"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 py-6 rounded-[16px] bg-[#C89B2A] hover:bg-[#b08a24] text-white"
        >
          Save & Continue
        </Button>
      </div>
    </form>
  );
}
