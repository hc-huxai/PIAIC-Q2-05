import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "@hc-huxai: PIAIC-Q2-05",
  description: "Assignment: Form Handling and Validation using Yup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "overflow-x-hidden")}>
        <Header />
        {children}
      </body>
    </html>
  );
}
