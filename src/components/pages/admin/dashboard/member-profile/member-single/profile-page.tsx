"use client";

import { Card } from "@/components/ui/card";
import { EmploymentInfos } from "./employment-infos";
import ProfileInfo from "./profile-info";
// import NextOfKin from "./next-of-kin";
import ProfileSidebar from "./profile-sidebar";
import { TrendingUp, Wallet } from "lucide-react";
import Link from "next/link";

export default function AdminProfileComponent() {
  return (
    <div className="min-h-screen bg-transparent">
      <main className="flex gap-8  p-0 max-w-7xl mx-auto lg:flex-row flex-col max-lg:items-center">
        {/* Sidebar */}
        <ProfileSidebar />

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <ProfileInfo />
          <EmploymentInfos />
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="py-8 px-5 font-sans space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex justify-center items-center rounded-[12px] bg-[#C89B2A1A]">
                  <Wallet color="#C89B2A" size={20} />
                </div>
                <div>
                  <p className="text-sm text-[#64748B] leading-5">
                    Total Savings
                  </p>
                  <p className="text-xl font-normal text-[#1B2E5E]  leading-7">
                    ₦1,200,000
                  </p>
                </div>
              </div>
              <div>
                <Link
                  href="#"
                  className="text-sm text-[#C89B2A]  hover:text-[#D4A835]"
                >
                  View Savings History →
                </Link>
              </div>
            </Card>
            <Card className="py-8 px-5 font-sans space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex justify-center items-center rounded-[12px] bg-[#C89B2A1A]">
                  <TrendingUp color="#1B2E5E" size={20} />
                </div>
                <div>
                  <p className="text-sm text-[#64748B] leading-5">
                    Active Loans
                  </p>
                  <p className="text-xl font-normal text-[#1B2E5E]  leading-7">
                    2
                  </p>
                </div>
              </div>
              <div>
                <Link
                  href="#"
                  className="text-sm text-[#1B2E5E]  hover:text-[#1B2E5E]"
                >
                  View Loan Records →
                </Link>
              </div>
            </Card>
          </div>
          {/* <NextOfKin /> */}
        </div>
      </main>
    </div>
  );
}
