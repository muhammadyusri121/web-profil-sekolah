import Link from "next/link";
import { Calendar, Image as ImageIcon, ArrowRight, ClipboardCheck } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default async function ASASPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
        const res = await fetch(`${baseUrl}/api/post?category=ASAS`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }

        const posts = await res.json();

        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Header />
                <main className="grow pt-32 pb-16 px-5 md:px-8">
                    <div className="max-w-[1400px] mx-auto">

                        {/* Page Header */}
                        <div className="mb-12 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-600 rounded-2xl mb-4 border border-yellow-100">
                                <ClipboardCheck size={20} />
                                <span className="text-xs font-black uppercase tracking-widest">Asesmen</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-yellow-900 tracking-tight mb-4">
                                ASAS <span className="text-yellow-500">(Sumatif)</span>
                            </h1>
                            <p className="text-yellow-600/70 max-w-2xl font-medium">
                                Informasi dan hasil pelaksanaan Asesmen Sumatif Akhir Semester (ASAS) SMAN 1 Ketapang.
                            </p>
                        </div>

                        {posts && posts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {posts.map((post: any) => (
                                    <Link
                                        key={post.id}
                                        href={`/karya/${post.slug}`} // Assuming using karya template for details
                                        className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-yellow-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="relative aspect-video w-full overflow-hidden bg-yellow-50">
                                            {post.thumbnail ? (
                                                <img
                                                    src={post.thumbnail}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-yellow-200">
                                                    <ImageIcon className="w-10 h-10" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-5 flex flex-col grow">
                                            <div className="flex items-center gap-2 text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-3">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>
                                                    {post.createdat
                                                        ? new Date(post.createdat).toLocaleDateString('id-ID', {
                                                            day: 'numeric', month: 'long', year: 'numeric'
                                                        })
                                                        : "-"}
                                                </span>
                                            </div>

                                            <h2 className="text-sm font-bold text-yellow-950 leading-snug line-clamp-2 group-hover:text-yellow-600 transition-colors duration-300">
                                                {post.title}
                                            </h2>

                                            <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black text-yellow-600 uppercase tracking-widest">
                                                Baca Selengkapnya
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 px-6 bg-white rounded-[40px] border-2 border-dashed border-yellow-100 italic text-yellow-400">
                                Belum ada data tersedia.
                            </div>
                        )}

                    </div>
                </main>
                <Footer />
            </div>
        );
    } catch (err) {
        return <div className="p-20 text-center">Terjadi kesalahan saat memuat data.</div>;
    }
}
