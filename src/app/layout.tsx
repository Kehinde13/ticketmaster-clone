import type { Metadata, Viewport } from "next";

import { DesktopHeader } from "@/components/navigation/desktop-header";
import { MobileBottomNavigation } from "@/components/navigation/mobile-bottom-navigation";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { getServerCountry } from "@/lib/countries.server";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialCountry = await getServerCountry();

  return (
    <html lang="en">
      <body>
        <Providers initialCountryCode={initialCountry.code}>
          <DesktopHeader />
          <MobileNavigation />
          <div className="pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0">{children}</div>
          <MobileBottomNavigation />
        </Providers>
      </body>
    </html>
  );
}
