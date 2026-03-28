import { Check } from "lucide-react";

const STEPS = [
  { label: "Account Details" },
  { label: "Personal Information" },
  { label: "Next of Kin" },
  { label: "Email Verification" },
];

type Props = {
  current: number;
};

export function StepIndicator({ current }: Props) {
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
