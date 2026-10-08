import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SCRATCHLZ. — Quiet Form. Sharp Character.",
  description: "SCRATCHLZ. System 001. Technical forms, sharp silhouettes, and objects for the space between.",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
