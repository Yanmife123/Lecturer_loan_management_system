"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/hooks/useUser";
import { SkeletonHeader } from "@/components/shared/header/dashboard-layout-header-skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Bell, LogOut, Settings, ChevronLeft, PanelLeft } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

function HeaderCollapseButton() {
  const { toggleSidebar, state } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="hidden lg:flex text-foreground/70 hover:text-foreground"
      title={
        state === "expanded"
          ? "Collapse sidebar (Cmd+B)"
          : "Expand sidebar (Cmd+B)"
      }
    >
      <PanelLeft
        className={`w-5 h-5 transition-transform ${state === "collapsed" ? "rotate-180" : ""}`}
      />
    </Button>
  );
}

export function Header() {
  const { user, fullName, loading } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleLogOut = async () => {
    Cookies.remove("token");
    Cookies.remove("user");
    queryClient.clear();
    toast.success("Logout Sucessfully ");
    router.push("/login");
  };
  return (
    <header className="sticky top-0 z-40 w-full bg-card border-b border-[#1B2E5E1A]">
      <div className="flex items-center justify-between px-6 py-5 gap-4">
        {/* Left side - Sidebar trigger and title */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Trigger */}
          <SidebarTrigger className="lg:hidden" />

          {/* Desktop Collapse Toggle Button */}
          <HeaderCollapseButton />

          <h1 className="text-2xl font-medium leading-8 text-primaryT font-sans">
            Admin Dashboard
          </h1>
        </div>

        {/* Right side - Icons and user menu */}
        {loading ? (
          <SkeletonHeader />
        ) : user ? (
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground/70 hover:text-foreground"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="space-y-1 max-md:hidden">
              <div className="text-primaryT text-sm leading-5 font-sans">
                {user.prefix} {user.surname} ({user.role})
              </div>
              <div className="text-[#64748B] font-sans text-xs leading-4">
                Cooperative Officer
              </div>
            </div>
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User"
                    />
                    <AvatarFallback>
                      {user.surname.charAt(0) + user.other_names.charAt(0) ||
                        "NN"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 font-sans">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="text-sm font-semibold text-primaryT">
                    {fullName}
                  </span>
                  <span className="text-xs text-[#1B2E5E]">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={handleLogOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : null}
      </div>
    </header>
  );
}
