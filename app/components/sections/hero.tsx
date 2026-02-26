"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-white overflow-hidden pt-16">
      {/* Elemen Dekoratif Matte (Opsional agar tidak terlalu kosong) */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#F3C623]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-slate-100 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Badge Kecil */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F3C623] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F3C623]"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">
              Selamat Datang
            </span>
          </motion.div>

          {/* Judul Utama */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight"
          >
            Membangun Masa Depan<br />
            <span className="text-[#F3C623]">SMAN 1 Ketapang</span>
          </motion.h1>

          {/* Sub-judul */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Mencetak generasi yang cerdas, berkarakter, dan siap menghadapi tantangan global dengan kurikulum inovatif dan fasilitas modern.
          </motion.p>

          {/* Tombol Aksi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button className="w-full sm:w-auto bg-[#F3C623] hover:bg-[#E2B612] text-slate-900 font-bold px-8 py-4 rounded-2xl shadow-lg shadow-yellow-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
              Button_1_not_request
              <ChevronRight size={18} />
            </button>
            <button className="w-full sm:w-auto bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-600 font-bold px-8 py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2">
              Button_2_not_request
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}