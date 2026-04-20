"use client";

import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Loan Details" },
  { id: 2, label: "Loan Bond" },
  { id: 3, label: "Salary Deduction" },
  { id: 4, label: "Guarantors" },
  { id: 5, label: "Review & Submit" },
];

type Props = {
  currentStep: number;
};

export default function LoanStepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-between w-full px-2">
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all",
                  isActive &&
                    "bg-[#1B2E5E] border-[#1B2E5E] text-white",
                  isCompleted &&
                    "bg-[#1B2E5E] border-[#1B2E5E] text-white",
                  !isActive &&
                    !isCompleted &&
                    "bg-white border-gray-300 text-gray-400"
                )}
              >
                {step.id}
              </div>
              <span
                className={cn(
                  "text-xs text-center whitespace-nowrap",
                  isActive && "text-[#1B2E5E] font-medium",
                  isCompleted && "text-[#1B2E5E]",
                  !isActive && !isCompleted && "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mx-2 mb-5 transition-all",
                  isCompleted ? "bg-[#1B2E5E]" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
