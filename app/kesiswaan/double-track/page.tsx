import TemplatHalaman from "@/components/template/templat_halaman";

export default function DoubleTrackPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?category=DOUBLE_TRACK`;

    return <TemplatHalaman title="Double Track" basePath="/double-track" apiUrl={apiUrl} />;
}