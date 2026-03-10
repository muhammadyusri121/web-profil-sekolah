"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid, Users } from "lucide-react";

const EXTRA_DATA = [
  { name: "Pramuka", image: "/login-logo.png", href: "/ekskul/pramuka" },
  { name: "Paskibraka", image: "/login-logo.png", href: "/ekskul/paskibraka" },
  { name: "Sains Club", image: "/login-logo.png", href: "/ekskul/sains-club" },
  { name: "Basket", image: "/login-logo.png", href: "/ekskul/basket" },
  { name: "Voli", image: "/login-logo.png", href: "/ekskul/voli" },
  { name: "Seni Tari", image: "/login-logo.png", href: "/ekskul/seni-tari" },
  { name: "Paduan Suara", image: "/login-logo.png", href: "/ekskul/paduan-suara" },
  { name: "PMR", image: "/login-logo.png", href: "/ekskul/pmr" },
  { name: "Jurnalistik", image: "/login-logo.png", href: "/ekskul/jurnalistik" },
];

export default function ExtracurricularSection() {
  return (
    <section id="ekstra" className="py-12 md:py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header: judul, deskripsi, dan tombol ke halaman ekskul */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter md:text-4xl">
              Kegiatan <span className="text-yellow-400">Ekstrakurikuler</span>
            </h2>
            <p className="mt-2 max-w-lg text-sm text-slate-500 font-medium leading-relaxed">
              Kembangkan potensi, bakat, dan minat di luar jam pelajaran.
              Pilih ekskul favoritmu dan raih prestasi bersama SMAN 1 Ketapang.
            </p>
          </div>

          {/* Tombol menuju halaman daftar ekskul lengkap */}
          <div className="flex justify-end">
            <Link
              href="/components/kesiswaan/ekstrakurikuler"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-yellow-400 hover:text-slate-900"
            >
              <LayoutGrid size={12} />
              Lihat Selengkapnya
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        {/* Mobile: 1 baris scroll, 3 kartu terlihat | Desktop: grid 10 kolom */}
        <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="grid grid-rows-1 grid-flow-col gap-3 auto-cols-[calc((100vw-56px)/3)] sm:grid-flow-row sm:grid-cols-10 sm:auto-cols-auto">
            {EXTRA_DATA.map((item, index) => (
              <motion.div key={item.name} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item.href}
                  className="group flex flex-col items-center justify-center gap-2 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-yellow-400 hover:shadow-md transition-all duration-300 aspect-square"
                >
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1.5 group-hover:scale-110 transition-transform duration-500"
                      sizes="48px"
                      priority={index < 5}
                    />
                  </div>
                  <h3 className="text-[8px] sm:text-[9px] font-black text-slate-700 text-center uppercase tracking-wide leading-tight group-hover:text-yellow-500 transition-colors duration-300 line-clamp-2">
                    {item.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}