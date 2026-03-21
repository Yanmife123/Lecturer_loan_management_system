import { NavBarData } from "@/constants/nav";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ConatctUs = [
  {
    id: 1,
    icon: MapPin,
    text: "Redeemer's University, Akoda, Ede, Osun State",
  },
  { id: 2, icon: Phone, text: "+234 803 123 4567" },
  { id: 3, icon: Mail, text: "cooperative@run.edu.ng" },
];

export function Footer() {
  return (
    <footer className="font-sans py-18 bg-primaryT px-4 md:px-8">
      <div className="flex justify-center">
        <div className="w-full max-w-7xl space-y-6">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="space-y-4">
              <div className="flex gap-3 items-center">
                <div>
                  <Image
                    src={"/logo2.svg"}
                    alt="Logo icon"
                    height={40}
                    width={39}
                  />
                </div>
                <div className="">
                  <p className="text-white font-sans text-sm leading-5">
                    Redeemer's University
                  </p>
                  <p className="text-[#FFFFFFB2] text-xs font-normal font-sans">
                    Staff Cooperative
                  </p>
                </div>
              </div>
              <p className="text-[#FFFFFFCC] leading-5 text-sm max-md:max-w-md">
                Empowering Redeemer's University staff through transparent,
                reliable, and accessible cooperative financial services.
              </p>
            </div>
            <div className="grid grid-cols-2">
              <div className="space-y-4">
                <h4 className="text-white text-sm leading-5 font-medium">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {NavBarData.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className="text-[#FFFFFFCC] text-sm leading-5 font-medium"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-white text-sm leading-5 font-medium">
                  Contact Us
                </h4>
                <ul className="space-y-3">
                  {ConatctUs.map((info) => (
                    <li className="flex gap-2 items-center" key={info.id}>
                      <div>
                        <info.icon size={16} color="#fff" />
                      </div>
                      <div className="text-sm leading-5 text-[#FFFFFFCC]">
                        {info.text}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" pt-[33]">
        <div className={"border-t border-[#FFFFFF1A] mb-9"} />
        <p className="text-sm leading-5 text-center text-[#FFFFFFB2]">
          © 2026 Redeemer's University Staff Cooperative Multipurpose Society
          Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
