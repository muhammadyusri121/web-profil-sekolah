import React from "react";
export const dynamic = 'force-dynamic';
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getAllPosts } from "@/lib/data/data_postingan";
import { getPostHref, getCategoryLabel, formatDate, type PostItem } from "@/lib/data/post-utils";

export default async function BeritaPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <div className="grow pt-8 pb-16 md:pt-12 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">

          {/* Navigation & Header: Compact and Professional */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-amber-600 transition-colors uppercase tracking-widest group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Kembali ke Beranda
            </Link>
          </div>

          <div className="mb-8 border-b border-slate-200 pb-6 md:pb-8">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl uppercase">
              Arsip <span className="text-amber-600">Berita</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base font-medium text-slate-500">
              Kumpulan informasi, pengumuman, dan aktivitas dokumentasi SMAN 1 Ketapang.
            </p>
          </div>

          {/* Grid System: Symmetric and responsive */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {posts.map((post: PostItem) => {
                const href = getPostHref(post);
                const label = getCategoryLabel(post);

                return (
                  <article
                    key={post.id}
                    className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <Link href={href} className="flex h-full flex-col">
                      {/* Thumbnail Container: Optimized with Next.js Image */}
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={post.thumbnail || "/login-logo.png"}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority={false}
                        />
                      </div>

                      {/* Text Content: Symmetric padding */}
                      <div className="flex flex-1 flex-col p-3.5 md:p-4">
                        {/* Metadata: High Contrast for Readability */}
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                            {label}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                          <span className="text-[10px] font-bold text-slate-400">
                            {formatDate(post.createdAt)}
                          </span>
                        </div>

                        {/* Title: Legible for all ages */}
                        <h3 className="line-clamp-2 text-sm font-bold leading-tight text-slate-900 transition-colors group-hover:text-amber-600 md:text-[15px]">
                          {post.title}
                        </h3>

                        {/* Simple Action */}
                        <div className="mt-auto pt-4">
                          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-slate-900 group-hover:translate-x-1 duration-300">
                            Selengkapnya <ArrowRight size={10} className="text-amber-600" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-14 text-center">
              <p className="text-base font-bold text-slate-600">Belum ada berita diterbitkan.</p>
              <p className="mt-1 text-xs text-slate-400">Silakan kembali lagi nanti untuk informasi terbaru.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
