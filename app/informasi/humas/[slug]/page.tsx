import TemplatSlugHalaman from "@/components/template/templat_slug_halaman";

export default async function DetailHumasPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?slug=${slug}`;

    return <TemplatSlugHalaman title="Humas" basePath="/humas" apiUrl={apiUrl} />;
}
