import TemplatHalaman from "@/components/template/templat_halaman";

export default function AsasPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?category=ASAS`;

    return <TemplatHalaman title="Asesmen Sumatif Akhir Semester" basePath="/asas" apiUrl={apiUrl} pageSlug="asas" backPath="/" />;
}
