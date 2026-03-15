import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ShareArticle from "@/components/ShareArticle";
import PostCarouselDetail from "./PostCarouselDetail";

export default async function TemplatSlugHalaman({ title, basePath, apiUrl }: any) {
    let post = null;
    try {
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (res.ok) post = await res.json();
    } catch (e) { console.error(e); }

    if (!post) return <div className="min-h-screen flex items-center justify-center">404 Tidak Ditemukan</div>;

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="grow pt-20 px-4 md:px-8">
                <article className="max-w-4xl mx-auto">
                    <Link href={basePath} className="inline-flex items-center gap-2 text-slate-400 hover:text-black font-bold text-sm mb-10 group transition-all">
                        <div className="p-2 rounded-full border border-slate-100 group-hover:border-slate-300"><ArrowLeft size={18} /></div>
                        Kembali
                    </Link>

                    <header className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 bg-yellow-400 text-black text-[10px] font-black uppercase rounded-md">{title}</span>
                            <span className="flex items-center gap-1.5 text-black text-xs font-bold uppercase">
                                <Calendar size={14} className="text-yellow-500" />
                                {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-6xl font-black text-black leading-[1.1] tracking-tighter">{post.title}</h1>
                    </header>

                    <div className="mb-12">
                        <PostCarouselDetail images={post.images} title={post.title} />
                    </div>

                    <div className="bg-gray-100">
                        <div
                            className="prose prose-slate prose-lg md:prose-xl max-w-none 
                            prose-headings:text-black prose-headings:font-black prose-headings:tracking-tighter
                            
                            /* Pengaturan Paragraf */
                            [&_p]:text-black 
                            [&_p]:leading-[1.8] 
                            [&_p]:text-justify 
                            [&_p]:mb-6
                            [&_p]:indent-10 /* Memberi lekukan/menjorok ke dalam pada setiap paragraf */
                            
                            /* Link & Penekanan */
                            prose-strong:text-black prose-strong:font-black
                            prose-a:text-yellow-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                            
                            /* Gambar & List */
                            prose-img:rounded-2xl prose-img:my-10
                            prose-li:text-black prose-li:leading-[1.8]
                            marker:text-yellow-500"
                            dangerouslySetInnerHTML={{ __html: post?.content || "" }}
                        />
                    </div>
                </article>
            </main>
            <div className="pb-4 px-4">
                <div className="max-w-4xl mx-auto border-t border-slate-100 pt-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 text-center">Bagikan Artikel</p>
                    <ShareArticle title={post.title} />
                </div>
            </div>
            <Footer />
        </div>
    );
}