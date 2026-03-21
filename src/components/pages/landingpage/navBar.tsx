"use client";

import Image from "next/image";
import { NavBarData } from "@/constants/nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function LandingPageNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="py-4 px-6 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] w-full relative">
      <nav className="flex justify-between items-center">
        {/* Logo */}
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

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex gap-7 items-center">
          {NavBarData.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="font-medium text-sm leading-5 text-primaryT font-sans capitalize"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-3 items-center">
          <Button variant={"outline"} size={"lg"} asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button variant={"default"} size={"lg"} asChild>
            <Link href={"/register"}>Create Account</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 rounded-md text-primaryT"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md z-50 px-6 py-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-4">
            {NavBarData.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="font-medium text-sm leading-5 text-primaryT font-sans capitalize block"
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
            <Button variant={"outline"} size={"lg"} asChild>
              <Link href={"/login"} onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </Button>
            <Button variant={"default"} size={"lg"} asChild>
              <Link href={"/register"} onClick={() => setIsOpen(false)}>
                Create Account
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
