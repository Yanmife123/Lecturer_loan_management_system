"use client";
import { useState } from "react";
import { Mail } from "lucide-react";

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
