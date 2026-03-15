"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function PostCard({ post, basePath }: { post: any; basePath: string }) {
  const images = post.images || [];
  const [index, setIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden border border-yellow-200 shadow-sm h-full transition-none">
      <div className="relative aspect-4/3 w-full bg-slate-100 flex items-center justify-center overflow-hidden border-b border-yellow-100 group">
        {images.length > 0 ? (
          <>
            <img 
              src={images[index]} 
              alt={post.title} 
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = "")}
            />
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button onClick={prev} className="p-1 rounded-full bg-white/90 text-black shadow-sm active:scale-90"><ChevronLeft size={16}/></button>
                <button onClick={next} className="p-1 rounded-full bg-white/90 text-black shadow-sm active:scale-90"><ChevronRight size={16}/></button>
              </div>
            )}
            {images.length > 1 && (
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 text-[8px] text-white rounded font-bold">
                {index + 1} / {images.length}
              </div>
            )}
          </>
        ) : (
          <span className="text-xl font-black text-slate-300 italic">404</span>
        )}
      </div>

      <Link href={`${basePath}/${post.slug}`} className="p-3 flex flex-col grow">
        {post.createdAt && (
          <div className="flex items-center gap-1.5 text-slate-500 text-[9px] font-bold uppercase mb-1.5">
            <Calendar size={12} className="text-yellow-500" />
            <span className="text-black">{new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        )}
        <h2 className="text-xs md:text-sm font-bold text-black leading-snug line-clamp-2 mb-4">{post.title}</h2>
        <div className="mt-auto pt-2 flex items-center justify-between text-[10px] font-black text-black uppercase border-t border-slate-100">
          <span>Detail</span>
          <ArrowRight size={14} className="text-yellow-500" />
        </div>
      </Link>
    </div>
  );
}