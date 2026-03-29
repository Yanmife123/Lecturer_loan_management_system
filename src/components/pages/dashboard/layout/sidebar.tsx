"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Collapsible } from "radix-ui";
import {
  User,
  FileText,
  Settings,
  LayoutGrid,
  PiggyBank,
  History,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "My Savings", href: "/dashboard/savings", icon: PiggyBank },
  { label: "Apply for Loan", href: "/dashboard/loans", icon: FileText },
  { label: "Loan History", href: "/dashboard/loan-History", icon: History },
  { label: "My Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const Path = usePathname();

  return (
    <Sidebar className="bg-[#F8F9FA] ">
      {/* Sidebar Header with Logo */}
      <SidebarHeader className="border-b border-[#1B2E5E1A] px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="Logo icon" height={40} width={39} />
          {state === "expanded" && (
            <div className="">
              <p className="text-primaryT font-sans text-sm leading-5">
                Redeemer's University
              </p>
              <p className="text-[#64748B] text-xs font-normal font-sans">
                Staff Portal
              </p>
            </div>
          )}
        </Link>
      </SidebarHeader>

      {/* Sidebar Content with Navigation */}

      <SidebarContent className="py-5 px-6 font-sans">
        <SidebarMenu className="space-y-2  ">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const IsPath =
              item.href === "/dashboard"
                ? Path === item.href
                : Path.includes(item.href);
            return (
              <SidebarMenuItem key={item.href} className="">
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  className={` ${IsPath ? "bg-[#1B2E5E] text-white hover:text-white hover:bg-primaryT duration-300" : " text-primaryT bg-transparent hover:text-primaryT duration-300"}   px-4 py-4  rounded-[16px] h-10.75 `}
                >
                  <Link href={item.href}>
                    <Icon className="w-5 h-5" />
                    <span className="text-sm leading-5 font-medium">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="border-t">
        {/* <div className="text-xs text-sidebar-foreground/50 px-2 py-1">
          <p>© 2024 Dashboard</p>
          <p>v1.0.0</p>
        </div> */}
      </SidebarFooter>
    </Sidebar>
  );
}
