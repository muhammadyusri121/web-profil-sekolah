import TemplatHalaman from "@/components/template/templat_halaman";

export default function KomitePage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?category=KOMITE`;

    return <TemplatHalaman title="Komite" basePath="/komite" apiUrl={apiUrl} pageSlug="komite" />;
}
