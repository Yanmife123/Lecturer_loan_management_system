"use client";
import { useState } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

type Props = {
  email: string;
};

export function EmailVerification({ email }: Props) {
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    // TODO: call your resend verification API here
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[#FFF8E7] flex items-center justify-center">
        <Mail size={28} className="text-[#C89B2A]" />
      </div>

      <h3 className="text-[#1B2E5E] text-xl font-semibold">
        Application Under Review
      </h3>

      <p className="text-[#64748B] text-sm leading-6 max-w-xs">
        Thank you for registering. Your membership application is being reviewed
        by our team. A notification will be sent to{" "}
        <span className="font-semibold text-[#1B2E5E]">{email}</span> once a
        decision has been made.
      </p>

      <button
        onClick={handleResend}
        className="text-[#C89B2A] text-sm font-medium hover:underline transition-all"
      >
        <Link href={"/"}>Back to home</Link>
      </button>
    </div>
  );
}
