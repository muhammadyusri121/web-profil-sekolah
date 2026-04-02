"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid } from "lucide-react";

const EXTRA_DATA = [
  { name: "Pramuka", image: "/logo-ekstrakurikuler/pramuka.jpg", href: "/kesiswaan/ekstrakurikuler/Pramuka" },
  { name: "Paskibraka", image: "/logo-ekstrakurikuler/paskibraka.jpg", href: "/kesiswaan/ekstrakurikuler/Paskibraka" },
  { name: "Sains Club", image: "/logo-ekstrakurikuler/sains.jpg", href: "/kesiswaan/ekstrakurikuler/Sains_Club" },
  { name: "Basket", image: "/logo-ekstrakurikuler/basket.jpg", href: "/kesiswaan/ekstrakurikuler/Basket" },
  { name: "Voli", image: "/logo-ekstrakurikuler/volleyball.jpg", href: "/kesiswaan/ekstrakurikuler/Voli" },
  { name: "Seni Tari", image: "/logo-ekstrakurikuler/tari.jpg", href: "/kesiswaan/ekstrakurikuler/Seni_Tari" },
  { name: "Paduan Suara", image: "/logo-ekstrakurikuler/paduan.jpg", href: "/kesiswaan/ekstrakurikuler" },
  { name: "PMR (PMI)", image: "/logo-ekstrakurikuler/pmi.svg", href: "/kesiswaan/ekstrakurikuler" },
  { name: "Jurnalistik", image: "/logo-ekstrakurikuler/jurnalistik.jpg", href: "/kesiswaan/ekstrakurikuler" },
];

export default function ExtracurricularSection() {
  return (
    <section id="ekstra" className="py-10 md:py-14 bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header: judul, deskripsi, dan tombol ke halaman ekskul */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight md:text-4xl leading-none">
              Daftar <span className="text-yellow-600">Ekstrakurikuler</span>
            </h2>
            <p className="max-w-lg text-[15px] font-medium leading-relaxed text-slate-600">
              Pilih wadah pengembangan minat dan bakatmu. Raih prestasi bersama SMAN 1 Ketapang.
            </p>
          </div>

          <div className="flex justify-end sm:pb-1">
            <Link
              href="/kesiswaan/ekstrakurikuler"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-amber-600 shadow-md hover:shadow-xl active:scale-95"
            >
              <LayoutGrid size={14} />
              Semua Ekskul
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Mobile: Horizontal Grid | Desktop: Clean Flexible Grid */}
        <div className="w-full">
          <div className="flex overflow-x-auto pb-4 gap-4 sm:grid sm:grid-cols-5 md:grid-cols-9 sm:overflow-visible sm:pb-0 scrollbar-hide">
            {EXTRA_DATA.map((item, index) => (
              <motion.div 
                key={item.name} 
                whileTap={{ scale: 0.95 }}
                className="shrink-0 w-28 sm:w-auto"
              >
                <Link
                  href={item.href}
                  className="group flex flex-col items-center justify-center gap-3 p-4 bg-white rounded-[24px] border border-slate-200 hover:border-amber-400 transition-all duration-500 aspect-square"
                >
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden transition-all duration-500 group-hover:scale-110">
                    <Image
                      src={item.image}
                      alt={`Logo ${item.name}`}
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                      priority={index < 5}
                    />
                  </div>
                  <h3 className="text-[11px] md:text-xs font-black text-slate-800 text-center uppercase tracking-tight leading-tight group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
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