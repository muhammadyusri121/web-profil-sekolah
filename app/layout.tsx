import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"], // Kita ambil semua bobot untuk mendukung font-black dsb.
  variable: "--font-poppins", // Membuat CSS variable
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
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
