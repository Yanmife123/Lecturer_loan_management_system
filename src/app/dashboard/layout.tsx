import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/pages/dashboard/layout/sidebar";
import { Header } from "@/components/pages/dashboard/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 overflow-auto md:p-6 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
