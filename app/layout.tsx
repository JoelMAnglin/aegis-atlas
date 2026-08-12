import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aegis Atlas — Integration Intelligence",
  description: "See every API and third-party connection, catch breaks early, reduce integration cost, and enforce zero-trust access.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Aegis Atlas", description: "Every connection. Verified.", images: [{ url: "/og.png", width: 1536, height: 1024 }] },
  twitter: { card: "summary_large_image", title: "Aegis Atlas", description: "Every connection. Verified.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
