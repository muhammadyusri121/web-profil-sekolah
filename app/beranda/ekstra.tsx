"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { AnimatedHeading } from "@/components/ui/animated-heading";

const EXTRA_DATA = [
  { name: "Basket", image: "/logo-ekstrakurikuler/basket.jpg", href: "/kesiswaan/ekstrakurikuler/Basket" },
  { name: "Jurnalistik", image: "/logo-ekstrakurikuler/jurnalistik.jpg", href: "/kesiswaan/ekstrakurikuler/Jurnalistik" },
  { name: "Paduan Suara", image: "/logo-ekstrakurikuler/paduan.jpg", href: "/kesiswaan/ekstrakurikuler/Paduan_Suara" },
  { name: "Paskibraka", image: "/logo-ekstrakurikuler/paskibraka.jpg", href: "/kesiswaan/ekstrakurikuler/Paskibraka" },
  { name: "PMR", image: "/logo-ekstrakurikuler/pmi.svg", href: "/kesiswaan/ekstrakurikuler/PMR" },
  { name: "Pramuka", image: "/logo-ekstrakurikuler/pramuka.jpg", href: "/kesiswaan/ekstrakurikuler/Pramuka" },
  { name: "Sains Club", image: "/logo-ekstrakurikuler/sains.jpg", href: "/kesiswaan/ekstrakurikuler/Sains_Club" },
  { name: "Seni Tari", image: "/logo-ekstrakurikuler/tari.jpg", href: "/kesiswaan/ekstrakurikuler/Seni_Tari" },
  { name: "Voli", image: "/logo-ekstrakurikuler/volleyball.jpg", href: "/kesiswaan/ekstrakurikuler/Voli" },
];

export default function ExtracurricularSection() {
  return (
    <section id="ekstra" className="relative py-4 md:py-6 bg-gray-50 border-t border-gray-200 overflow-hidden">
      
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.05}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-y-[-10%] h-[120%] skew-y-12",
        )}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="space-y-2 mb-8 md:mb-10">
          <AnimatedHeading className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            Ekstrakurikuler
          </AnimatedHeading>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl leading-relaxed">
            Wadah eksplorasi minat dan bakat siswa untuk mengembangkan potensi diri di SMAN 1 Ketapang Sampang.
          </p>
        </div>

        <div 
          className="grid grid-cols-4 gap-2 md:flex md:overflow-x-auto md:gap-3 md:pb-4 scrollbar-hide md:snap-x touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {EXTRA_DATA.map((item, index) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className="md:snap-start md:shrink-0"
            >
              <Link
                href={item.href}
                className="flex flex-col items-center justify-center p-2 h-24 w-full md:w-28 md:h-32 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-yellow-400 hover:shadow-md transition-all duration-300 group/card"
              >
                <div className="relative w-8 h-8 md:w-10 md:h-10 mb-2 transition-transform duration-500 group-hover/card:scale-110">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                    sizes="40px"
                  />
                </div>
                
                <h3 className="text-[8px] md:text-[10px] font-bold text-slate-700 text-center uppercase tracking-tight leading-tight px-1 line-clamp-2">
                  {item.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}