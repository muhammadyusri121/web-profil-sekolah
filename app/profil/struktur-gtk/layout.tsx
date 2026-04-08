import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Struktur Organisasi & GTK",
  description: "Struktur Organisasi, Guru, dan Tenaga Kependidikan SMAN 1 Ketapang Sampang.",
};

export default function StrukturLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
