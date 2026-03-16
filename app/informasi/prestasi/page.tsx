import TemplatHalaman from "@/components/template/templat_halaman";

export default function PrestasiPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    // Using KARYA_SISWA as a fallback category for now as discussed in implementation plan
    const apiUrl = `${baseUrl}/api/post?category=KARYA_SISWA`;

    return <TemplatHalaman title="Galeri Prestasi" basePath="/prestasi" apiUrl={apiUrl} pageSlug="prestasi" />;
}
