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

export const metadata: Metadata = {
  title: "SMAN 1 KETAPANG KABUPATEN SAMPANG - Santun dalam pekerti, unggul dalam prestasi, kondusif dalam edukasi",
  description: "Santun dalam pekerti, unggul dalam prestasi, kondusif dalam edukasi",
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
        {children}
      </body>
    </html>
  );
}
