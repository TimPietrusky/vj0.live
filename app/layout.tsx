import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HelpPanel from "../components/help-panel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vj0",
  description: "generate live visual experiences with simple prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
