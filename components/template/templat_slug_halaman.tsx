import Link from "next/link";
import { Calendar, ChevronLeft, User2 } from "lucide-react";
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
                        className="inline-flex items-center gap-2.5 text-slate-900 hover:text-slate-900 transition-all group mb-10 md:mb-12"
                    >
                        <div className="p-2 rounded-xl bg-white border border-slate-200 group-hover:border-yellow-400 group-hover:shadow-md transition-all">
                            <ChevronLeft size={16} />
                        </div>
                        <span className="text-[10px] md:text-xl font-black uppercase tracking-[0.2em]">Kembali</span>
                    </Link>

                    {/* 2. Header Artikel */}
                    <header className="mb-10 md:mb-12">
                        <div className="flex flex-col gap-3 mb-6">
  
                            {/* Baris atas: kategori + tanggal */}
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="px-2.5 py-1 bg-yellow-400 text-black text-[12px] font-black uppercase rounded-xl tracking-widest shadow-sm">
                                {title}
                                </span>

                                <div className="flex items-center font-bold gap-1.5 text-[12px] text-slate-900 uppercase tracking-widest">
                                <Calendar size={13} className="text-yellow-500" />
                                {new Date(post.createdAt).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })} • {new Date(post.createdAt).toLocaleTimeString('id-ID', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })} WIB
                                </div>
                            </div>

                            {/* Baris bawah: penulis */}
                            {post.author_name && (
                                <div className="flex items-center gap-1.5 text-[12px] font-bold text-slate-900 uppercase tracking-widest">
                                <User2 size={13} className="text-yellow-500" />
                                <span>Penulis: {post.author_name}</span>
                                </div>
                            )}

                            </div>
                        
                        <AnimatedHeading className="text-3xl md:text-6xl font-black text-center text-slate-900 leading-[1.1] tracking-tighter uppercase mb-6">
                            {post.title}
                        </AnimatedHeading>
                    </header>

                    {/* 3. Media/Carousel */}
                    <div className="mb-12 md:mb-16 rounded-xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-white">
                        <PostCarouselDetail images={post.images} title={post.title} />
                    </div>

                    {/* 4. Konten Artikel */}
                    <div className="relative">
                        <div
                            className="prose prose-slate prose-lg md:prose-xl max-w-none 
                            text-left
                            prose-headings:text-slate-950 prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
                            prose-p:text-slate-800 prose-p:leading-[1.9] prose-p:mb-10
                            prose-strong:text-slate-950 prose-strong:font-black
                            prose-em:italic prose-em:text-slate-800
                            prose-u:underline prose-u:decoration-yellow-400/60 prose-u:underline-offset-4
                            prose-a:text-blue-700 prose-a:font-bold prose-a:underline prose-a:decoration-blue-200 hover:prose-a:text-blue-900 hover:prose-a:decoration-blue-500 transition-all
                            prose-img:rounded-2xl prose-img:my-14 prose-img:shadow-2xl prose-img:border prose-img:border-slate-100
                            prose-li:text-slate-800 prose-li:leading-[1.8] prose-li:mb-4
                            prose-blockquote:border-l-8 prose-blockquote:border-yellow-500 prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-slate-700 prose-blockquote:font-medium
                            prose-table:border-2 prose-table:border-slate-100 prose-table:rounded-2xl prose-table:overflow-hidden 
                            prose-th:bg-slate-100 prose-th:px-6 prose-th:py-4 prose-th:text-slate-950 prose-th:border-b-2
                            prose-td:px-6 prose-td:py-4 prose-td:border-b prose-td:text-slate-700
                            prose-hr:border-slate-200 prose-hr:my-20
                            marker:text-yellow-600 marker:font-black"
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