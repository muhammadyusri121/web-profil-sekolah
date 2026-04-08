import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mars Sekolah",
  description: "Lirik dan nilai-nilai luhur dalam Mars SMAN 1 Ketapang Sampang.",
};

export default function MarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
