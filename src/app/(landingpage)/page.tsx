import AboutUs from "@/components/pages/landingpage/about";
import { GetStarted } from "@/components/pages/landingpage/getStarted";
import { HeroSection } from "@/components/pages/landingpage/heroSection";
import LoanTypesSection from "@/components/pages/landingpage/loanTypes";
import LandingPageNavBar from "@/components/pages/landingpage/navBar";
import { Teams } from "@/components/pages/landingpage/team";

export default function LandingPage() {
  return (
    <div className="">
      <HeroSection />
      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          <AboutUs />
        </div>
      </div>
      <LoanTypesSection />
      <Teams />
      <GetStarted />
      <div className="h-17 bg-white"></div>
    </div>
  );
}
