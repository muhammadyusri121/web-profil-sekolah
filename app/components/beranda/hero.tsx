"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* --- LAYER 1: FOTO BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg1.jpg" // Ganti dengan foto sekolahmu
          alt="SMAN 1 Ketapang"
          fill
          priority // Sangat penting untuk LCP (Super Fast)
          className="object-cover object-center"
        />
        {/* Overlay Gradasi agar teks terbaca jelas */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-900/90 z-10" />
      </div>

      {/* --- LAYER 2: DEKORATIF CLIP-PATH (The "Design Element") --- */}
      {/* Elemen Kuning di bagian bawah yang memotong secara diagonal */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[30vh] bg-white z-20 [clip-path:polygon(0_100%,100%_100%,100%_100%,0_0)] opacity-90"
      />
      
      {/* Garis Aksen Putih Tipis */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[31vh] bg-white/20 z-10 [clip-path:polygon(0_100%,100%_100%,100%_100%,0_0)]"
      />

      {/* --- LAYER 3: KONTEN TEKS --- */}
      <div className="container mx-auto px-6 relative z-30">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center gap-3 justify-center md:justify-start"
          >
            <div className="h-[2px] w-12 bg-[#F3C623]" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-[#F3C623]">
              Excellence in Education
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-8xl lg:text-9xl font-[1000] text-white leading-[0.9] tracking-[-0.04em] uppercase"
          >
            Masa Depan <br /> 
            <span className="text-transparent [text-stroke:1px_white] md:[text-stroke:2px_white]">Dimulai</span> <br />
            <span className="text-[#F3C623]">Di Sini.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 max-w-xl"
          >
            <p className="text-sm md:text-lg font-bold text-slate-300 uppercase tracking-widest leading-relaxed">
              Selamat datang di <span className="text-white">SMAN 1 Ketapang</span>. <br />
              Wadah inovasi, prestasi, dan pembentukan karakter mulia.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}