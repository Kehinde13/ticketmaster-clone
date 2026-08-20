import type { Metadata, Viewport } from "next";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
