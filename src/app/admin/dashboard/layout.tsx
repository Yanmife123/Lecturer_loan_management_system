import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/pages/admin/layout/sidebar";
import { Header } from "@/components/pages/admin/layout/header";
export default function AdminDashboardLayout({
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
          <main className="flex-1 overflow-auto p-6 font-sans bg-[#F1F3F5]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
