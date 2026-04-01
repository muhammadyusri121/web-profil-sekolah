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
    return date.toLocaleDateString("id-ID", { 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    });
  };

  return (
    <section id="youtube" className="relative bg-gray-100 py-10 md:py-14 overflow-hidden border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-xl text-center sm:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-none"
            >
              Video <span className="text-yellow-600">Youtube</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Video Utama */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 group"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-black/5 shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${mainVideo.id}`}
                title={mainVideo.title}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="mt-4 px-1">
              <h3 className="text-lg md:text-xl font-black text-slate-900 line-clamp-2 leading-snug uppercase tracking-tight">
                {mainVideo.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <Calendar size={13} className="text-amber-600" />
                {formatDate(mainVideo.publishedAt)}
              </div>
            </div>
          </motion.div>

          {/* Daftar Video Samping */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex flex-col gap-3">
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
                  className="group flex items-center gap-4 p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-video w-32 md:w-36 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-sm">
                    <img
                      src={video.thumbnailUrl || "/login-logo.png"}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 bg-amber-600 rounded-full scale-75 group-hover:scale-100 transition-transform">
                        <Play size={14} fill="white" className="text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col grow min-w-0 pr-2">
                    <h5 className="line-clamp-2 text-sm font-black leading-tight text-slate-900 group-hover:text-amber-600 transition-colors mb-2 uppercase tracking-tight">
                      {video.title}
                    </h5>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      <Calendar size={12} className="text-amber-600" />
                      <span>{formatDate(video.publishedAt)}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              href={channelUrl}
              target="_blank"
              className="mt-2 flex items-center justify-between px-6 py-3.5 rounded-xl bg-slate-900 text-white hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl group"
            >
              <div className="flex items-center gap-3">
                <Youtube size={18} className="text-red-500 group-hover:text-white transition-colors" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Kunjungi Channel Kami</span>
              </div>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}