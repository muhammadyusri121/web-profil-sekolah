import fs from 'fs';
import path from 'path';

const baseDir = "d:/26/web-profil-sekolah/app/components/kesiswaan/ekstrakurikuler";
const ekskuls = ["Paskibraka", "Pramuka", "Basket", "Voli", "Seni_Tari", "Jurnalistik", "Paduan_Suara", "Sains_Club", "PMR"];

ekskuls.forEach(ekskul => {
    const name = ekskul.replace(/_/g, " ");
    const slug = ekskul.toLowerCase().replace(/_/g, "-");
    const componentName = ekskul.replace(/_/g, "");
    
    // Update main List page
    const pagePath = path.join(baseDir, ekskul, "page.tsx");
    const content = `import TemplatHalaman from "@/components/template/templat_halaman";

export default function ${componentName}Page() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = \`\${baseUrl}/api/ekskul?ekskul_name=${name}\`;
    
    return <TemplatHalaman title="${name}" basePath="/ekskul/${slug}" apiUrl={apiUrl} />;
}
`;
    fs.writeFileSync(pagePath, content);

    // Update Detail Slug page
    const slugPagePath = path.join(baseDir, ekskul, "[slug]", "page.tsx");
    const slugContent = `import TemplatSlugHalaman from "@/components/template/templat_slug_halaman";

export default async function Detail${componentName}Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = \`\${baseUrl}/api/ekskul?slug=\${slug}\`;

    return <TemplatSlugHalaman title="${name}" basePath="/ekskul/${slug}" apiUrl={apiUrl} />;
}
`;
    fs.writeFileSync(slugPagePath, slugContent);
});

console.log("Selesai mengupdate 18 halaman file.");
