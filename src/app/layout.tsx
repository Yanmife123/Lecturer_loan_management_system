import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "@/components/styles/sonner.css";
import QueryProvider from "@/components/provider/tanstack/QueryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plusJS",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Run Cooperative Society",
  description: "Redeemer's University Cooperative Society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable}  antialiased scroll-smooth`}
      >
        <QueryProvider>
          {" "}
          <TooltipProvider>{children}</TooltipProvider>{" "}
        </QueryProvider>
        <Toaster
          position="top-right"
          toastOptions={{ classNames: { toast: "coop-toast" } }}
        />
      </body>
    </html>
  );
}
