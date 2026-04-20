"use client";
import ProfileInfo from "./profile-info";
import NextOfKin from "./next-of-kin";
import ProfileSidebar from "./profile-sidebar";
import { Me } from "@/lib/api/auth/auth";
import { useQuery } from "@tanstack/react-query";
import ProfileSidebarSkeleton from "@/components/shared/skeleton/profile/sekeleton-profile-sidebar";
import ProfileInfoSkeleton from "@/components/shared/skeleton/profile/profile-info-skeleton";

export default function ProfileComponent() {
  const {
    data: ProfileData,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["myProfileData"],
    queryFn: Me,
  });
  return (
    <div className="min-h-screen bg-background">
      <main className="flex gap-8  p-0 max-w-7xl mx-auto lg:flex-row flex-col max-lg:items-center">
        {/* Sidebar */}
        {isLoading && <ProfileSidebarSkeleton />}

        {!isLoading && ProfileData && (
          <ProfileSidebar data={ProfileData.data} />
        )}
        {/* Main Content */}
        {isLoading && (
          <div className="flex-1 space-y-6">
            {/* <ProfileInfoSkeleton /> */}
            <ProfileInfoSkeleton />
          </div>
        )}
        {!isLoading && (
          <div className="flex-1 space-y-6">
            <ProfileInfo data={ProfileData.data} />
            <NextOfKin data={ProfileData.data} />
          </div>
        )}
      </main>
    </div>
  );
}
