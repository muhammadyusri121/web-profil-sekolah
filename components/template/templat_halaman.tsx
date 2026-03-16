import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AutoCarouselCard from "./AutoCarouselCard";

interface TemplatHalamanProps {
    title: string;
    basePath: string;
    apiUrl: string;
    pageSlug?: string;
}

export default async function TemplatHalaman({ title, basePath, apiUrl, pageSlug }: TemplatHalamanProps) {
    let posts = [];
    let pageInfo = { title, content: "" };

    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").replace(/\/$/, "");

    try {
        // Fetch posts list
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (res.ok) {
            posts = await res.json();
        }

        // Fetch dynamic page info if pageSlug is provided
        if (pageSlug) {
            const infoRes = await fetch(`${baseUrl}/api/post?slug=${pageSlug}`, { cache: 'no-store' });
            if (infoRes.ok) {
                const infoData = await infoRes.json();
                if (infoData && infoData.title) {
                    pageInfo.title = infoData.title;
                    pageInfo.content = infoData.content || "";
                }
            }
        }
    } catch (e) {
        console.warn(`Gagal mengambil data untuk ${title}`);
    }

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />
            <main className="grow pt-24 pb-12 px-4 md:px-6">
                <div className="max-w-[1400px] mx-auto">
                    
                    {/* Header Dinamis */}
                    <header className="mb-10 md:mb-16 max-w-3xl">
                        <h1 className="text-3xl md:text-5xl font-[1000] text-slate-900 uppercase tracking-tighter leading-tight mb-4">
                            {pageInfo.title}
                        </h1>
                        {pageInfo.content && (
                            <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                                {pageInfo.content.replace(/<[^>]*>/g, '')}
                            </p>
                        )}
                    </header>

                    {posts && posts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {posts.map((post: any) => (
                                <AutoCarouselCard 
                                    key={post.id} 
                                    post={post} 
                                    basePath={basePath} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 px-6 bg-yellow-50/20 rounded-xl border border-dashed border-yellow-200">
                            <p className="text-black text-sm font-medium italic uppercase tracking-widest">
                                Konten Belum Tersedia
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}