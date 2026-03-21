import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export function HeroSection() {
  return (
    <div
      className="lg:h-140 h-100  w-full bg-[linear-gradient(90deg,rgba(27,46,94,0.9)_0%,rgba(27,46,94,0.7)_100%)] relative"
      id="home"
    >
      <div className="absolute h-full w-full">
        <Image
          src={"/landingpage/hero.jpg"}
          alt="hero image"
          fill
          className="object-cover object-center -z-1"
        />
      </div>
      <div className="flex justify-center items-center space-y-4 h-full">
        <div className="space-y-4">
          <h1 className="font-sans lg:leading-15 leading-9 font-medium lg:text-6xl text-3xl text-white text-center">
            Empowering Staff Through Cooperative Finance
          </h1>
          <p className="font-sans lg:text-2xl text-base lg:leading-8 leading-5 text-[#FFFFFFE5] text-center">
            Fast, transparent, and reliable loan services for Redeemer's
            University staff members.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant={"default"}
              className="py-7 px-5 font-sans font-medium text-base rounded-[16px]"
              //   size={"lg"}
              asChild
            >
              <Link href={""}> Apply for a Loan</Link>
            </Button>
            <Button
              variant={"secondary"}
              className="py-7 px-5 font-sans font-medium rounded-[16px] text-base"
              //   size={"lg"}
              asChild
            >
              <Link href={""}> Learn more</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
