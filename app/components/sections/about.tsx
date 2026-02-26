"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Compass, ChevronRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-10 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center">
          
          {/* --- FOTO KEPALA SEKOLAH: Ukuran Penuh & Menyatu --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-slate-100">
              <Image 
                src="/404.png" 
                alt="Kepala Sekolah" 
                width={1500} 
                height={1000} 
                className="w-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-4 md:p-6 text-white">
                <h3 className="text-base md:text-xl font-black uppercase tracking-tight">H. Ahmad Sudarsono, M.Pd.</h3>
                <p className="text-[10px] md:text-xs text-[#F3C623] font-bold uppercase tracking-[0.2em] mt-1">Kepala Sekolah</p>
              </div>
            </div>
          </motion.div>

          {/* --- KONTEN: Sambutan & Visi Misi --- */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
            
            {/* Sambutan Compact */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="inline-block px-3 py-1 rounded bg-yellow-50 text-[#F3C623] font-bold text-[10px] uppercase tracking-widest border border-yellow-100">
                Sambutan
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-[1.2]">
                Membangun Masa Depan Melalui <span className="text-[#F3C623]">Pendidikan Karakter</span>
              </h2>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base italic">
                "Selamat datang di portal SMAN 1 Ketapang. Kami berkomitmen untuk menciptakan lingkungan belajar yang mendukung kreativitas dan inovasi, guna melahirkan lulusan yang siap bersaing di kancah global."
              </p>
              <Link href="/sambutan" className="inline-flex items-center gap-2 text-[11px] font-black text-slate-900 hover:text-[#F3C623] transition-colors uppercase tracking-widest group">
                Selengkapnya 
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Visi & Misi Grid Compact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Visi */}
              <div className="p-5 bg-[#F3C623] rounded-xl shadow-sm border border-yellow-500/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 bg-white/30 rounded-lg flex items-center justify-center text-white">
                    <Target size={16} />
                  </div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Visi</h4>
                </div>
                <p className="text-[11px] md:text-xs font-bold text-slate-800 leading-relaxed">
                  Terwujudnya sekolah yang religius, cerdas, kompetitif, dan berbudaya lingkungan.
                </p>
              </div>

              {/* Misi */}
              <div className="p-5 bg-slate-900 rounded-xl shadow-sm border border-slate-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center text-[#F3C623]">
                    <Compass size={16} />
                  </div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">Misi</h4>
                </div>
                <ul className="text-[10px] md:text-[11px] space-y-1 text-slate-400 font-medium italic leading-snug">
                  <li>• Optimalisasi proses belajar mengajar.</li>
                  <li>• Peningkatan prestasi non-akademik.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}