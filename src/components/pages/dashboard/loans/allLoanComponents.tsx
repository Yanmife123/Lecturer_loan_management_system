import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface LoanType {
  id: number | string;
  name: string;
  maxAmount: string | string;
  period: string;
  interestRate: string;
}

const loanTypes: LoanType[] = [
  {
    id: 1,
    name: "Normal Loan",
    maxAmount: "2x savings",
    period: "36 months",
    interestRate: "1% reducing",
  },
  {
    id: 2,
    name: "Emergency Loan",
    maxAmount: "₦300,000",
    period: "12 months",
    interestRate: "10% flat",
  },
  {
    id: 3,
    name: "Commodity Loan",
    maxAmount: "No maximum",
    period: "12 months",
    interestRate: "10% flat",
  },
  {
    id: 4,
    name: "Enhancement Loan",
    maxAmount: "₦1,000,000",
    period: "10 months",
    interestRate: "10% flat",
  },
  {
    id: 5,
    name: "Soft Loan",
    maxAmount: "₦100,000",
    period: "5 months",
    interestRate: "5% flat",
  },
];

export function LoansComponent() {
  return (
    <div className="font-sans space-y-6 max-w-7xl">
      <div className="space-y-3">
        <h1 className="text-primaryT font-medium text-[30px] leading-9">
          Apply for Loan
        </h1>
        <p className="text-[#64748B] leading-7 text-base">
          Select your loan type to begin{" "}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {loanTypes.map((loan) => (
          <Card
            key={loan.id}
            className="border-1 border-[#1B2E5E1A] bg-[#FFFFFF] py-[25px]"
          >
            <CardHeader className="">
              <h2 className="text-lg font-medium leading-7 text-primaryT">
                {loan.name}
              </h2>
            </CardHeader>
            <CardContent className="">
              <div className="flex justify-between gap-5 items-center">
                <p className="text-sm text-[#64748B] leading-5 font-medium">
                  Max Amount:
                </p>
                <p className="text-primaryT text-sm leading-5 font-medium">
                  {loan.maxAmount}
                </p>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <p className="text-sm text-[#64748B] leading-5 font-medium">
                  Period:
                </p>
                <p className="text-primaryT text-sm leading-5 font-medium">
                  {loan.period}
                </p>
              </div>
              <div className="flex justify-between gap-5 items-center">
                <p className="text-sm text-[#64748B] leading-5 font-medium">
                  Interest Rate:
                </p>
                <p className="text-primaryT text-sm leading-5 font-medium">
                  {loan.interestRate}
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-white border-none">
              <div className="text-[#C89B2A] text-sm leading-5 font-medium flex items-center gap-1">
                Apply{" "}
                <div className="flex items-center mt-1">
                  <ArrowRight className="w-[14px] h-[14px]" />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
