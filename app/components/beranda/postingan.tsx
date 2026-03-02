"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

export default function PostSection({ posts = [] }: { posts: any[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="postingan" className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-[1000] text-slate-900 uppercase tracking-tight">
              Informasi <span className="text-[#F3C623]">Terkini</span>
            </h2>
            <div className="h-1.5 w-16 bg-[#F3C623] rounded-full" />
          </div>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
            Total {posts.length} Postingan Ditemukan
          </p>
        </div>

        {/* Grid Display (3 Kolom agar tetap compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="flex flex-col bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Thumbnail dari MinIO */}
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <img
                  src={post.thumbnail || "/login-logo.png"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-[#F3C623] text-slate-900 text-[9px] font-black px-3 py-1 rounded-full uppercase z-10 shadow-sm">
                  {post.category}
                </div>
              </div>

              {/* Konten */}
              <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase mb-3">
                  <Calendar size={12} className="text-[#F3C623]" />
                  <span>
                    {post.createdat 
                      ? new Date(post.createdat).toLocaleDateString('id-ID', { dateStyle: 'long' }) 
                      : "Baru saja"}
                  </span>
                </div>

                <h3 className="font-black text-slate-900 text-lg leading-tight mb-6 line-clamp-2 group-hover:text-[#F3C623] transition-colors">
                  {post.title}
                </h3>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <button className="text-[10px] font-black uppercase text-slate-400 group-hover:text-[#F3C623] transition-colors tracking-widest flex items-center gap-2">
                    Detail <ArrowRight size={14} />
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