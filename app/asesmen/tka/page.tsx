import TemplatHalaman from "@/components/template/templat_halaman";

export default function TkaPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?category=TKA`;

    return <TemplatHalaman title="Tes Kemampuan Akademik" basePath="/tka" apiUrl={apiUrl} />;
}
