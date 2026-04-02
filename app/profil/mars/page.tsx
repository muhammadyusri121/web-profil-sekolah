"use client";

import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function MarsPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string }>({
    title: "Mars SMAN 1 Ketapang",
    content: "Simbol semangat juang dan identitas sekolah dalam alunan nada yang inspiratif."
  });

  useEffect(() => {
    const fetchPageInfo = async () => {
      try {
        const res = await fetch('/api/post?slug=mars');
        const data = await res.json();
        if (data && data.title) {
          setPageInfo({
            title: data.title,
            content: data.content || pageInfo.content
          });
        }
      } catch (error) {
        console.error("Gagal mengambil info:", error);
      }
    };
    fetchPageInfo();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="grow pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-2xl mx-auto px-5">
        
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-tight mb-4">
              {pageInfo.title}
            </h1>
            
            <p className="text-slate-500 font-semibold text-sm md:text-base mb-8 max-w-md">
              {pageInfo.content.replace(/<[^>]*>/g, '')}
            </p>

            <button 
              onClick={togglePlay}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all active:scale-95 text-xs font-black uppercase tracking-[0.2em]"
            >
              {isPlaying ? "Hentikan Lagu" : "Putar Mars Sekolah"}
            </button>
            
            <audio 
              ref={audioRef} 
              src="/mars.mp3" 
              onEnded={() => setIsPlaying(false)}
            />
          </div>

          <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="space-y-10">
              {[
                ["SMA Negeri 1 Ketapang", "Santun dalam pekerti, Unggul dalam prestasi", "Kondusif dalam edukasi"],
                ["Raih semua mimpi dengan berjiwa Pancasila", "Wujudkan cita melia dengan berjiwa Pancasila", "Taklukkan dunia!"],
                ["Kobarkan semangat menuju cita bangsa", "Kuatkan tekad, berdiri tegak", "Barisan kita kuat, bergerak kita hebat", "SMA Negeri 1 Ketapang!"],
              ].map((verse, vIdx) => (
                <div key={vIdx} className="text-center">
                  <div className="space-y-2">
                    {verse.map((line, lIdx) => (
                      <p 
                        key={lIdx} 
                        className="text-base md:text-lg font-bold text-slate-800 tracking-tight"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}