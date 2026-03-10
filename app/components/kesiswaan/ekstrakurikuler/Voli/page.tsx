import TemplatHalaman from "@/components/template/templat_halaman";

export default function VoliPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/ekskul?ekskul_name=Voli`;
    
    return <TemplatHalaman title="Voli" basePath="/ekskul/voli" apiUrl={apiUrl} />;
}
