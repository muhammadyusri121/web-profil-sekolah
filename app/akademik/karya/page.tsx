import TemplatHalaman from "@/components/template/templat_halaman";

export default function KaryaPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?category=KARYA_SISWA`;

    return <TemplatHalaman title="Karya Siswa" basePath="/karya" apiUrl={apiUrl} pageSlug="karya" />;
}