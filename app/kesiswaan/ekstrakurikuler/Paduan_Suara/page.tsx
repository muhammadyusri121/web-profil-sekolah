import TemplatHalaman from "@/components/template/templat_halaman";

export default function PaduanSuaraPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/ekskul?ekskul_name=Paduan_Suara`;
    
    return <TemplatHalaman title="Paduan Suara" basePath="/ekskul/paduan-suara" apiUrl={apiUrl} pageSlug="ekskul-paduan-suara" backPath="/kesiswaan/ekstrakurikuler" />;
}
