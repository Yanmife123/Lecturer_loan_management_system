import { Footer } from "@/components/pages/landingpage/footer";
import LandingPageNavBar from "@/components/pages/landingpage/navBar";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className=" scroll-smooth">
      <LandingPageNavBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
