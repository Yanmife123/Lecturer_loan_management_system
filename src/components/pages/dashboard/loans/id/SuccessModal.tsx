"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-[#F1F3F5] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-sm w-full text-center space-y-5">
        <div className="flex justify-center">
          <CheckCircle className="h-14 w-14 text-[#1B2E5E]" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#1B2E5E]">
            Application Submitted
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your loan application has been submitted and is under committee
            review. You will be notified once a decision is made.
          </p>
        </div>

        <Button
          onClick={() => router.push("/dashboard")}
          className="w-full h-11 bg-[#1B2E5E] hover:bg-[#1B2E5E]/90 text-white"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
