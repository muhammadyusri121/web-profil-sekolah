"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
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
        console.error("Gagal mengambil info halaman:", error);
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

      <main className="grow pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-xl mx-auto px-6">
        
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-2xl md:text-3xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none mb-4">
              {pageInfo.title.split(' ').map((word, i) => (
                <span key={i} className={i >= 1 ? "text-[#F3C623]" : ""}>{word} </span>
              ))}
            </h1>
            <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed mb-6">
              {pageInfo.content.replace(/<[^>]*>/g, '')}
            </p>

            <button 
              onClick={togglePlay}
              className="group flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-[#F3C623] hover:text-black transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
              <span className="text-[11px] font-black uppercase tracking-widest">
                {isPlaying ? "Mendengarkan" : "Putar Lagu"}
              </span>
            </button>
            
            <audio 
              ref={audioRef} 
              src="/mars.mp3" 
              onEnded={() => setIsPlaying(false)}
            />
          </div>

          <div className="space-y-10">
            {[
              ["SMA Negeri 1 Ketapang", "Santun dalam pekerti, unggul dalam prestasi", "Kondusif dalam edukasi"],
              ["Raih semua mimpi dengan berjiwa Pancasila", "Wujudkan cita mulia dengan berjiwa Pancasila", "Taklukkan dunia!"],
              ["Kobarkan semangat menuju cita bangsa", "Kuatkan tekad, berdiri tegak", "Barisan kita kuat, bergerak kita hebat", "SMA Negeri 1 Ketapang!"],
            ].map((verse, vIdx) => (
              <motion.div 
                key={vIdx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="space-y-1.5">
                  {verse.map((line, lIdx) => (
                    <p 
                      key={lIdx} 
                      className={`uppercase tracking-wide font-bold text-sm md:text-[15px] ${
                        line === "SMA Negeri 1 Ketapang!" || line === "Taklukkan dunia!" 
                        ? "text-black font-[1000]" 
                        : "text-black"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}