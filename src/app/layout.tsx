import "./globals.css";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hyperswitch Next Integration",
  description: "Hyperswitch Next Integration",
  keywords: "juspay, hyperswitch, next, node, react, integration",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
