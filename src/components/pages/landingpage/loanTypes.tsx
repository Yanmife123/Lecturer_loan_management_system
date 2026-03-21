import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const loanData = [
  {
    title: "Normal Loan",
    maxAmount: "Double of savings",
    period: "36 months",
    interest: "1% reducing balance",
    description: "Standard loan based on your total savings balance",
  },
  {
    title: "Emergency Loan",
    maxAmount: "₦300,000",
    period: "12 months",
    interest: "10% flat",
    description: "Quick access for urgent financial needs",
  },
  {
    title: "Commodity Loan",
    maxAmount: "No maximum",
    period: "12 months",
    interest: "10% flat",
    description: "For purchasing specific commodities",
  },
  {
    title: "Enhancement Loan",
    maxAmount: "₦1,000,000",
    period: "10 months",
    interest: "10% flat",
    description: "For professional development and advancement",
  },
  {
    title: "Soft Loan",
    maxAmount: "₦100,000",
    period: "5 months",
    interest: "5% flat",
    description: "Low-interest option for small financial needs",
  },
];
export default function LoanTypesSection() {
  return (
    <div className="font-sans py-18 bg-[#F1F3F5] px-4 md:px-8" id="loanTypes">
      <div className="flex justify-center">
        <div className="w-full max-w-7xl space-y-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-primaryT md:text-4xl text-2xl leading-10 font-medium text-center">
              Available Loan Types
            </h2>
            <p className="text-[#64748B] leading-6 text-base max-w-166 text-center">
              Choose from our diverse range of loan products designed to meet
              your specific financial needs.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {loanData.map((loan) => (
              <Card
                key={loan.title}
                className="rounded-[16px] p-6 space-y-4 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] "
              >
                <h3 className="text-[20px] leading-7 font-medium text-primaryT">
                  {loan.title}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-[#64748B] leading-5 text-sm">
                      Max Amount:
                    </div>

                    <div className="text-primaryT leading-5 text-sm">
                      {loan.maxAmount}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-[#64748B] leading-5 text-sm">
                      Period:
                    </div>

                    <div className="text-primaryT leading-5 text-sm">
                      {loan.period}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-[#64748B] leading-5 text-sm">
                      Interest:
                    </div>

                    <div className="text-primaryT leading-5 text-sm">
                      {loan.interest}
                    </div>
                  </div>
                  <p className="text-[#64748B] leading-5 text-sm">
                    Low-interest option for small financial needs
                  </p>
                </div>
                <div className="flex justify-center">
                  <Link
                    href={""}
                    className="text-[#C89B2A] font-medium leading-6 flex gap-2 "
                  >
                    Learn More
                    <ArrowRight />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
