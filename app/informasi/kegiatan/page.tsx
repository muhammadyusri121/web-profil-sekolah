import TemplatHalaman from "@/components/template/templat_halaman";

export default function KegiatanPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    // Using HUMAS as a fallback category for now as discussed in implementation plan
    const apiUrl = `${baseUrl}/api/post?category=HUMAS`;

    return <TemplatHalaman title="Kegiatan Sekolah" basePath="/kegiatan" apiUrl={apiUrl} pageSlug="kegiatan" />;
}
