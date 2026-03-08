"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Music, ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-2 md:py-4 bg-gray-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* --- FOTO KEPALA SEKOLAH: Compact & Elegant --- */}
          <div className="lg:col-span-4 relative">
            <div className="relative rounded-[32px] overflow-hidden shadow-xl bg-slate-100 border-4 border-white">
              <img 
                src="/foto-kepsek.jpeg" 
                alt="Sulaiman, S.E., M.Pd." 
                className="w-full aspect-[4/5] object-cover"
                onError={(e) => { (e.target as any).src = "https://placehold.co/400x500?text=Kepala+Sekolah"; }}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900 p-6 text-white text-center">
                <h3 className="text-sm font-black uppercase tracking-tight">Sulaiman, S.E., M.Pd.</h3>
                <p className="text-[9px] text-[#F3C623] font-black uppercase tracking-widest mt-0.5">Kepala SMAN 1 Ketapang</p>
              </div>
            </div>
          </div>

          {/* --- KONTEN RINGKAS --- */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Sambutan Singkat */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 leading-none uppercase tracking-tighter">
                Selayang <span className="text-[#F3C623]">Pandang</span>
              </h2>
              <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed max-w-2xl">
                SMAN 1 Ketapang berkomitmen mencetak generasi yang santun dalam pekerti dan unggul dalam prestasi melalui lingkungan edukasi yang kondusif.
              </p>
              <Link 
                href="/components/profil/sambutan" 
                className="inline-flex items-center gap-2 text-[10px] font-black text-[#F3C623] hover:text-slate-900 transition-colors uppercase tracking-[0.2em]"
              >
                Baca Sambutan <ArrowRight size={14} />
              </Link>
            </div>

            {/* Link Navigasi Cepat (Visi-Misi & Mars) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Box Visi & Misi */}
              <Link href="/components/profil/visi-misi" className="group p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#F3C623] transition-all duration-300">
                <div className="flex items-center gap-3 mb-2 text-[#F3C623]">
                  <Target size={20} />
                  <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Visi & Misi</h4>
                </div>
                <p className="text-[10px] font-bold text-slate-400 leading-relaxed group-hover:text-slate-600 transition-colors">
                  Eksplorasi fokus strategis dan tujuan utama sekolah untuk masa depan siswa.
                </p>
              </Link>

              {/* Box Mars Sekolah */}
              <Link href="/components/profil/mars" className="group p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#F3C623] transition-all duration-300">
                <div className="flex items-center gap-3 mb-2 text-[#F3C623]">
                  <Music size={20} />
                  <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Mars SMANKA</h4>
                </div>
                <p className="text-[10px] font-bold text-slate-400 leading-relaxed group-hover:text-slate-600 transition-colors">
                  Simbol semangat juang dan identitas sekolah dalam alunan nada yang inspiratif.
                </p>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}