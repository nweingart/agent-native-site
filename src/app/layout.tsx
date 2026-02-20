import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "agent-native: Timeline UI for AI agents",
  description:
    "A headless React timeline component for agent interfaces. Steps, parallel tiers, approval gates, elapsed time.",
  openGraph: {
    title: "agent-native: Timeline UI for AI agents",
    description:
      "A headless React timeline component for agent interfaces. Steps, parallel tiers, approval gates, elapsed time.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "agent-native: Timeline UI for AI agents",
    description:
      "A headless React timeline component for agent interfaces.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
