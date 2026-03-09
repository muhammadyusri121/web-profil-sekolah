"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

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

/** Mapping kategori Post → URL prefix */
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

/** Mapping ekskul_name → URL prefix */
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

/** Resolusi URL detail artikel berdasarkan sumber dan kategori */
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

/** Label kategori yang ditampilkan di badge */
function getCategoryLabel(post: PostItem): string {
  if (post.ekskul_name) return post.ekskul_name.replace(/_/g, " ");
  if (post.category) return post.category.replace(/_/g, " ");
  return "Artikel";
}

export default function PostSection({ posts = [] }: { posts: PostItem[] }) {
  if (!posts || posts.length === 0) return null;

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
    <section
      id="postingan"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-yellow-50/40 py-12 md:py-16"
    >
      {/* Dekorasi background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-yellow-300/20 blur-3xl" />
        <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-slate-200/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-slate-900 md:text-5xl">
              Informasi <span className="text-yellow-400">Terkini</span>
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-500">
              Berita, pengumuman, dan aktivitas terbaru dari seluruh lini kegiatan sekolah.
            </p>
          </div>

          <div className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-white">
            {posts.length} Postingan
          </div>
        </div>

        {/* Grid kartu artikel */}
        <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-3 shadow-lg backdrop-blur-sm md:p-4 overflow-hidden">
          {/* Mobile: 1 baris horizontal scroll | Desktop: 2 baris horizontal scroll */}
          <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="grid grid-rows-1 grid-flow-col gap-3 auto-cols-[148px] md:grid-rows-2 md:auto-cols-[185px]">
              {posts.slice(0, 10).map((post, index) => {
                const href = getPostHref(post);
                const label = getCategoryLabel(post);

                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group overflow-hidden rounded-[18px] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-md"
                  >
                    <Link href={href} className="block">
                      {/* Thumbnail */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        <img
                          src={post.thumbnail || "/login-logo.png"}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/login-logo.png";
                          }}
                        />

                        {/* Badge kategori */}
                        <div className="absolute left-2.5 top-2.5 rounded-full bg-yellow-400 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-slate-900 shadow-sm">
                          {label}
                        </div>
                      </div>

                      {/* Konten teks */}
                      <div className="p-3">
                        <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                          <Calendar size={11} className="text-yellow-400" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>

                        <h3 className="line-clamp-2 text-[12px] font-black leading-snug text-slate-900 transition-colors duration-300 group-hover:text-yellow-600">
                          {post.title}
                        </h3>

                        <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors duration-300 group-hover:text-slate-700">
                          Baca <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                        </p>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}