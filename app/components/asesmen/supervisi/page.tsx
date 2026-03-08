export const dynamic = 'force-dynamic';

import Link from "next/link";
import { Calendar, Image as ImageIcon, ArrowRight, ClipboardCheck } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default async function SupervisiListPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
        const res = await fetch(`${baseUrl}/api/post?category=SUPERVISI_GURU`, {
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
                                Supervisi <span className="text-yellow-500">Guru</span>
                            </h1>
                            <p className="text-yellow-600/70 max-w-2xl font-medium">
                                Laporan dan dokumentasi kegiatan supervisi akademik guru SMAN 1 Ketapang untuk penjaminan mutu pembelajaran.
                            </p>
                        </div>

                        {posts && posts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {posts.map((post: any) => (
                                    <Link
                                        key={post.id}
                                        href={`/components/asesmen/supervisi/${post.slug}`}
                                        className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-yellow-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
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
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

                                            <h2 className="text-base font-bold text-yellow-950 leading-snug line-clamp-2 group-hover:text-yellow-600 transition-colors duration-300 mb-4">
                                                {post.title}
                                            </h2>

                                            <div className="mt-auto pt-4 border-t border-yellow-50 flex items-center gap-2 text-[10px] font-black text-yellow-600 uppercase tracking-widest group-hover:text-yellow-700 transition-colors">
                                                Baca Laporan
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 px-6 bg-white rounded-[40px] border-2 border-dashed border-yellow-100">
                                <div className="w-20 h-20 bg-yellow-50 rounded-3xl flex items-center justify-center mb-6 text-yellow-200">
                                    <ClipboardCheck size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-yellow-900 mb-2">Belum Ada Data</h3>
                                <p className="text-yellow-500 font-medium text-center max-w-xs text-sm">Data laporan supervisi guru belum tersedia atau belum dipublikasikan.</p>
                            </div>
                        )}

                    </div>
                </main>

                <Footer />
            </div>
        );
    } catch (err) {
        console.error("Supervisi List Error:", err);
        return (
            <div className="min-h-screen flex items-center justify-center bg-yellow-50">
                <div className="text-center p-8 bg-white rounded-3xl border border-yellow-100 shadow-xl max-w-sm">
                    <h2 className="text-2xl font-black text-red-500 mb-4">Error Terjadi</h2>
                    <p className="text-yellow-700 font-medium mb-6">Gagal memuat data dari server. Pastikan API berjalan.</p>
                    <Link href="/" className="px-6 py-3 bg-yellow-400 text-yellow-900 font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-yellow-500 transition-colors">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }
}
