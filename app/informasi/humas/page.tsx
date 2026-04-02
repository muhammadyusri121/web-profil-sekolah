import TemplatHalaman from "@/components/template/templat_halaman";

export default function HumasPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?category=HUMAS`;

    return <TemplatHalaman title="Humas" basePath="/humas" apiUrl={apiUrl} pageSlug="humas" backPath="/" />;
}
