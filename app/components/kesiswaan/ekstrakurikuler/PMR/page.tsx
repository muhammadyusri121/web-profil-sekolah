import TemplatHalaman from "@/components/template/templat_halaman";

export default function PMRPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/ekskul?ekskul_name=PMR`;
    
    return <TemplatHalaman title="PMR" basePath="/ekskul/pmr" apiUrl={apiUrl} />;
}
