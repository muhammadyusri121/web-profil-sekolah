import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ekstrakurikuler",
  description: "Daftar kegiatan ekstrakurikuler untuk pengembangan bakat dan minat siswa di SMAN 1 Ketapang Sampang.",
};

export default function EkskulLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
