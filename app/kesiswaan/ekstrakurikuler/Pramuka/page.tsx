import TemplatHalaman from "@/components/template/templat_halaman";

export default function PramukaPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/ekskul?ekskul_name=Pramuka`;
    
    return <TemplatHalaman title="Pramuka" basePath="/ekskul/pramuka" apiUrl={apiUrl} pageSlug="ekskul-pramuka" />;
}
