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
    <section id="postingan" className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Header Section */}
        <div className="mb-10 flex items-end justify-between border-b border-slate-100 pb-6">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Informasi <span className="text-yellow-500">Terkini</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Berita, pengumuman, dan aktivitas terbaru dari sekolah.
            </p>
          </div>
          <Link 
            href="/post/berita" 
            className="hidden text-sm font-bold text-yellow-600 transition-colors hover:text-yellow-700 md:flex md:items-center md:gap-1"
          >
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid System: Mobile 2 columns, Desktop 4 columns */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {posts.slice(0, 8).map((post, index) => {
            const href = getPostHref(post);
            const label = getCategoryLabel(post);

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative flex flex-col"
              >
                <Link href={href} className="flex h-full flex-col">
                  {/* Thumbnail Container */}
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-md bg-slate-100">
                    <img
                      src={post.thumbnail || "/login-logo.png"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/login-logo.png";
                      }}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-1 flex-col pt-3">
                    {/* Metadata: Category & Date */}
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-600">
                        {label}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-yellow-600 md:text-base">
                      {post.title}
                    </h3>

                    {/* Simple Action */}
                    <div className="mt-auto pt-3">
                      <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors group-hover:text-slate-900">
                        Selengkapnya <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 md:hidden">
          <Link 
            href="/berita" 
            className="flex w-full items-center justify-center rounded-md border border-slate-200 py-3 text-sm font-bold text-slate-700 active:bg-slate-50"
          >
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
}