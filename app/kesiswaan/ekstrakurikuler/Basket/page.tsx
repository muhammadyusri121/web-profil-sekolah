import TemplatHalaman from "@/components/template/templat_halaman";

export default function BasketPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/ekskul?ekskul_name=Basket`;
    
    return <TemplatHalaman title="Basket" basePath="/ekskul/basket" apiUrl={apiUrl} />;
}
