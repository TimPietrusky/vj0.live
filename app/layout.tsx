import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HelpPanel from "../components/help-panel";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vj0.live";

export const metadata: Metadata = {
  title: "vj0",
  description: "generate live visual experiences with simple prompts",
  openGraph: {
    title: "vj0",
    description: "generate live visual experiences with simple prompts",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/preview2.png`,
        width: 1024,
        height: 1024,
        alt: "A screenshot of vj0 with a generated waveform in the center and the nav in the bottom",
      },
    ],
  },
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
