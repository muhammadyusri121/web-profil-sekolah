"use client";

import React from "react";
import { Play, Youtube, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { YouTubeVideo } from "@/lib/youtube";

export default function YouTubeSection({
    videos = [],
    channelUrl = "https://youtube.com/@sman1ketapangsampang228"
}: {
    videos: YouTubeVideo[],
    channelUrl?: string
}) {
    if (!videos || videos.length === 0) return null;

    const mainVideo = videos[0];
    const sideVideos = videos.slice(1, 11); // Ambil maks 3 video lainnya

    const formatDate = (value: string) => {
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
        <section id="youtube" className="relative overflow-hidden bg-white py-12 md:py-16">
            <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter md:text-4xl">
                            Video <span className="text-yellow-400">Sekolah</span>
                        </h2>
                        <p className="max-w-lg text-sm text-slate-500 font-medium leading-relaxed">
                            Dokumentasi kegiatan dan informasi terbaru langsung dari channel YouTube resmi SMAN 1 Ketapang.
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <a
                            href={channelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-yellow-400 hover:text-slate-900"
                        >
                            <Youtube size={12} />
                            Kunjungi Channel
                        </a>
                    </div>
                </div>

                {/* Konten Video */}
                <div className="grid gap-4 lg:grid-cols-3">
                    {/* Main Video (Featured) */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 group overflow-hidden rounded-[24px] border border-slate-100 bg-slate-100 shadow-lg relative aspect-video"
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${mainVideo.id}?autoplay=0&rel=0`}
                            title={mainVideo.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full border-0 rounded-[24px]"
                        />
                    </motion.div>

                    {/* Side Videos */}
                    <div className="flex flex-col gap-3">
                        {sideVideos.map((video, index) => (
                            <motion.a
                                key={video.id}
                                href={`https://www.youtube.com/watch?v=${video.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group flex gap-3 overflow-hidden rounded-[20px] border border-slate-100 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-md h-[115px] sm:h-[130px] lg:h-auto lg:flex-1"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video h-full shrink-0 overflow-hidden rounded-[14px] bg-slate-100">
                                    <img
                                        src={video.thumbnailUrl || "/login-logo.png"}
                                        alt={video.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400/90 text-slate-900 backdrop-blur-sm shadow-md">
                                            <Play size={14} className="ml-0.5" fill="currentColor" />
                                        </div>
                                    </div>
                                </div>

                                {/* Konten Text */}
                                <div className="flex flex-col justify-center py-1 pr-2 overflow-hidden">
                                    <h3 className="line-clamp-2 text-xs font-black leading-snug text-slate-900 transition-colors duration-300 group-hover:text-yellow-600">
                                        {video.title}
                                    </h3>
                                    <div className="mt-2 flex items-center gap-1.5 text-[9px] font-medium text-slate-400">
                                        <Calendar size={10} className="text-yellow-400" />
                                        <span>{formatDate(video.publishedAt)}</span>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
