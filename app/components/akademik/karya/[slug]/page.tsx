import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BackButton from "@/components/BackButton";
import ShareArticle from "@/components/ShareArticle";

export default async function DetailKaryaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/post?slug=${slug}`, { cache: 'no-store' });

    if (!res.ok) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-50">
          <div className="text-center">
            <h1 className="text-3xl font-black text-yellow-800">Server Error ({res.status})</h1>
            <p className="text-yellow-500 mt-2">Gagal mengambil data dari server.</p>
          </div>
        </div>
      );
    }

    const post = await res.json();
    if (!post) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50">
          <h1 className="text-2xl font-bold text-yellow-800">Halaman Tidak Ditemukan</h1>
          <Link href="/karya" className="text-yellow-600 mt-4 font-semibold hover:underline">
            ← Kembali
          </Link>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />

        <main className="grow pt-32 pb-20 px-5 md:px-8">
          <article className="max-w-3xl mx-auto">

            <div className="mb-8">
              <BackButton label="Kembali" />
            </div>

            <header className="mb-10 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 text-xs font-black uppercase tracking-widest">
                  <Tag size={12} />
                  {post.category || "Karya Siswa"}
                </span>
                <span className="inline-flex items-center gap-1.5 text-yellow-400 text-xs font-semibold">
                  <Calendar size={12} />
                  {post.createdat
                    ? new Date(post.createdat).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })
                    : 'Februari 2026'}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-yellow-900 leading-[1.2] tracking-tight mb-6">
                {post.title}
              </h1>
            </header>

            <div className="mb-12 w-full h-[300px] md:h-[450px] relative bg-yellow-200 rounded-3xl overflow-hidden shadow-sm border border-yellow-100">
              <img
                src={post.thumbnail || "https://placehold.co/1200x600?text=Gambar+Tidak+Ada"}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white">
              <div
                className="prose prose-lg md:prose-xl prose-yellow max-w-none 
                  prose-headings:font-black prose-headings:tracking-tight prose-headings:text-yellow-900 prose-headings:mt-12 prose-headings:mb-6
                  [&_p]:text-justify [&_div]:text-justify [&_li]:text-justify
                  [&_p]:mb-8 [&_p]:leading-[1.8]
                  [&_div]:mb-8 [&_div]:leading-[1.8]
                  prose-a:text-yellow-600 hover:prose-a:text-yellow-700 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-yellow-900 prose-strong:font-bold
                  prose-img:rounded-2xl prose-img:shadow-sm prose-img:my-10
                  prose-li:text-yellow-700 prose-li:leading-[1.8] prose-li:!mb-2
                  prose-ul:!mb-8 prose-ol:!mb-8
                  marker:text-yellow-600"
                dangerouslySetInnerHTML={{ __html: post?.content || "" }}
              />
            </div>
          </article>
        </main>
        <ShareArticle title={post.title} />

        <Footer />
      </div>
    );
  } catch (err) {
    console.error("Detail Page Error:", err);
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 text-center">
        <div>
          <h1 className="text-3xl font-black text-red-500 mb-2">Terjadi Kesalahan</h1>
          <p className="text-yellow-500">Gagal terhubung ke server. Silakan coba lagi nanti.</p>
        </div>
      </div>
    );
  }
}