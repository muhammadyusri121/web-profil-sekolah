"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PostSection({ posts = [] }: { posts: any[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="postingan" className="py-12 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
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
              className="snap-center shrink-0 w-[280px] md:w-[320px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col group transition-all duration-300 hover:shadow-xl"
            >
              {/* Thumbnail Postingan (Menggunakan logika KaryaPage) */}
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-yellow-50">
                    <span className="text-[#F3C623] font-black text-[10px] uppercase">No Image</span>
                  </div>
                )}
                
                {/* Badge Kategori */}
                <div className="absolute top-3 left-3 bg-[#F3C623] text-slate-900 text-[10px] font-[1000] px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm z-10">
                  {post.category || "Berita"}
                </div>
              </div>

              {/* Konten Postingan */}
              <div className="p-5 space-y-3 grow border-t border-slate-50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {/* Cek penulisan 'createdat' (lowercase) sesuai referensi DB kamu */}
                  {post.createdat || post.createdAt
                    ? new Date(post.createdat || post.createdAt).toLocaleDateString('id-ID', { 
                        day: 'numeric', month: 'short', year: 'numeric' 
                      })
                    : "Baru saja"}
                </p>
                
                <h3 className="font-black text-slate-900 leading-tight line-clamp-2 text-sm md:text-base group-hover:text-[#F3C623] transition-colors">
                  {post.title}
                </h3>
                
                <div className="pt-2">
                   <button className="text-[10px] font-black uppercase text-[#F3C623] group-hover:text-slate-900 transition-colors tracking-widest flex items-center gap-1">
                     Baca Selengkapnya <span>→</span>
                   </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}