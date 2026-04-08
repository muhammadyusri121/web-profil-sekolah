import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Sekolah",
  description: "Layanan pendidikan dan administrasi mandiri untuk siswa dan orang tua SMAN 1 Ketapang Sampang.",
};

export default function LayananLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
