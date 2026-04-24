"use client";
import { useState } from "react";
import { dataTagSymbol, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

import { StepIndicator } from "./StepIndicator";
import { AccountDetailsForm } from "./AccountDetailsForm";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { NextOfKinForm } from "./NextOfKinForm";
import { EmailVerification } from "./EmailVerification";
import { RegisterApi } from "@/lib/api/auth/auth";

import {
  AllFormData,
  Step1FormData,
  Step2FormData,
  Step3FormData,
} from "./types";
import { toast } from "sonner";

// ─── Step title config ────────────────────────────────────────────────────────

const STEP_TITLES: Record<number, { title: string; subtitle: string }> = {
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
};

// ─── Main Component ───────────────────────────────────────────────────────────

export function RegisterForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AllFormData>({});

  const mutation = useMutation({
    mutationFn: (data: FormData) => RegisterApi(data),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Registration Failed", { description: error.message });
    },
  });

  const handleStep1 = (data: Step1FormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStep2 = (data: Step2FormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
  };

  const handleStep3 = async (data: Step3FormData) => {
    const fullData = {
      ...formData,
      ...data,
    } as Step1FormData & Step2FormData & Step3FormData;

    setFormData(fullData);

    // Build FormData instead of sending raw object
    const form = new FormData();

    Object.entries(fullData).forEach(([key, value]) => {
      if (key === "signature") {
        // Append the actual File from the FileList
        const fileList = value as FileList;
        if (fileList && fileList[0]) {
          form.append("signature", fileList[0]);
        }
      } else {
        form.append(key, value as string);
      }
    });

    await mutation.mutateAsync(form); // 👈 send FormData, not fullData
    setStep(4);
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

        {/* Step Title (hidden on verification screen) */}
        {step < 4 && (
          <div className="text-center space-y-1 mb-2">
            <h2 className="text-[#1B2E5E] text-xl font-semibold leading-7">
              {STEP_TITLES[step].title}
            </h2>
            <p className="text-[#64748B] text-sm">
              {STEP_TITLES[step].subtitle}
            </p>
          </div>
        )}

        {/* Step Content */}
        {step === 1 && <AccountDetailsForm onNext={handleStep1} />}

        {step === 2 && (
          <PersonalInfoForm
            onNext={handleStep2}
            onBack={() => setStep(1)}
            email={formData.email ?? ""}
          />
        )}

        {step === 3 && (
          <NextOfKinForm
            onNext={handleStep3}
            onBack={() => setStep(2)}
            isPending={mutation.isPending}
          />
        )}

        {step === 4 && <EmailVerification email={formData.email ?? ""} />}

        {/* Mutation error */}
        {mutation.isError && (
          <p className="text-red-500 text-sm text-center">
            Something went wrong. Please try again.
          </p>
        )}

        {/* Footer link */}
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
