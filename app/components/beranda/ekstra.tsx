"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// --- DATA STATIS ---
// Menggunakan nama file foto, diarahkan ke folder /ekstra/
const EXTRA_DATA = [
  { name: "Pramuka", image: "/login-logo.png", href: "/ekstrakurikuler/pramuka" },
  { name: "Paskibra", image: "paskibra.jpg", href: "/ekstrakurikuler/paskibra" },
  { name: "Sains Club", image: "sains.jpg", href: "/ekstrakurikuler/sains" },
  { name: "Basket", image: "basket.jpg", href: "/ekstrakurikuler/basket" },
  { name: "Voli", image: "voli.jpg", href: "/ekstrakurikuler/voli" },
  { name: "Seni Tari", image: "tari.jpg", href: "/ekstrakurikuler/tari" },
  { name: "Paduan Suara", image: "padus.jpg", href: "/ekstrakurikuler/padus" },
  { name: "PMR", image: "pmr.jpg", href: "/ekstrakurikuler/pmr" },
];

export default function ExtracurricularSection() {
  return (
    <section id="ekstra" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 max-w-2xl space-y-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Kegiatan <span className="text-[#F3C623]">Ekstrakurikuler</span>
            </h2>
            <div className="h-1.5 w-16 bg-[#F3C623] rounded-full mt-3" />
          </div>
          <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
            Kembangkan potensi, bakat, dan minatmu di luar jam pelajaran akademik. 
            Pilih ekstrakurikuler favoritmu dan raih prestasi bersama SMAN 1 Ketapang.
          </p>
        </div>

        <div className="-mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex flex-nowrap gap-4 md:gap-5 overflow-x-auto pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {EXTRA_DATA.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="snap-start shrink-0"
              >
                <Link 
                  href={item.href}
                  className="group flex flex-col items-center justify-center p-5 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(243,198,35,0.15)] hover:border-[#F3C623]/30 transition-all duration-300 w-32 h-36 md:w-40 md:h-44"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3 rounded-2xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                    <Image
                      src={`/ekstra/${item.image}`}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="80px"
                    />
                  </div>

                  <h3 className="text-xs md:text-sm font-bold text-slate-700 text-center uppercase tracking-wide group-hover:text-[#F3C623] transition-colors duration-300">
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