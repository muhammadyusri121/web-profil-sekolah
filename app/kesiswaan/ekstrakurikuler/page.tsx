import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const ekskulData = [
    { nama: "PMR", slug: "pmr", icon: "/login-logo.png" },
    { nama: "Voli", slug: "voli", icon: "/login-logo.png" },
    { nama: "Basket", slug: "basket", icon: "/login-logo.png" },
    { nama: "Pramuka", slug: "pramuka", icon: "/login-logo.png" },
    { nama: "Paskibraka", slug: "paskibraka", icon: "/login-logo.png" },
    { nama: "Seni Tari", slug: "seni-tari", icon: "/login-logo.png" },
    { nama: "Jurnalistik", slug: "jurnalistik", icon: "/login-logo.png" },
    { nama: "Paduan Suara", slug: "paduan-suara", icon: "/login-logo.png" },
    { nama: "Sains Club", slug: "sains-club", icon: "/login-logo.png" },
];

export default async function EkskulPage() {
    let pageInfo = { 
        title: "Daftar Ekstrakurikuler", 
        content: "Wadah pengembangan diri dan bakat siswa SMAN 1 Ketapang melalui berbagai kegiatan positif." 
    };

    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").replace(/\/$/, "");

    try {
        const infoRes = await fetch(`${baseUrl}/api/post?slug=ekstrakurikuler`, { cache: 'no-store' });
        if (infoRes.ok) {
            const infoData = await infoRes.json();
            if (infoData && infoData.title) {
                pageInfo.title = infoData.title;
                pageInfo.content = infoData.content || "";
            }
        }
    } catch (e) {
        console.warn("Gagal mengambil data header ekskul");
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="grow pt-24 pb-20 md:pt-32 md:pb-32">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    
                    <header className="mb-10 md:mb-16 max-w-3xl">
                        <h1 className="text-3xl md:text-5xl font-[1000] text-slate-900 uppercase tracking-tighter leading-tight mb-4">
                            {pageInfo.title.split(' ')[0]} <span className="text-[#F3C623]">{pageInfo.title.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        {pageInfo.content && (
                            <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                                {pageInfo.content.replace(/<[^>]*>/g, '')}
                            </p>
                        )}
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                        {ekskulData.map((ekskul) => (
                            <Link
                                key={ekskul.slug}
                                href={`/ekskul/${ekskul.slug}`}
                                className="group relative flex items-center gap-4 p-3 md:p-4 bg-white rounded-2xl border border-slate-200 hover:border-[#F3C623] hover:shadow-md transition-all active:scale-[0.98]"
                            >
                                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-slate-50 group-hover:bg-yellow-50 transition-colors overflow-hidden relative p-2">
                                    <Image
                                        src={ekskul.icon}
                                        alt={ekskul.nama}
                                        fill
                                        className="object-contain group-hover:scale-110 transition-transform duration-300 p-2"
                                    />
                                </div>

                                <div className="flex-1 pr-6">
                                    <h2 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-tight leading-tight group-hover:text-[#F3C623] transition-colors">
                                        {ekskul.nama}
                                    </h2>
                                </div>

                                <div className="absolute top-3 right-3 text-slate-300 group-hover:text-[#F3C623] transition-colors">
                                    <ChevronRight size={16} strokeWidth={3} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}