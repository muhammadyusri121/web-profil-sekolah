import TemplatHalaman from "@/components/template/templat_halaman";

export default function SainsClubPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/ekskul?ekskul_name=Sains_Club`;
    
    return <TemplatHalaman title="Sains Club" basePath="/ekskul/sains-club" apiUrl={apiUrl} pageSlug="ekskul-sains-club" backPath="/kesiswaan/ekstrakurikuler" />;
}
