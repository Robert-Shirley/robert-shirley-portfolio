import "../styles/globals.css";

import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "../components/ui/toaster";
import { cn } from "../lib/utils";
import Providers from "./providers";
export const dynamic = "force-dynamic";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Rob's Portfolio Site",
  description:
    "This is a site showcasing some of my skills and projects. It also contains projects made via The Odin Project",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <NextTopLoader />
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
