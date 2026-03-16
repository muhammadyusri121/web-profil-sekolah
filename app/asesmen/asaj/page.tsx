import TemplatHalaman from "@/components/template/templat_halaman";

export default function AsajPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?category=ASAJ`;

    return <TemplatHalaman title="Asesmen Sumatif Akhir Jenjang" basePath="/asaj" apiUrl={apiUrl} pageSlug="asaj" />;
}
