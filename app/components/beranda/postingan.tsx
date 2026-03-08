"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";

interface PostItem {
  id: string;
  title: string;
  category?: string;
  thumbnail?: string | null;
  createdat?: string | Date | null;
  createdAt?: string | Date | null;
  slug?: string;
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
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-[#fffaf0] py-12 md:py-16"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-[#F3C623]/15 blur-3xl" />
        <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-slate-200/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-sm">
            <Newspaper className="h-4 w-4 text-[#F3C623]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-600">
              Informasi Sekolah
            </span>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
                Informasi <span className="block text-[#d4a911]">Terkini</span>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                Berita, pengumuman, dan aktivitas terbaru sekolah yang disajikan
                secara ringkas dan informatif.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white shadow-sm">
                <span className="text-xs font-semibold">
                  {posts.length} Postingan
                </span>
              </div>

              <Link
                href="/postingan"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                Lihat Selengkapnya
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-3 shadow-[0_15px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm md:p-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-5">
            {posts.slice(0, 5).map((post, index) => {
              const postDate = post.createdat ?? post.createdAt;
              const href = post.slug ? `/postingan/${post.slug}` : "#";

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link href={href} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <Image
                        src={post.thumbnail || "/login-logo.png"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                      />

                      {post.category && (
                        <div className="absolute left-3 top-3 rounded-full bg-[#F3C623] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-slate-900 shadow-sm">
                          {post.category}
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <div className="mb-2 flex items-center gap-2 text-[10px] font-medium text-slate-500">
                        <Calendar size={12} className="text-[#F3C623]" />
                        <span>{formatDate(postDate)}</span>
                      </div>

                      <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-[#d4a911]">
                        {post.title}
                      </h3>

                      <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:text-slate-900">
                        Detail
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </p>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}