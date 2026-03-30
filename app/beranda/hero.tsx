"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  "/hero.png",
  "/hero1.png",
  "/hero2.png",
  "/hero3.png",
  "/hero4.png",
];

export default function SchoolHero() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [index]);

  // Fungsi untuk menentukan posisi/gaya setiap slide berdasarkan indeks aktif
  const getSlideStyle = (slideIndex: number) => {
    const diff = (slideIndex - index + banners.length) % banners.length;

    // Center (Aktif)
    if (diff === 0) {
      return {
        zIndex: 30,
        scale: 1,
        x: 0,
        opacity: 1,
        rotateY: 0,
        filter: "brightness(100%)",
      };
    }
    // Kanan (Satu langkah setelah aktif)
    if (diff === 1 || (index === banners.length - 1 && slideIndex === 0)) {
      return {
        zIndex: 20,
        scale: 0.8,
        x: "60%",
        opacity: 0.6,
        rotateY: -25,
        filter: "brightness(70%)",
      };
    }
    // Kiri (Satu langkah sebelum aktif)
    if (diff === banners.length - 1) {
      return {
        zIndex: 20,
        scale: 0.8,
        x: "-60%",
        opacity: 0.6,
        rotateY: 25,
        filter: "brightness(70%)",
      };
    }
    // Sisanya disembunyikan
    return {
      zIndex: 10,
      scale: 0.5,
      x: 0,
      opacity: 0,
      rotateY: 0,
      filter: "brightness(50%)",
    };
  };

  return (
    <section className="w-full bg-gray-100 pt-24 md:pt-32 pb-3 overflow-hidden">
      
      {/* --- 3D ROTATING CAROUSEL --- */}
      <div className="container mx-auto px-4 relative h-[250px] md:h-[450px] flex items-center justify-center">
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center [perspective:1200px]">
          
          {banners.map((src, i) => {
            const style = getSlideStyle(i);
            return (
              <motion.div
                key={i}
                initial={false}
                animate={style}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="absolute w-[80%] md:w-[70%] aspect-[2/1] rounded-3xl overflow-hidden border-4 border-white shadow-2xl cursor-pointer"
                onClick={() => setIndex(i)}
              >
                <div className={`absolute inset-0 bg-yellow-400/10 z-10 transition-opacity ${index === i ? 'opacity-0' : 'opacity-100'}`} />
                <Image
                  src={src}
                  alt={`Banner ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            );
          })}

          {/* Tombol Navigasi - Desktop Only */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-0 md:-left-10 z-40 bg-yellow-400 p-3 rounded-full text-white shadow-lg hover:bg-yellow-500 transition-all active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-0 md:-right-10 z-40 bg-yellow-400 p-3 rounded-full text-white shadow-lg hover:bg-yellow-500 transition-all active:scale-90"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Indikator Dot Kuning */}
      <div className="flex justify-center gap-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 transition-all rounded-full ${
              index === i ? "w-10 bg-yellow-500" : "w-2 bg-yellow-200"
            }`}
          />
        ))}
      </div>
    </section>
  );
}