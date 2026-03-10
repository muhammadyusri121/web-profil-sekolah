import TemplatHalaman from "@/components/template/templat_halaman";

export default function JurnalistikPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/ekskul?ekskul_name=Jurnalistik`;
    
    return <TemplatHalaman title="Jurnalistik" basePath="/ekskul/jurnalistik" apiUrl={apiUrl} />;
}
