"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "@/components/utility/form/custom-input";
import { EmailInput } from "@/components/utility/form/email-Input";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Check, Mail } from "lucide-react";

// ─── Step Schemas ────────────────────────────────────────────────────────────

const step1Schema = z.object({
  prefix: z.string().min(1, "Prefix is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  staffId: z.string().min(1, "Staff ID is required"),
  email: z
    .string()
    .email("Invalid email")
    .refine((v) => v.endsWith("@run.edu.ng"), {
      message: "Must be a Redeemer's University email",
    }),
});

const step2Schema = z.object({
  surname: z.string().min(1, "Surname is required"),
  otherNames: z.string().min(1, "Other names are required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  faculty: z.string().min(1, "Faculty is required"),
  departmentUnit: z.string().min(1, "Department/Unit is required"),
  dateOfFirstAppointment: z
    .string()
    .min(1, "Date of first appointment is required"),
  presentDesignation: z.string().min(1, "Present designation is required"),
  salaryScale: z.string().min(1, "Salary scale is required"),
  staffFileNo: z.string().min(1, "Staff file number is required"),
  telephoneNo: z.string().min(1, "Telephone number is required"),
  residentialAddress: z.string().min(1, "Residential address is required"),
  permanentHomeAddress: z.string().min(1, "Permanent home address is required"),
});

const step3Schema = z.object({
  nextOfKinFullName: z.string().min(1, "Full name is required"),
  nextOfKinRelationship: z.string().min(1, "Relationship is required"),
  nextOfKinContactAddress: z.string().min(1, "Contact address is required"),
  nextOfKinPhoneNumber: z.string().min(1, "Phone number is required"),
  nextOfKinEmail: z.string().email("Invalid email"),
});

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;
type Step3 = z.infer<typeof step3Schema>;

// ─── Step Indicator ──────────────────────────────────────────────────────────

const STEPS = [
  { label: "Account Details" },
  { label: "Personal Information" },
  { label: "Next of Kin" },
  { label: "Email Verification" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center w-full mb-6">
      {STEPS.map((step, idx) => {
        const stepNum = idx + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;
        return (
          <div key={idx} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all
                  ${isDone ? "bg-[#1B2E5E] border-[#1B2E5E] text-white" : ""}
                  ${isActive ? "bg-[#C89B2A] border-[#C89B2A] text-white" : ""}
                  ${!isDone && !isActive ? "bg-white border-[#CBD5E1] text-[#94A3B8]" : ""}
                `}
              >
                {isDone ? <Check size={14} /> : stepNum}
              </div>
              <span
                className={`text-[10px] text-center leading-3 max-w-[60px]
                  ${isActive ? "text-[#1B2E5E] font-medium" : "text-[#94A3B8]"}
                `}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`h-px w-10 mx-1 mb-4 transition-all ${
                  stepNum < current ? "bg-[#1B2E5E]" : "bg-[#CBD5E1]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Account Details ─────────────────────────────────────────────────

function Step1Form({ onNext }: { onNext: (data: Step1) => void }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Step1>({ resolver: zodResolver(step1Schema) });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <CustomInput
        label="Prefix"
        inputname="prefix"
        register={register}
        type="text"
        placeholder="e.g., Dr., Prof., Mr., Mrs."
        error={errors.prefix?.message}
      />
      <div className="grid grid-cols-2 gap-4">
        <CustomInput
          label="First Name"
          inputname="firstName"
          register={register}
          type="text"
          placeholder="Enter your first name"
          error={errors.firstName?.message}
        />
        <CustomInput
          label="Last Name"
          inputname="lastName"
          register={register}
          type="text"
          placeholder="Enter your last name"
          error={errors.lastName?.message}
        />
      </div>
      <CustomInput
        label="Staff ID"
        inputname="staffId"
        register={register}
        type="text"
        placeholder="e.g., RUN/2024/001"
        error={errors.staffId?.message}
      />
      <EmailInput
        label="Email Address"
        inputname="email"
        register={register}
        placeholder="yourname@run.edu.ng"
        error={errors.email?.message}
      />
      {errors.email === undefined && (
        <p className="text-[#64748B] text-xs -mt-2">
          Must be a Redeemer's University email
        </p>
      )}
      <Button
        type="submit"
        className="w-full py-6 rounded-[16px] bg-[#C89B2A] hover:bg-[#b08a24] text-white mt-2"
      >
        Save & Continue
      </Button>
    </form>
  );
}

// ─── Step 2: Personal Information ────────────────────────────────────────────

function Step2Form({
  onNext,
  onBack,
  email,
}: {
  onNext: (data: Step2) => void;
  onBack: () => void;
  email: string;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Step2>({ resolver: zodResolver(step2Schema) });

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

      {/* Read-only email from step 1 */}
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

// ─── Step 3: Next of Kin ─────────────────────────────────────────────────────

function Step3Form({
  onNext,
  onBack,
}: {
  onNext: (data: Step3) => void;
  onBack: () => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Step3>({ resolver: zodResolver(step3Schema) });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <CustomInput
        label="Full Name of Next of Kin (Surname First)"
        inputname="nextOfKinFullName"
        register={register}
        type="text"
        placeholder="e.g., Adeyemi, Grace Oluwaseun"
        error={errors.nextOfKinFullName?.message}
      />
      <CustomInput
        label="Relationship"
        inputname="nextOfKinRelationship"
        register={register}
        type="text"
        placeholder="e.g., Spouse, Sibling, Parent"
        error={errors.nextOfKinRelationship?.message}
      />
      <CustomInput
        label="Contact Address"
        inputname="nextOfKinContactAddress"
        register={register}
        type="text"
        error={errors.nextOfKinContactAddress?.message}
      />
      <CustomInput
        label="Phone Number"
        inputname="nextOfKinPhoneNumber"
        register={register}
        type="tel"
        placeholder="+234 800 000 0000"
        error={errors.nextOfKinPhoneNumber?.message}
      />
      <EmailInput
        label="Email Address"
        inputname="nextOfKinEmail"
        register={register}
        error={errors.nextOfKinEmail?.message}
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
          Submit
        </Button>
      </div>
    </form>
  );
}

// ─── Step 4: Email Verification ──────────────────────────────────────────────

function Step4Verification({ email }: { email: string }) {
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    // call your resend API here
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[#FFF8E7] flex items-center justify-center">
        <Mail size={28} className="text-[#C89B2A]" />
      </div>
      <h3 className="text-[#1B2E5E] text-xl font-semibold">
        Verify Your Email
      </h3>
      <p className="text-[#64748B] text-sm leading-6 max-w-xs">
        A verification link has been sent to{" "}
        <span className="text-[#C89B2A] font-medium">{email}</span>. Please
        check your inbox and click the link to activate your account.
      </p>
      <button
        onClick={handleResend}
        className="text-[#C89B2A] text-sm font-medium hover:underline transition-all"
      >
        {resent ? "Email sent!" : "Resend Email"}
      </button>
      <p className="text-[#94A3B8] text-xs">
        Only @run.edu.ng email addresses are supported.
      </p>
    </div>
  );
}

// ─── Main Register Form ───────────────────────────────────────────────────────

export function RegisterForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Step1 & Step2 & Step3>>({});

  const mutation = useMutation({
    mutationFn: async (data: Step1 & Step2 & Step3) => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
  });

  const handleStep1 = (data: Step1) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStep2 = (data: Step2) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
  };

  const handleStep3: SubmitHandler<Step3> = async (data) => {
    const fullData = { ...formData, ...data } as Step1 & Step2 & Step3;
    setFormData(fullData);
    await mutation.mutateAsync(fullData);
    setStep(4);
  };

  const stepTitles: Record<number, { title: string; subtitle: string }> = {
    1: {
      title: "Create Your Account",
      subtitle: "Step 1 of 4: Account Details",
    },
    2: {
      title: "Complete Your Membership Profile",
      subtitle: "Step 2 of 4: Personal Information",
    },
    3: {
      title: "Next of Kin Details",
      subtitle: "Step 3 of 4: Next of Kin Information",
    },
    4: { title: "", subtitle: "" },
  };

  return (
    <div className="flex justify-center items-start font-sans py-12 px-4 min-h-screen">
      <Card className="w-full max-w-lg py-8 px-7 space-y-4">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" height={40} width={39} />
          </Link>
        </div>

        {/* Step Indicator */}
        <StepIndicator current={step} />

        {/* Step Title */}
        {step < 4 && (
          <div className="text-center space-y-1 mb-2">
            <h2 className="text-[#1B2E5E] text-xl font-semibold leading-7">
              {stepTitles[step].title}
            </h2>
            <p className="text-[#64748B] text-sm">
              {stepTitles[step].subtitle}
            </p>
          </div>
        )}

        {/* Step Content */}
        {step === 1 && <Step1Form onNext={handleStep1} />}
        {step === 2 && (
          <Step2Form
            onNext={handleStep2}
            onBack={() => setStep(1)}
            email={formData.email ?? ""}
          />
        )}
        {step === 3 && (
          <Step3Form onNext={handleStep3} onBack={() => setStep(2)} />
        )}
        {step === 4 && <Step4Verification email={formData.email ?? ""} />}

        {/* Footer */}
        {step < 4 && (
          <p className="text-center text-[#64748B] text-sm pt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#C89B2A] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        )}
      </Card>
    </div>
  );
}
