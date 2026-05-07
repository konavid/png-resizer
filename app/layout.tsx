import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PNG Print Pack Resizer",
  description: "개인용 PNG 인쇄 비율 팩 리사이저",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50`}
      >
        {children}
      </body>
    </html>
  );
}
