"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type PostItem, getPostHref, getCategoryLabel, formatDate } from "@/lib/data/post-utils";
import { AnimatedHeading } from "@/components/ui/animated-heading";

export default function PostSection({ posts = [] }: { posts: PostItem[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="postingan" className="bg-white py-4 md:py-6 border-t border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        <div className="space-y-2 mb-8 md:mb-10">
          <AnimatedHeading className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            Informasi Terkini
          </AnimatedHeading>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl leading-relaxed">
            Informasi terkini seputar kegiatan, prestasi, dan pengumuman penting dari SMAN 1 Ketapang Sampang.
          </p>
        </div>  

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {posts.slice(0, 10).map((post, index) => {
            const href = getPostHref(post);

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:bg-yellow-400 hover:border-yellow-500 transition-all duration-300 hover:-translate-y-1"
              >
                <Link href={href} className="flex h-full flex-col">
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-50 border-b border-gray-100 group-hover:border-yellow-500">
                    <Image
                      src={post.thumbnail || "/login-logo.png"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-3 md:p-4 space-y-3">
                    
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#F3C623] group-hover:text-amber-800 transition-colors">
                          {getCategoryLabel(post)}
                        </span>
                        <span className="h-0.5 w-0.5 rounded-full bg-slate-200 group-hover:bg-slate-900/10"></span>
                        <span className="text-[8px] md:text-[10px] font-bold text-slate-400 group-hover:text-slate-700 transition-colors uppercase tracking-widest shrink-0">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <h3 className="line-clamp-2 text-[11px] md:text-sm font-bold leading-tight text-slate-900 transition-colors group-hover:text-black uppercase tracking-tight">
                        {post.title}
                      </h3>
                    </div>

                    <div className="mt-auto pt-2 border-t border-gray-50 group-hover:border-slate-900/10">
                      <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all group-hover:text-slate-900 group-hover:gap-2 duration-300">
                        Baca <ArrowRight size={10} className="text-yellow-600 group-hover:text-slate-900" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link 
            href="/beranda/post/berita" 
            className="inline-flex items-center gap-3 rounded-xl bg-slate-900 px-6 py-3 text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-yellow-500 hover:text-black transition-all shadow-lg active:scale-95 group"
          >
            Lihat Semua Berita
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}