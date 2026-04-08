import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OSIS & MPK",
  description: "Organisasi Siswa Intra Sekolah (OSIS) dan Majelis Perwakilan Kelas (MPK) SMAN 1 Ketapang Sampang.",
};

export default function OsisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
