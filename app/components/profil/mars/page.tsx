"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Music } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function MarsPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

      <main className="grow pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-2">
              Mars
            </h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
              SMA Negeri 1 Ketapang
            </p>
          </div>

          <div className="mb-16 flex flex-col items-center">
            <button 
              onClick={togglePlay}
              className="w-20 h-20 flex items-center justify-center bg-[#F3C623] text-slate-900 rounded-full transition-all duration-300 active:scale-90 shadow-xl shadow-yellow-500/20 hover:bg-slate-900 hover:text-white group"
            >
              {isPlaying ? (
                <Pause size={32} fill="currentColor" />
              ) : (
                <Play size={32} fill="currentColor" className="ml-1" />
              )}
            </button>
            <span className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {isPlaying ? "Mendengarkan" : "Putar Lagu"}
            </span>
            
            <audio 
              ref={audioRef} 
              src="/mars.mp3" 
              onEnded={() => setIsPlaying(false)}
            />
          </div>

          <div className="space-y-12 text-slate-800 font-bold text-base md:text-lg leading-relaxed uppercase tracking-wide">
            <div className="pb-10">
              <p>SMA Negeri 1 Ketapang</p>
              <p>Santun dalam pekerti, unggul dalam prestasi</p>
              <p>Kondusif dalam edukasi</p>
            </div>

            <div className="pb-10">
              <p>Raih semua mimpi dengan berjiwa Pancasila</p>
              <p>Wujudkan cita mulia dengan berjiwa Pancasila</p>
              <p>Taklukan dunia!</p>
            </div>


            <div className="pb-10">
              <p>Kobarkan semangat menuju cita bangsa</p>
              <p>Kuatkan tekad, berdiri tegak</p>
              <p>Barisan kita kuat, bergerak kita hebat</p>
              <p>SMA Negeri 1 Ketapang!</p>
            </div>

            {/* Verse 3 */}
            <div className="pb-10">
              <p>SMA Negeri 1 Ketapang</p>
              <p>Santun dalam pekerti, unggul dalam prestasi</p>
              <p>Kondusif dalam edukasi</p>
            </div>

            {/* Verse 4 */}
            <div className="pb-10">
              <p>Raih semua mimpi dengan berjiwa Pancasila</p>
              <p>Wujudkan cita mulia dengan berjiwa Pancasila</p>
              <p>Taklukkan dunia!</p>
            </div>

            {/* Ending */}
            <div className="pb-10">
              <p>Kobarkan semangat menuju cita bangsa</p>
              <p>Kuatkan tekad, berdiri tegak</p>
              <p>Barisan kita kuat, bergerak kita hebat</p>
              <p className="text-2xl font-black text-slate-900 mt-2">SMA Negeri 1 Ketapang!</p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}