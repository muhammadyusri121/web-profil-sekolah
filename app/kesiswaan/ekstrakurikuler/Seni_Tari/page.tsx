import TemplatHalaman from "@/components/template/templat_halaman";

export default function SeniTariPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/ekskul?ekskul_name=Seni_Tari`;
    
    return <TemplatHalaman title="Seni Tari" basePath="/ekskul/seni-tari" apiUrl={apiUrl} pageSlug="ekskul-seni-tari" backPath="/kesiswaan/ekstrakurikuler" />;
}
