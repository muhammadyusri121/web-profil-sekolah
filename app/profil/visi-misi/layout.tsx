import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visi & Misi",
  description: "Visi dan Misi resmi SMAN 1 Ketapang Sampang - Santun dalam pekerti, unggul dalam prestasi, kondusif dalam edukasi.",
};

export default function VisiMisiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
