import TemplatHalaman from "@/components/template/templat_halaman";

export default function SupervisiPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?category=SUPERVISI_GURU`;

    return <TemplatHalaman title="Supervisi Guru" basePath="/supervisi" apiUrl={apiUrl} pageSlug="supervisi-guru" />;
}
