"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Youtube, Calendar, ArrowRight } from "lucide-react";
import { YouTubeVideo } from "@/lib/youtube";
import { AnimatedHeading } from "@/components/ui/animated-heading";

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
    <section id="youtube" className="relative py-4 md:py-6 overflow-hidden border-t border-gray-200">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-50 via-yellow-100 to-amber-200 -z-10" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-2 mb-8 md:mb-10">
          <AnimatedHeading className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            Video Youtube
          </AnimatedHeading>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl leading-relaxed">
            Video Youtube Terbaru SMAN 1 Ketapang Sampang.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 group relative"
          >
            <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-900 shadow-xl ring-1 ring-black/5">
              <iframe
                src={`https://www.youtube.com/embed/${mainVideo.id}`}
                title={mainVideo.title}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
              
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 md:p-8 pointer-events-none">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 bg-yellow-500 text-white text-[9px] font-bold uppercase tracking-widest rounded">Terbaru</span>
                  <span className="text-[10px] font-medium text-white/80 uppercase tracking-widest flex items-center gap-1">
                    <Calendar size={12} /> {formatDate(mainVideo.publishedAt)}
                  </span>
                </div>
                <h3 className="text-sm md:text-lg font-bold text-white leading-snug max-w-xl line-clamp-2">
                  {mainVideo.title}
                </h3>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="grid gap-3">
              {sideVideos.map((video, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-2.5 rounded-xl bg-white/50 backdrop-blur-sm border border-white hover:bg-white hover:border-yellow-400 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-video w-24 md:w-32 shrink-0 overflow-hidden rounded-xl shadow-sm">
                    <img
                      src={video.thumbnailUrl || "/404.png"}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-yellow-600/10 transition-colors">
                      <div className="p-2 bg-white/90 rounded-full scale-75 group-hover:scale-100 transition-transform">
                        <Play size={10} className="text-yellow-600 fill-yellow-600" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col min-w-0 pr-2">
                    <h5 className="line-clamp-2 text-[11px] md:text-xs font-bold leading-snug text-slate-900 group-hover:text-yellow-600 transition-colors mb-1.5 uppercase tracking-tight">
                      {video.title}
                    </h5>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{formatDate(video.publishedAt)}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.a
              whileTap={{ scale: 0.95 }}
              href={channelUrl}
              target="_blank"
              className="flex items-center justify-between gap-3 rounded-xl bg-slate-900 px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-yellow-500 hover:text-black shadow-lg group mt-2"
            >
              <div className="flex items-center gap-3">
                <Youtube size={16} className="text-red-500 group-hover:text-black transition-colors" />
                <span>Channel YouTube</span>
              </div>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}