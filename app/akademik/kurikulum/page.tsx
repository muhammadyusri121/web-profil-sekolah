"use client";

import React from "react";
import { Sparkles, CalendarDays } from "lucide-react";

export default function WelcomeHero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Banner Container */}
        <div className="relative bg-slate-900 rounded-[40px] p-8 md:p-16 overflow-hidden shadow-2xl shadow-slate-200">
          
          {/* Hiasan Latar Belakang (Aksen Kuning) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F3C623] opacity-10 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600 opacity-10 blur-[100px] -ml-32 -mb-32" />

          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Badge Kecil */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/10">
              <Sparkles size={14} className="text-[#F3C623]" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                Sistem Informasi Akademik
              </span>
            </div>

            {/* Judul Utama */}
            <h1 className="text-4xl md:text-6xl font-[1000] text-white uppercase tracking-tighter leading-none mb-6">
              Selamat Datang di <br />
              <span className="text-[#F3C623]">Kalender Akademik</span>
            </h1>

            {/* Deskripsi */}
            <p className="max-w-2xl text-slate-400 text-sm md:text-base font-medium leading-relaxed mb-10">
              Pantau seluruh agenda penting, hari libur, dan jadwal kegiatan sekolah dalam satu tempat yang praktis. Dirancang untuk memudahkan siswa dan guru dalam merencanakan waktu.
            </p>

            {/* Aksi Sederhana */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-3 px-6 py-4 bg-[#F3C623] text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/20">
                <CalendarDays size={18} />
                Tahun Ajaran 2025/2026
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}