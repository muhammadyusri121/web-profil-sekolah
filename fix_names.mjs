import fs from 'fs';
import path from 'path';

const baseDir = "d:/26/web-profil-sekolah/app/components/kesiswaan/ekstrakurikuler";
const ekskuls = ["Seni_Tari", "Paduan_Suara", "Sains_Club"];

ekskuls.forEach(ekskul => {
    const pagePath = path.join(baseDir, ekskul, "page.tsx");
    let content = fs.readFileSync(pagePath, "utf8");
    const wrongName = ekskul.replace(/_/g, " ");
    content = content.replace("ekskul_name=" + wrongName, "ekskul_name=" + ekskul);
    fs.writeFileSync(pagePath, content);
});

console.log("Done fixing DB names.");
