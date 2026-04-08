import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalender Akademik",
  description: "Kalender akademik resmi SMAN 1 Ketapang Sampang untuk tahun ajaran berjalan.",
};

export default function KalenderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
