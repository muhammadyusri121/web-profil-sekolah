"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PostSection({ posts = [] }: { posts: any[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-12 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section Compact */}
        <div className="mb-8 space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
            Berita & <span className="text-[#F3C623]">Informasi</span>
          </h2>
          <div className="h-1 w-16 bg-[#F3C623] rounded-full" />
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex flex-nowrap gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
          {posts.map((post) => (
            <motion.article 
              key={post.id}
              whileHover={{ y: -5 }}
              className="snap-center shrink-0 w-[280px] md:w-[350px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col"
            >
              {/* Thumbnail Postingan */}
              <div className="relative aspect-video bg-slate-200">
                <Image
                  src={post.thumbnail || "/placeholder-news.png"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                {/* Badge Kategori */}
                <div className="absolute top-3 left-3 bg-[#F3C623] text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">
                  {post.category}
                </div>
              </div>

              {/* Konten Postingan */}
              <div className="p-5 space-y-3 flex-grow">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {new Date(post.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                </p>
                <h3 className="font-black text-slate-900 leading-tight line-clamp-2 text-sm md:text-base">
                  {post.title}
                </h3>
                <div className="pt-2">
                   <button className="text-[10px] font-black uppercase text-[#F3C623] hover:text-slate-900 transition-colors tracking-widest">
                      Baca Selengkapnya →
                   </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* CSS untuk menyembunyikan scrollbar agar tetap clean */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}