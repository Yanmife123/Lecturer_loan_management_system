"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Collapsible } from "radix-ui";
import { FileText, LayoutGrid, Wallet2, Users, TrendingUp } from "lucide-react";
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
  { label: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutGrid },
  // { label: "My Savings", href: "/dashboard/savings", icon: PiggyBank },
  {
    label: "Loan Requests",
    href: "/admin/dashboard/loans-requests",
    icon: FileText,
  },
  {
    label: "Saving Records",
    href: "/admin/dashboard/savings",
    icon: Wallet2,
  },
  {
    label: "Loan Records",
    href: "/admin/dashboard/loans-records",
    icon: TrendingUp,
  },
  {
    label: "Member Profiles",
    href: "/admin/dashboard/members",
    icon: Users,
  },
  // { label: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const Path = usePathname();

  return (
    <Sidebar className="bg-[#0D1A35]">
      {/* Sidebar Header with Logo */}
      <SidebarHeader className="border-b border-[#1B2E5E1A] px-6 py-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src={"/logo3.svg"} alt="Logo icon" height={40} width={39} />
          <div className="">
            <p className="text-white font-sans text-sm leading-5">
              Admin Portal
            </p>
            <p className="text-[#FFFFFF99] text-xs font-normal font-sans">
              Cooperative Society
            </p>
          </div>
        </Link>
      </SidebarHeader>

      {/* Sidebar Content with Navigation */}

      <SidebarContent className="py-5 px-6 font-sans">
        <SidebarMenu className="space-y-2  ">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const IsPath =
              item.href === "/admin/dashboard"
                ? Path === item.href
                : Path.includes(item.href);
            return (
              <SidebarMenuItem key={item.href} className="">
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  className={` ${IsPath ? "bg-[#C89B2A] text-white hover:text-white hover:bg-[#C89B2A] duration-300" : " text-[#FFFFFFB2] bg-transparent hover:text-white hover:bg-[#C89B2A] duration-300"}   px-4 py-4  rounded-[16px] h-10.75 `}
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
          <SidebarMenuItem className="">
            <SidebarMenuButton
              asChild
              tooltip="Member Dashboard"
              className={` ${Path === "/dashboard" ? "bg-[#C89B2A] text-white hover:text-white hover:bg-[#C89B2A] duration-300" : " text-[#FFFFFFB2] bg-transparent hover:text-white hover:bg-[#C89B2A] duration-300"}   px-4 py-4  rounded-[16px] h-10.75`}
            >
              <Link href={"/dashboard"}>
                <LayoutGrid className="w-5 h-5" />
                <span className="text-sm leading-5 font-medium">
                  Member Dashboard
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
