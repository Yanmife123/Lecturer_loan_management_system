import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
export function GuarantorRequestDetails() {
  return (
    <div className="">
      <div className="space-y-6 max-w-3xl mx-auto font-sans">
        <Card className="p-6 space-y-3">
          <div className="flex gap-3 items-center">
            <div>
              <Image src={"/logo.svg"} alt="Logo icon" height={55} width={55} />
            </div>
            <div className="">
              <p className="text-primaryT font-sans text-base leading-6">
                Redeemer's University
              </p>
              <p className="text-[#64748B] text-xs font-normal font-sans leading-4">
                Staff Cooperative Multipurpose Society Ltd
              </p>
            </div>
          </div>
          <hr className="border-[#1B2E5E1A]" />
          <div>
            <h1 className="text-primaryT font-medium text-lg leading-7">
              Loan Guarantor Consent Request
            </h1>
            <p className="text-[#64748B] text-sm leading-5">
              You have been nominated as a guarantor for a loan application.
              Please review the details below before responding.
            </p>
          </div>
        </Card>
        <Card className="p-6 space-y-3">
          <div>
            <h3 className="text-[#64748B] text-xs leading-4 ">
              Borrower Details
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <h4 className="text-[#64748B] text-xs leading-4">
                Prefix + Full Name
              </h4>
              <p className="text-primaryT text-base leading-6">
                Dr. Adeyemi Johnson Oluwaseun
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-4">
                <h4 className="text-[#64748B] text-xs leading-4">Staff ID</h4>
                <p className="text-primaryT text-base leading-6">
                  RUN/2024/001
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-[#64748B] text-xs leading-4">Faculty</h4>
                <p className="text-primaryT text-base leading-6">
                  Natural Sciences
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-4">
                <h4 className="text-[#64748B] text-xs leading-4">
                  Department/Unit
                </h4>
                <p className="text-primaryT text-base leading-6">
                  Computer Science
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-[#64748B] text-xs leading-4">
                  Present Designation
                </h4>
                <p className="text-primaryT text-base leading-6">
                  Senior Lecturer
                </p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 space-y-3">
          <div>
            <h3 className="text-[#64748B] text-xs leading-4 ">Loan Details</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-4">
                <h4 className="text-[#64748B] text-xs leading-4"> Loan Type</h4>
                <p className="text-primaryT text-base leading-6">Normal Loan</p>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-[#64748B] text-xs leading-4">
                  Amount in Figures
                </h4>
                <p className="text-primaryT text-base leading-6">₦500,000.00</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[#64748B] text-xs leading-4">
                Amount in Words
              </h4>
              <p className="text-primaryT text-base leading-6">
                Five Hundred Thousand Naira Only
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-4">
                <h4 className="text-[#64748B] text-xs leading-4">
                  {" "}
                  Repayment Period
                </h4>
                <p className="text-primaryT text-base leading-6">24 months</p>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-[#64748B] text-xs leading-4">
                  Monthly Deduction
                </h4>
                <p className="text-primaryT text-base leading-6">₦22,917.00</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-4">
                <h4 className="text-[#64748B] text-xs leading-4">
                  {" "}
                  Interest Rate
                </h4>
                <p className="text-primaryT text-base leading-6">
                  1% reducing balance
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-[#64748B] text-xs leading-4">
                  Application Date
                </h4>
                <p className="text-primaryT text-base leading-6">
                  March 10, 2026
                </p>
              </div>
            </div>
          </div>
        </Card>
        <div className="bg-[#FAEEDA] p-6 border border-[#EF9F27] rounded-[1rem] space-y-3">
          <div className="flex gap-3 items-center">
            <div className="p-1 rounded-full bg-[#EF9F27]">
              <AlertCircle className="w-[13px] h-[13px] text-[#fff]" />
            </div>
            <div className="text-[#633806] font-semibold text-lg leading-6">
              Important Legal Notice
            </div>
          </div>
          <p className="text-[#633806] text-sm leading-5">
            By accepting this request, you agree to serve as a guarantor for the
            loan detailed above. If the borrower defaults on repayment, is
            expelled, or resigns from Redeemer's University, you will be held
            fully liable for the total outstanding principal and interest. Your
            monthly salary may be subject to deduction to recover the
            outstanding balance.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <Button
            variant={"default"}
            size={"lg"}
            className="w-full bg-[#2E7D32] hover:bg-[#2E7D32]   duration-300 shadow-sm h-[58px] text-medium leading-5 border-none rounded-[16px] text-white cursor-pointer"
          >
            I Accept – Serve as Guarantor
          </Button>
          <Button
            variant={"default"}
            size={"lg"}
            className="w-full bg-transparent  border border-[#A32D2D] duration-300 shadow-sm h-[58px] text-medium leading-5 rounded-[16px] text-[#A32D2D] cursor-pointer"
          >
            I Decline This Request
          </Button>
        </div>
      </div>
    </div>
  );
}
