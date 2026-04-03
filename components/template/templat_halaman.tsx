import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, FileStack, ArrowRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { formatDate } from "@/lib/data/post-utils"; 

interface TemplatHalamanProps {
    title: string;
    basePath: string;
    apiUrl: string;
    pageSlug?: string;
    backPath?: string;
}

export default async function TemplatHalaman({ title, basePath, apiUrl, pageSlug, backPath }: TemplatHalamanProps) {
    let posts = [];
    let pageInfo = { title, content: "" };

    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").replace(/\/$/, "");

    try {
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (res.ok) {
            posts = await res.json();
        }

        if (pageSlug) {
            const sectionRes = await fetch(`${baseUrl}/api/sections?slug=${pageSlug}`, { cache: 'no-store' });
            if (sectionRes.ok) {
                const sectionData = await sectionRes.json();
                if (sectionData && sectionData.title) {
                    pageInfo.title = sectionData.title;
                    pageInfo.content = sectionData.description || "";
                } else {
                    const infoRes = await fetch(`${baseUrl}/api/post?slug=${pageSlug}`, { cache: 'no-store' });
                    if (infoRes.ok) {
                        const infoData = await infoRes.json();
                        if (infoData && infoData.title) {
                            pageInfo.title = infoData.title;
                            pageInfo.content = infoData.content || "";
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.warn(`Gagal mengambil data untuk ${title}`);
    }

    const titleParts = pageInfo.title.split(' ');
    const firstWord = titleParts[0];
    const restOfTitle = titleParts.slice(1).join(' ');

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Header />

            <main className="grow pt-24 pb-16 md:pt-32 md:pb-24">
                <div className="max-w-7xl mx-auto px-5 md:px-6">

                    {backPath && (
                        <div className="mb-8 md:mb-10">
                            <Link 
                                href={backPath} 
                                className="inline-flex items-center gap-2.5 text-slate-400 hover:text-slate-900 transition-all group"
                            >
                                <div className="p-2 rounded-xl bg-white border border-slate-200 group-hover:border-yellow-400 group-hover:shadow-md transition-all">
                                    <ChevronLeft size={16} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Kembali</span>
                            </Link>
                        </div>
                    )}

                    <header className="mb-12 md:mb-16">
                        <div className="max-w-3xl">
                            <AnimatedHeading className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                                {firstWord} <span className="text-yellow-500">{restOfTitle}</span>
                            </AnimatedHeading>
                            
                            {pageInfo.content && (
                                <p className="mt-6 text-sm md:text-base text-slate-500 font-medium leading-relaxed text-justify md:text-left hyphens-auto">
                                    {pageInfo.content.replace(/<[^>]*>/g, '')}
                                </p>
                            )}
                        </div>
                    </header>

                    {posts && posts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
                            {posts.map((post: any) => (
                                <article
                                    key={post.id}
                                    className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:bg-yellow-400 hover:border-yellow-500 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Link href={`${basePath}/${post.slug || post.id}`} className="flex h-full flex-col">
                                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-gray-100 group-hover:border-slate-900/10">
                                            <Image
                                                src={post.thumbnail || "/login-logo.png"}
                                                alt={post.title}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 20vw"
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col p-3 md:p-4 space-y-3">
                                            <div className="flex items-start gap-2 md:gap-3">
                                                <span className="text-[8px] md:text-[10px] font-bold text-slate-400 group-hover:text-slate-700 transition-colors uppercase tracking-widest shrink-0 mt-0.5">
                                                    {post.createdAt ? formatDate(post.createdAt) : ""}
                                                </span>
                                                <h3 className="line-clamp-2 flex-1 text-xs md:text-base font-bold leading-tight text-slate-900 transition-colors group-hover:text-black uppercase tracking-tight">
                                                    {post.title}
                                                </h3>
                                            </div>

                                            <div className="mt-auto pt-2 border-t border-gray-50 group-hover:border-slate-900/10">
                                                <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all group-hover:text-slate-900 group-hover:gap-2 duration-300">
                                                    Baca <ArrowRight size={10} className="text-yellow-600 group-hover:text-slate-900" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 px-6 bg-white rounded-xl border border-dashed border-slate-200 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-slate-200 mb-4">
                                <FileStack size={32} />
                            </div>
                            <p className="text-slate-900 text-sm font-black uppercase tracking-widest">
                                Konten Belum Tersedia
                            </p>
                            <p className="mt-1 text-slate-400 text-xs font-medium">
                                Silakan periksa kembali beberapa saat lagi.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}