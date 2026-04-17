"use client";

interface InfoFieldProps {
  label: string;
  value: string;
}

export default function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="font-sans">
      <p className="text-sm text-[#64748B] leading-5 font-medium mb-1">
        {label}
      </p>
      <p className="text-[#1B2E5E] text-sm leading-5 font-medium">{value}</p>
    </div>
  );
}
