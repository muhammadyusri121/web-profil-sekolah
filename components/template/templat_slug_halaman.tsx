import Link from "next/link";
import { Calendar, ChevronLeft } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ShareArticle from "@/components/ShareArticle";
import PostCarouselDetail from "./PostCarouselDetail";
import { AnimatedHeading } from "@/components/ui/animated-heading";

export default async function TemplatSlugHalaman({ title, basePath, apiUrl }: any) {
    let post = null;
    
    // Pastikan URL bersifat absolut untuk fetch di Server Component
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").replace(/\/$/, "");
    const fullApiUrl = apiUrl.startsWith('http') ? apiUrl : `${baseUrl}${apiUrl}`;

    try {
        const res = await fetch(fullApiUrl, { cache: 'no-store' });
        if (res.ok) post = await res.json();
    } catch (e) { 
        console.error("Gagal mengambil detail postingan:", e); 
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-6 text-center">
                <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">Halaman Tidak Ditemukan</h2>
                <Link href={basePath} className="mt-4 text-[10px] font-black uppercase tracking-widest text-yellow-600 hover:underline">Kembali</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans">
            <Header />
            
            <main className="grow pt-24 pb-16 md:pt-32 md:pb-24">
                <article className="max-w-4xl mx-auto px-5 md:px-6">
                    
                    {/* 1. Tombol Kembali Pill Style */}
                    <Link 
                        href={basePath} 
                        className="inline-flex items-center gap-2.5 text-slate-400 hover:text-slate-900 transition-all group mb-10 md:mb-12"
                    >
                        <div className="p-2 rounded-xl bg-white border border-slate-200 group-hover:border-yellow-400 group-hover:shadow-md transition-all">
                            <ChevronLeft size={16} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Kembali</span>
                    </Link>

                    {/* 2. Header Artikel */}
                    <header className="mb-10 md:mb-12">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="px-2.5 py-1 bg-yellow-400 text-black text-[9px] font-black uppercase rounded-lg tracking-widest shadow-sm">
                                {title}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <Calendar size={13} className="text-yellow-500" />
                                {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                        
                        <AnimatedHeading className="text-3xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase mb-6">
                            {post.title}
                        </AnimatedHeading>
                        
                        <div className="w-20 h-1.5 bg-yellow-500 rounded-full" />
                    </header>

                    {/* 3. Media/Carousel */}
                    <div className="mb-12 md:mb-16 rounded-xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-white">
                        <PostCarouselDetail images={post.images} title={post.title} />
                    </div>

                    {/* 4. Konten Artikel */}
                    <div className="relative">
                        <div
                            className="prose prose-slate prose-lg md:prose-xl max-w-none 
                            text-justify hyphens-auto
                            prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
                            prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:mb-8 prose-p:indent-0 md:prose-p:indent-12
                            prose-strong:text-slate-900 prose-strong:font-black
                            prose-a:text-yellow-600 prose-a:font-bold prose-a:no-underline hover:text-slate-900
                            prose-img:rounded-xl prose-img:my-12
                            prose-li:text-slate-700 prose-li:leading-[1.8]
                            marker:text-yellow-500"
                            dangerouslySetInnerHTML={{ __html: post?.content || "" }}
                        />
                    </div>

                    {/* 5. Footer Artikel: Bagikan */}
                    <footer className="mt-20 pt-10 border-t border-slate-200">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-[1px] bg-slate-200" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                                    Bagikan Artikel
                                </span>
                                <div className="w-8 h-[1px] bg-slate-200" />
                            </div>
                            <div className="w-full max-w-xs">
                                <ShareArticle title={post.title} />
                            </div>
                        </div>
                    </footer>
                </article>
            </main>

            <Footer />
        </div>
    );
}