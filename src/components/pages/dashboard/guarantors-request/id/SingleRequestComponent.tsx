import { Card } from "@/components/ui/card";
import Image from "next/image";
export function GuarantorRequestDetails() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex gap-3 items-center">
          <div>
            <Image src={"/logo.svg"} alt="Logo icon" height={40} width={39} />
          </div>
          <div className="max-md:hidden">
            <p className="text-primaryT font-sans text-sm leading-5">
              Redeemer's University
            </p>
            <p className="text-[#64748B] text-xs font-normal font-sans">
              Staff Cooperative
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
