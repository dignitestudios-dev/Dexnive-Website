import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sooner";

export const satoshi = localFont({
  src: [
    {
      path: "./fonts/satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dexnive.com"),
  title: "Mobile App Development Company for Modern App | Dexnive",
  description:
    "Top Mobile app development company helping businesses through delivering custom, scalable, and high-performing mobile apps through a reliable process.",
  openGraph: {
    type: "website",
    siteName: "Dexnive",
    images: [
      {
        url: "/logo2.png",
        width: 1200,
        height: 630,
        alt: "Dexnive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={` ${satoshi.variable} overflow-x-hidden antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
