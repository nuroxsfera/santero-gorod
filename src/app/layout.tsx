import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const logoFont = Rubik({
  variable: "--font-logo",
  subsets: ["latin", "cyrillic"],
  weight: ["900"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Santero Город",
  description: "Всё для жизни в городах России. Транспорт, события, работа, места — в одном приложении.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} ${logoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
