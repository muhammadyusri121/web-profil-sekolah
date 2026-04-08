import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sambutan Kepala Sekolah",
  description: "Sambutan resmi Kepala Sekolah SMAN 1 Ketapang Sampang kepada seluruh elemen sekolah dan masyarakat.",
};

export default function SambutanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
