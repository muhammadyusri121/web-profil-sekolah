import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "../public/fonts/Poppins-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Poppins-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Poppins-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Poppins-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Poppins-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/Poppins-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

import GoogleSchema from "@/components/seo/GoogleSchema";

export const metadata: Metadata = {
  metadataBase: new URL("https://sman1ketapang.sch.id"),
  title: {
    default: "SMAN 1 KETAPANG SAMPANG - Sekolah Penggerak Unggul",
    template: "%s | SMAN 1 KETAPANG"
  },
  description: "Website resmi SMAN 1 Ketapang, Kabupaten Sampang. Santun dalam pekerti, unggul dalam prestasi, kondusif dalam edukasi.",
  keywords: ["SMAN 1 Ketapang", "SMA Ketapang", "Sekolah Sampang", "SMA Terbaik Jawa Timur", "Sekolah Penggerak"],
  authors: [{ name: "IT SMAN 1 Ketapang" }],
  creator: "SMAN 1 Ketapang",
  publisher: "SMAN 1 Ketapang",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SMAN 1 KETAPANG SAMPANG",
    description: "Santun dalam pekerti, unggul dalam prestasi, kondusif dalam edukasi.",
    url: "https://sman1ketapang.sch.id",
    siteName: "SMAN 1 Ketapang Sampang",
    images: [
      {
        url: "/login-logo.png",
        width: 800,
        height: 800,
        alt: "Logo SMAN 1 Ketapang",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMAN 1 KETAPANG SAMPANG",
    description: "Website resmi SMAN 1 Ketapang. Unggul dalam prestasi, santun dalam pekerti.",
    images: ["/login-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        <GoogleSchema />
        {children}
      </body>
    </html>
  );
}
