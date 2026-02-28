import Link from "next/link";
import { Calendar, Image as ImageIcon } from "lucide-react";
import Header from "@/components/layout/header";

export default async function DoubleTrackPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    // Ambil semua data dengan kategori DOUBLE_TRACK
    const res = await fetch(`${baseUrl}/api/post?category=DOUBLE_TRACK`, {
        cache: 'no-store'
    });

    const posts = await res.json();

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <Header />
                {/* 1. Bagian Judul Atas */}
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight md:text-5xl">
                        Double Track SMANKA
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Program vokasi dan keterampilan khusus untuk membekali siswa-siswi kami dengan kemampuan siap kerja.
                    </p>
                    <div className="mt-6 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
                </header>

                {/* 2. Grid Card - Menampilkan Semua Konten */}
                {posts && posts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <Link
                                key={post.id}
                                href={`/double-track/${post.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                            >
                                {/* Bagian Gambar */}
                                <div className="relative aspect-video overflow-hidden bg-slate-200">
                                    {post.thumbnail ? (
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            <ImageIcon className="w-12 h-12" />
                                        </div>
                                    )}
                                </div>

                                {/* Bagian Konten: Judul dan Waktu */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center text-slate-400 text-xs mb-3 gap-2">
                                        <Calendar className="w-3 h-3" />
                                        <span>
                                            {post.createdat
                                                ? new Date(post.createdat).toLocaleDateString('id-ID', {
                                                    day: 'numeric', month: 'long', year: 'numeric'
                                                })
                                                : "Februari 2026"}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h2>

                                    <div className="mt-auto pt-4 flex items-center text-blue-600 font-semibold text-sm">
                                        Baca Selengkapnya →
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Tampilan jika data kosong */
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-500">Tidak ada data program Double Track yang ditemukan.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
