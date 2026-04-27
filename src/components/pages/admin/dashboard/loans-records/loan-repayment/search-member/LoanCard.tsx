"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MemberLoan, Schedule } from "./types";
import { CreateFormRecord } from "../create-record/record-form-modal";

interface LoanCardProps {
  memberLoan: MemberLoan;
  onSelectSchedule?: (schedule: Schedule) => void;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatNaira(amount: number) {
  return (
    "₦" + Number(amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })
  );
}

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-green-50 text-green-800 border-green-200",
  pending: "bg-blue-50 text-[#1B2E5E] border-blue-200",
  overdue: "bg-amber-50 text-amber-800 border-amber-200",
  partial: "bg-yellow-50 text-yellow-800 border-yellow-200",
};

export function LoanCard({ memberLoan, onSelectSchedule }: LoanCardProps) {
  const [taget, setTaget] = useState<Schedule | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );

  function handleSelectSchedule(schedule: Schedule) {
    if (!schedule.is_payable) return;
    setSelectedSchedule(schedule);
    onSelectSchedule?.(schedule);
  }

  console.log(memberLoan);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ background: "#1B2E5E" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
            style={{
              background: "rgba(200,155,42,0.25)",
              color: "#C89B2A",
              border: "1.5px solid #C89B2A",
            }}
          >
            {initials(memberLoan.member.full_name)}
          </div>
          <div>
            <p className="font-medium text-white text-sm">
              {memberLoan.member.full_name}
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
              {memberLoan.member.membership_no} · {memberLoan.loan.loan_type}
            </p>
          </div>
        </div>
        <Badge
          className="text-xs border"
          style={{
            background: "rgba(200,155,42,0.2)",
            color: "#C89B2A",
            borderColor: "rgba(200,155,42,0.4)",
          }}
        >
          Active Loan
        </Badge>
      </div>

      {/* Loan summary */}
      <div className="grid grid-cols-3 border-b border-border">
        {[
          {
            label: "Loan amount",
            value: formatNaira(memberLoan.loan.loan_amount),
            accent: false,
          },
          {
            label: "Total paid",
            value: formatNaira(memberLoan.loan.total_paid),
            accent: false,
          },
          {
            label: "Outstanding",
            value: formatNaira(memberLoan.loan.outstanding),
            accent: true,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="px-5 py-3 border-r border-border last:border-r-0"
          >
            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
            <p
              className="text-base font-medium"
              style={item.accent ? { color: "#C89B2A" } : undefined}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Schedule list */}
      <div className="px-5 py-2 border-b border-border">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Select installment to post payment
        </p>
      </div>

      <div className="divide-y divide-border">
        {memberLoan.schedules.map((schedule) => {
          const isSelected = selectedSchedule?.id === schedule.id;
          return (
            <div
              key={schedule.id}
              onClick={() => handleSelectSchedule(schedule)}
              className={cn(
                "grid items-center gap-3 px-5 py-3 text-sm transition-colors",
                "grid-cols-[32px_1fr_90px_80px_80px_80px]",
                schedule.is_payable
                  ? "cursor-pointer hover:bg-muted/60"
                  : "opacity-45 cursor-not-allowed",
                isSelected && "bg-blue-50/60",
              )}
              style={
                isSelected ? { borderLeft: "3px solid #1B2E5E" } : undefined
              }
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                style={
                  isSelected
                    ? { background: "#1B2E5E", color: "#fff" }
                    : {
                        background: "var(--muted)",
                        color: "var(--muted-foreground)",
                      }
                }
              >
                {schedule.installment_no}
              </div>

              <div>
                <p className="font-medium">{schedule.due_month_label}</p>
                <p className="text-xs text-muted-foreground">
                  Due{" "}
                  {new Date(schedule.due_date).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>

              <p className="font-medium">
                {formatNaira(schedule.monthly_payment)}
              </p>

              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
                  STATUS_STYLES[schedule.status],
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {schedule.status.charAt(0).toUpperCase() +
                  schedule.status.slice(1)}
              </span>

              <p className="text-xs text-muted-foreground">
                {schedule.status === "paid"
                  ? "—"
                  : formatNaira(schedule.balance_remaining) + " left"}
              </p>

              {schedule.is_payable ? (
                <Button
                  size="sm"
                  className="text-xs h-7 px-3"
                  onClick={() => {
                    setTaget(schedule);
                  }}
                  style={
                    isSelected
                      ? { background: "#C89B2A", color: "#fff", border: "none" }
                      : { background: "#1B2E5E", color: "#fff", border: "none" }
                  }
                >
                  {isSelected ? "Selected" : "Select"}
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </div>
          );
        })}
        <CreateFormRecord
          open={taget ? true : false}
          onClose={() => {
            setTaget(null);
            setSelectedSchedule(null);
          }}
          loanId={memberLoan.loan.id}
          taget={taget ? taget : null}
        />
      </div>
    </div>
  );
}
