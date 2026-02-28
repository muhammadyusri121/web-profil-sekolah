export default async function DetailOsisPage({ params }: { params: Promise<{ slug: string }> }) {
    // 1. WAJIB Await params di Next.js 15
    const { slug } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
        // 2. Fetch data spesifik berdasarkan slug
        const res = await fetch(`${baseUrl}/api/post?slug=${slug}`, { cache: 'no-store' });

        if (!res.ok) return <div className="p-20 text-center">Server Error ({res.status})</div>;

        const post = await res.json();

        // 3. Cek jika data post kosong
        if (!post) {
            return (
                <div className="p-20 text-center">
                    <h1 className="text-2xl font-bold">Artikel OSIS Tidak Ditemukan</h1>
                    <a href="/osis" className="text-blue-600 mt-4 inline-block"> Kembali ke Daftar OSIS</a>
                </div>
            );
        }

        return (
            <article className="min-h-screen bg-white">
                {/* Header Gambar Utama */}
                <div className="w-full h-[300px] md:h-[500px] relative bg-slate-200">
                    <img
                        src={post.thumbnail || "https://placehold.co/1200x600?text=Gambar+Tidak+Ada"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Konten Artikel */}
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="mb-8">
                        <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
                            Kategori: {post.category || "OSIS"}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 leading-tight">
                            {post.title}
                        </h1>
                        <p className="text-slate-400 mt-4 text-sm">
                            Diposting pada: {post.createdat ? new Date(post.createdat).toLocaleDateString('id-ID') : 'Februari 2026'}
                        </p>
                    </div>

                    <hr className="mb-10" />

                    {/* Isi Body Artikel (HTML dari Database) */}
                    <div
                        className="prose prose-blue prose-lg max-w-none text-slate-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post?.content || "" }}
                    />

                    <div className="mt-16 pt-8 border-t">
                        <a href="/osis" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-full font-semibold transition-colors">
                            ← Kembali ke Semua Artikel OSIS
                        </a>
                    </div>
                </div>
            </article>
        );
    } catch (err) {
        console.error("Detail Page Error:", err);
        return <div className="p-20 text-center text-red-500">Terjadi kesalahan koneksi.</div>;
    }
}
