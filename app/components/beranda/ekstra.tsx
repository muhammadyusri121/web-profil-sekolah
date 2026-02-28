"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// --- DATA STATIS ---
const EXTRA_DATA = [
  { name: "Pramuka", icon: "pramuka.svg", href: "/ekstrakurikuler/pramuka" },
  { name: "Paskibra", icon: "paskibra.svg", href: "/ekstrakurikuler/paskibra" },
  { name: "Sains Club", icon: "sains.svg", href: "/ekstrakurikuler/sains" },
  { name: "Basket", icon: "basket.svg", href: "/ekstrakurikuler/basket" },
  { name: "Voli", icon: "voli.svg", href: "/ekstrakurikuler/voli" },
  { name: "Seni Tari", icon: "tari.svg", href: "/ekstrakurikuler/tari" },
  { name: "Paduan Suara", icon: "padus.svg", href: "/ekstrakurikuler/padus" },
  { name: "PMR", icon: "pmr.svg", href: "/ekstrakurikuler/pmr" },
];

export default function ExtracurricularSection() {
  return (
    <section id="ekstra" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section Compact */}
        <div className="mb-6 space-y-1">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Kegiatan <span className="text-[#F3C623]">Ekstrakurikuler</span>
          </h2>
          <div className="h-1 w-16 bg-[#F3C623] rounded-full" />
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex flex-nowrap gap-3 md:gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {EXTRA_DATA.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="snap-center shrink-0"
            >
              <Link 
                href={item.href}
                className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#F3C623]/40 hover:bg-white hover:shadow-xl transition-all w-28 h-28 md:w-36 md:h-36"
              >
                {/* Ikon dari public/ikon_ekstra/ */}
                <div className="relative w-10 h-10 md:w-14 md:h-14">
                  <Image
                    src={`/ikon_ekstra/${item.icon}`}
                    alt={item.name}
                    fill
                    className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <span className="text-[10px] md:text-xs font-black text-slate-700 uppercase text-center leading-tight tracking-tighter">
                  {item.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CSS untuk menyembunyikan scrollbar agar clean */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}