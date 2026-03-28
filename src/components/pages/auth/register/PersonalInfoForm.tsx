"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { CustomInput } from "@/components/utility/form/custom-input";
import { step2Schema, Step2FormData } from "./types";
import { SelectInput } from "@/components/utility/form/custom-select";
import { FileInput } from "@/components/utility/form/custom-file";

type Props = {
  onNext: (data: Step2FormData) => void;
  onBack: () => void;
  email: string;
};

export function PersonalInfoForm({ onNext, onBack, email }: Props) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* <CustomInput
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
        /> */}
        <SelectInput
          label="Gender"
          inputname="gender"
          control={control}
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          error={errors.gender?.message}
        />
        <CustomInput
          label="Date of Birth"
          inputname="dateOfBirth"
          register={register}
          type="date"
          error={errors.dateOfBirth?.message}
        />
        <SelectInput
          label="Marital Status"
          inputname="maritalStatus"
          control={control}
          options={[
            { label: "Single", value: "single" },
            { label: "Married", value: "married" },
            { label: "Divorced", value: "divorced" },
            { label: "Widowed", value: "widowed" },
          ]}
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
          inputname="department"
          register={register}
          type="text"
          error={errors.department?.message}
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
          inputname="designation"
          register={register}
          type="text"
          error={errors.designation?.message}
        />
        <CustomInput
          label="Salary Scale Level"
          inputname="salaryScaleLevel"
          register={register}
          type="text"
          error={errors.salaryScaleLevel?.message}
        />
        <CustomInput
          label="Salary Scale Step"
          inputname="salaryScaleStep"
          register={register}
          type="text"
          error={errors.salaryScaleStep?.message}
        />
        <CustomInput
          label="Staff File No"
          inputname="file_no"
          register={register}
          type="text"
          error={errors.file_no?.message}
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
        inputname="permanentAddress"
        register={register}
        type="text"
        error={errors.permanentAddress?.message}
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
      <FileInput
        label="Signature"
        inputname="signature"
        register={register}
        error={errors.signature?.message as string}
      />

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
