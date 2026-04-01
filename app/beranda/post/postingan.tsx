"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type PostItem, getPostHref, getCategoryLabel, formatDate } from "@/lib/data/post-utils";

export default function PostSection({ posts = [] }: { posts: PostItem[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="postingan" className="bg-gray-100 py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Header Section: Compact & Symmetric */}
        <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-5">
          <div className="max-w-xl">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 md:text-4xl uppercase">
              Informasi <span className="text-amber-600">Terkini</span>
            </h2>
            <p className="mt-1.5 text-sm font-medium text-slate-500 md:text-base">
              Berita, pengumuman, dan aktivitas terbaru dari sekolah.
            </p>
          </div>
          <Link 
            href="/beranda/post/berita" 
            className="hidden text-xs font-black text-amber-600 transition-all hover:text-slate-900 uppercase tracking-widest md:flex md:items-center md:gap-1.5 hover:translate-x-1"
          >
            Lihat Semua <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid System: Symmetric spacing */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {posts.slice(0, 8).map((post, index) => {
            const href = getPostHref(post);
            const label = getCategoryLabel(post);

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <Link href={href} className="flex h-full flex-col">
                  {/* Thumbnail Container */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 border-b border-slate-50">
                    <Image
                      src={post.thumbnail || "/login-logo.png"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Text Content: Balanced Spacing */}
                  <div className="flex flex-1 flex-col p-3.5 md:p-4">
                    {/* Metadata: Better color contrast for older users */}
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                        {label}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>

                    {/* Title: High readability */}
                    <h3 className="line-clamp-2 text-sm font-bold leading-tight text-slate-900 transition-colors group-hover:text-amber-600 md:text-[15px]">
                      {post.title}
                    </h3>

                    {/* Simple Action: Clear button */}
                    <div className="mt-auto pt-4">
                      <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-slate-900 group-hover:translate-x-1 duration-300">
                        Selengkapnya <ArrowRight size={10} className="text-amber-600" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile View All Button: Symmetric & Large enough for touch */}
        <div className="mt-8 md:hidden">
          <Link 
            href="/beranda/post/berita" 
            className="flex w-full items-center justify-center rounded-xl bg-white border border-slate-200 py-3.5 text-xs font-black text-slate-700 uppercase tracking-widest active:bg-slate-50 shadow-xs"
          >
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
}