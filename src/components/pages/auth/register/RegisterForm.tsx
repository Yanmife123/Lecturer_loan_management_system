"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

import { StepIndicator } from "./StepIndicator";
import { AccountDetailsForm } from "./AccountDetailsForm";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { NextOfKinForm } from "./NextOfKinForm";
import { EmailVerification } from "./EmailVerification";

import {
  AllFormData,
  Step1FormData,
  Step2FormData,
  Step3FormData,
} from "./types";

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
    mutationFn: async (
      data: Step1FormData & Step2FormData & Step3FormData
    ) => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Registration failed");
      return res.json();
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

    await mutation.mutateAsync(fullData);
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
