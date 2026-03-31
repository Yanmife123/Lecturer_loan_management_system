"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/utility/form/custom-input";
import { EmailInput } from "@/components/utility/form/email-Input";
import { step1Schema, Step1FormData } from "./types";
import { SelectInput } from "@/components/utility/form/custom-select";

type Props = {
  onNext: (data: Step1FormData) => void;
};

export function AccountDetailsForm({ onNext }: Props) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      {/* <CustomInput
        label="Prefix"
        inputname="prefix"
        register={register}
        type="text"
        placeholder="e.g., Dr., Prof., Mr., Mrs."
        error={errors.prefix?.message}
      /> */}
      <SelectInput
        label="Prefix"
        inputname="prefix"
        control={control}
        placeholder="e.g., Dr., Prof., Mr., Mrs."
        options={[
          { label: "Prof.", value: "Prof." },
          { label: "Dr.", value: "Dr." },
          { label: "Mr.", value: "Mr." },
          { label: "Mrs.", value: "Mrs." },
          { label: "Ms.", value: "Ms." },
        ]}
        error={errors.prefix?.message}
      />
      {/* "oldUser" => 'required|boolean', */}

      <div className="grid grid-cols-2 gap-4">
        <CustomInput
          label="SurName"
          inputname="surname"
          register={register}
          type="text"
          placeholder="Enter your first name"
          error={errors.surname?.message}
        />
        <CustomInput
          label="Other Names"
          inputname="otherNames"
          register={register}
          type="text"
          placeholder="Enter your last name"
          error={errors.otherNames?.message}
        />
      </div>

      {/* <CustomInput
        label="Staff ID"
        inputname="staffId"
        register={register}
        type="text"
        placeholder="e.g., RUN/2024/001"
        error={errors.staffId?.message}
      /> */}
      <CustomInput
        label="Telephone No"
        inputname="phone"
        register={register}
        type="tel"
        placeholder="+234 800 000 0000"
        error={errors.phone?.message}
      />

      <div>
        <EmailInput
          label="Email Address"
          inputname="email"
          register={register}
          placeholder="name@gmail.com"
          error={errors.email?.message}
        />
        {/* {!errors.email && (
          <p className="text-[#64748B] text-xs mt-1">
            Must be a Redeemer&apos;s University email
          </p>
        )} */}
      </div>
      <CustomInput
        label="Monthly Saving"
        inputname="monthlySaving"
        register={register}
        type="number"
        error={errors.monthlySaving?.message}
      />
      <CustomInput
        label="Password"
        inputname="password"
        register={register}
        type="password"
        error={errors.password?.message}
      />
      <CustomInput
        label="Confirm Password"
        inputname="confirmPassword"
        register={register}
        type="password"
        error={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        className="w-full py-6 rounded-[16px] bg-[#C89B2A] hover:bg-[#b08a24] text-white mt-2"
      >
        Save & Continue
      </Button>
    </form>
  );
}
