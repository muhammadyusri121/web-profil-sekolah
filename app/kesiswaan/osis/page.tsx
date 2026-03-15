import TemplatHalaman from "@/components/template/templat_halaman";

export default function OsisPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?category=OSIS_MPK`;

    return <TemplatHalaman title="Informasi OSIS & MPK" basePath="/osis" apiUrl={apiUrl} />;
}