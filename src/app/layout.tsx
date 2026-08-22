import type { Metadata, Viewport } from "next";

import { DesktopHeader } from "@/components/navigation/desktop-header";
import { MobileBottomNavigation } from "@/components/navigation/mobile-bottom-navigation";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import "@/lib/env/server";

import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  applicationName: "Ticketmaster",
  title: "Ticketmaster",
  description: "A ticket discovery and management web application.",
  appleWebApp: {
    capable: true,
    title: "Ticketmaster",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#026cdf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DesktopHeader />
        <MobileNavigation />
        <div className="pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0">
          <Providers>{children}</Providers>
        </div>
        <MobileBottomNavigation />
      </body>
    </html>
  );
}
