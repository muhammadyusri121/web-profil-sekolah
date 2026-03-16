import TemplatHalaman from "@/components/template/templat_halaman";

export default function KemitraanPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?category=KEMITRAAN`;

    return <TemplatHalaman title="Kemitraan & Kerja Sama" basePath="/kemitraan" apiUrl={apiUrl} pageSlug="kemitraan" />;
}
