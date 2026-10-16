import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import { PwaRegister } from "./ui/PwaRegister";
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
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Santero Город",
  description:
    "Цифровое пространство города: карта, новости, работа и сервисы — в одном месте.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Santero Город",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#058bed",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} ${logoFont.variable} h-full`}
    >
      <body className="h-full overflow-hidden antialiased">
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
