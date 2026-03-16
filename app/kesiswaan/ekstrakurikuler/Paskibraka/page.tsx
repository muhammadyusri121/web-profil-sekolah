import TemplatHalaman from "@/components/template/templat_halaman";

export default function PaskibrakaPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/ekskul?ekskul_name=Paskibraka`;
    
    return <TemplatHalaman title="Paskibraka" basePath="/ekskul/paskibraka" apiUrl={apiUrl} pageSlug="ekskul-paskibraka" />;
}
