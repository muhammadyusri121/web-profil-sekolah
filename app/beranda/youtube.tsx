"use client";

import React from "react";
import { Play, Youtube, Calendar } from "lucide-react";
import { YouTubeVideo } from "@/lib/youtube";

export default function YouTubeSection({
  videos = [],
  channelUrl = "https://youtube.com/@sman1ketapangsampang228"
}: {
  videos: YouTubeVideo[],
  channelUrl?: string
}) {
  if (!videos || videos.length === 0) return null;

  // Video terbaru jadi yang besar, 3 berikutnya di samping
  const mainVideo = videos[0];
  const sideVideos = videos.slice(1, 4); 

  const formatDate = (value: string) => {
    if (!value) return "Baru";
    const date = new Date(value);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  return (
    <section id="youtube" className="bg-white py-8">
      <div className="mx-auto max-w-6xl px-4">
        
        {/* Header Ringkas */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Video <span className="text-red-600">Terbaru</span>
          </h2>
          <a
            href={channelUrl}
            target="_blank"
            className="text-xs font-bold uppercase tracking-wider text-red-600 hover:underline"
          >
            Semua Video
          </a>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Main Video (Terbaru) */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
              <iframe
                src={`https://www.youtube.com/embed/${mainVideo.id}`}
                title={mainVideo.title}
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <h3 className="mt-3 line-clamp-1 text-base font-bold text-slate-900">
              {mainVideo.title}
            </h3>
          </div>

          {/* Side Videos (3 Saja) */}
          <div className="flex flex-col gap-5">
            {sideVideos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-transparent p-1 transition-all hover:bg-slate-50 hover:border-slate-100"
              >
                {/* Thumbnail Kecil */}
                <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-md bg-slate-100">
                  <img
                    src={video.thumbnailUrl || "/login-logo.png"}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100">
                    <Play size={14} className="text-white" fill="white" />
                  </div>
                </div>
                
                {/* Info Singkat */}
                <div className="flex flex-col min-w-0">
                  <h4 className="line-clamp-2 text-xs font-bold leading-snug text-slate-800 group-hover:text-red-600">
                    {video.title}
                  </h4>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                    <Calendar size={10} />
                    <span>{formatDate(video.publishedAt)}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}