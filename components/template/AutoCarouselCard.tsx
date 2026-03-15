"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function AutoCarouselCard({ post, basePath }: { post: any; basePath: string }) {
    const images = post.images && post.images.length > 0 ? post.images : [];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <Link
            href={`${basePath}/${post.slug}`}
            className="flex flex-col bg-white rounded-lg overflow-hidden border border-yellow-200 shadow-sm h-full"
        >
            <div className="relative aspect-4/3 w-full bg-slate-50 flex items-center justify-center overflow-hidden border-b border-yellow-100">
                {images.length > 0 ? (
                    <img
                        src={images[currentIndex]}
                        alt={post.title}
                        className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                        key={currentIndex}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-slate-50">
                        <span className="text-xl font-black text-slate-300 italic tracking-tighter">404</span>
                    </div>
                )}

                {images.length > 1 && (
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-1 h-1 rounded-full transition-all ${i === currentIndex ? "bg-yellow-400 w-2" : "bg-white/50"}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="p-3 flex flex-col grow">
                {post.createdAt && (
                    <div className="flex items-center gap-1.5 text-slate-500 text-[9px] font-bold uppercase tracking-wider mb-1.5">
                        <Calendar className="w-3 h-3 text-yellow-500" />
                        <span className="text-black">
                            {new Date(post.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                )}

                <h2 className="text-xs md:text-sm font-bold text-black leading-snug line-clamp-2 mb-4">
                    {post.title}
                </h2>

                <div className="mt-auto pt-2 flex items-center justify-between text-[10px] font-bold text-black uppercase tracking-tight border-t border-slate-100">
                    <span>Detail</span>
                    <ArrowRight className="w-3 h-3 text-yellow-500" />
                </div>
            </div>
        </Link>
    );
}