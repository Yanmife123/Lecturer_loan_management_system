import { Button } from "@/components/ui/button";
import Link from "next/link";

export function GetStarted() {
  return (
    <div className="bg-primaryT font-sans py-18  px-4 md:px-8">
      <div className="flex justify-center">
        <div className="w-full max-w-7xl space-y-6">
          <div className=" flex flex-col items-center gap-6">
            <h2 className="text-white md:text-4xl text-2xl leading-10 font-medium text-center">
              Ready to Get Started?
            </h2>
            <p className="text-[#FFFFFFE5] leading-6 text-base max-w-166 text-center">
              Join hundreds of staff members who trust us with their financial
              needs.
            </p>
            <Button
              className="py-7 px-5 font-sans font-medium rounded-[16px] text-base"
              variant={"default"}
              asChild
            >
              <Link href={""}>Create Your Account Today</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
