"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PencilIcon } from "lucide-react";
import ProfileInfo from "./profile-info";
import NextOfKin from "./next-of-kin";
import ProfileSidebar from "./profile-sidebar";

export default function ProfileComponent() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex gap-8  p-0 max-w-7xl mx-auto lg:flex-row flex-col max-lg:items-center">
        {/* Sidebar */}
        <ProfileSidebar />

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <ProfileInfo />
          <NextOfKin />
        </div>
      </main>
    </div>
  );
}
