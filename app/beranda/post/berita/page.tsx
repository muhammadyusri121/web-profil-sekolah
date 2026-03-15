import React from "react";
export const dynamic = 'force-dynamic';
import Link from "next/link";
import { ArrowRight, Calendar, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getAllPosts } from "@/lib/data/data_beranda/data_postingan";

interface PostItem {
  id: string;
  title: string;
  slug: string;
  category?: string | null;
  ekskul_name?: string | null;
  source: "post" | "ekskul";
  thumbnail?: string | null;
  createdAt?: string | Date | null;
}

const CATEGORY_HREF: Record<string, string> = {
  KARYA_SISWA: "/karya",
  DOUBLE_TRACK: "/double-track",
  OSIS_MPK: "/osis",
  HUMAS: "/humas-komite",
  KOMITE: "/humas-komite",
  KEMITRAAN: "/humas-komite",
  SUPERVISI_GURU: "/karya",
  ASAS: "/karya",
  ASAJ: "/karya",
  TKA: "/karya",
};

const EKSKUL_HREF: Record<string, string> = {
  Pramuka: "/ekskul/pramuka",
  Paskibraka: "/ekskul/paskibraka",
  Sains_Club: "/ekskul/sains-club",
  Basket: "/ekskul/basket",
  Voli: "/ekskul/voli",
  Seni_Tari: "/ekskul/seni-tari",
  Paduan_Suara: "/ekskul/paduan-suara",
  PMR: "/ekskul/pmr",
  Jurnalistik: "/ekskul/jurnalistik",
};

function getPostHref(post: PostItem): string {
  if (post.source === "ekskul" && post.ekskul_name) {
    const base = EKSKUL_HREF[post.ekskul_name];
    return base ? `${base}/${post.slug}` : "#";
  }
  if (post.category) {
    const base = CATEGORY_HREF[post.category];
    return base ? `${base}/${post.slug}` : "#";
  }
  return "#";
}

function getCategoryLabel(post: PostItem): string {
  if (post.ekskul_name) return post.ekskul_name.replace(/_/g, " ");
  if (post.category) return post.category.replace(/_/g, " ");
  return "Artikel";
}

export default async function BeritaPage() {
  const posts = await getAllPosts();

  const formatDate = (value?: string | Date | null) => {
    if (!value) return "Baru saja";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Baru saja";
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <div className="grow pt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          
          <div className="mb-6 flex items-center justify-between">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={16} /> Kembali ke Beranda
            </Link>
          </div>

          {/* Header Section */}
          <div className="mb-10 border-b border-slate-200 pb-8">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Arsip <span className="text-yellow-500">Berita</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-500">
              Seluruh kumpulan berita, pengumuman, dan aktivitas dokumentasi SMAN 1 Ketapang dari waktu ke waktu.
            </p>
          </div>

          {/* Grid System: Mobile 2 columns, Desktop 4 columns */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {posts.map((post: PostItem) => {
                const href = getPostHref(post);
                const label = getCategoryLabel(post);

                return (
                  <article
                    key={post.id}
                    className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-yellow-300"
                  >
                    <Link href={href} className="flex h-full flex-col">
                      {/* Thumbnail Container */}
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                        <img
                          src={post.thumbnail || "/login-logo.png"}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      {/* Text Content */}
                      <div className="flex flex-1 flex-col p-4">
                        {/* Metadata: Category & Date */}
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-yellow-800">
                            {label}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400">
                            {formatDate(post.createdAt)}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="line-clamp-3 text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-yellow-600 md:text-base">
                          {post.title}
                        </h3>

                        {/* Simple Action */}
                        <div className="mt-auto pt-4">
                          <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-yellow-600 transition-colors group-hover:text-yellow-700">
                            Selengkapnya <ArrowRight size={12} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-20 text-center">
                <p className="text-lg font-bold text-slate-600">Belum ada berita diterbitkan.</p>
                <p className="mt-1 text-sm text-slate-400">Silakan kembali lagi nanti untuk informasi terbaru.</p>
             </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
