"use client";

import React from "react";
import { motion } from "motion/react";
import { Play, Youtube, Calendar, ArrowRight, ExternalLink } from "lucide-react";
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
  const sideVideos = videos.slice(1, 5); 

  const formatDate = (value: string) => {
    if (!value) return "Baru";
    const date = new Date(value);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  return (
    <section id="youtube" className="relative bg-gray-100 py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-xl text-center sm:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter"
            >
              Video <span className="text-yellow-500">Youtube</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-8 group"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-black/5 shadow-xl">
              <iframe
                src={`https://www.youtube.com/embed/${mainVideo.id}`}
                title={mainVideo.title}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg md:text-xl font-bold text-slate-800 line-clamp-1">
                {mainVideo.title}
              </h3>
            </div>
          </motion.div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            {sideVideos.map((video, idx) => (
              <motion.a
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-yellow-400/50 hover:bg-slate-50 shadow-sm transition-all"
              >
                <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  <img
                    src={video.thumbnailUrl || "/login-logo.png"}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={12} fill="white" className="text-white" />
                  </div>
                </div>

                <div className="flex flex-col grow min-w-0">
                  <h5 className="line-clamp-2 text-[13px] font-bold leading-tight text-slate-800 group-hover:text-yellow-600 transition-colors mb-1">
                    {video.title}
                  </h5>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase">
                    <Calendar size={10} className="text-yellow-500" />
                    <span>{formatDate(video.publishedAt)}</span>
                  </div>
                </div>
              </motion.a>
            ))}

            <motion.a
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                href={channelUrl}
                target="_blank"
                className="mt-1 flex items-center justify-between p-3 rounded-lg border border-dashed border-slate-300 hover:border-yellow-500 hover:bg-yellow-50 shadow-xs transition-all text-slate-500 hover:text-yellow-600 group"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">Lihat Semua Video</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}