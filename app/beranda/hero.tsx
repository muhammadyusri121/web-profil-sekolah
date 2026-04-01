"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [index, isPaused, nextSlide]);

  const getSlideStyle = (slideIndex: number) => {
    const diff = (slideIndex - index + banners.length) % banners.length;

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
    if (diff === 1 || (index === banners.length - 1 && slideIndex === 0)) {
      return {
        zIndex: 20,
        scale: 0.8,
        x: "60%",
        opacity: 0.4,
        rotateY: -25,
        filter: "brightness(60%)",
      };
    }
    if (diff === banners.length - 1) {
      return {
        zIndex: 20,
        scale: 0.8,
        x: "-60%",
        opacity: 0.4,
        rotateY: 25,
        filter: "brightness(60%)",
      };
    }
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
    <section 
      className="w-full bg-gray-100 pt-18 md:pt-25 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-yellow-400 text-black text-[10px] md:text-xs font-black tracking-[0.3em] uppercase rounded-full mb-3 shadow-sm">
            Selamat Datang di
          </span>
          <h1 className="text-2xl md:text-5xl font-black text-black uppercase tracking-tight leading-none">
            SMAN 1 <span className="text-yellow-500">KETAPANG </span>SAMPANG
          </h1>
        </motion.div>
      </div>

      <div className="mx-auto px-4 relative h-[300px] md:h-[450px] flex items-center justify-center">
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center perspective-distant">
          
          {banners.map((src, i) => {
            const style = getSlideStyle(i);
            return (
              <motion.div
                key={i}
                initial={false}
                animate={style}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute w-[90%] md:w-[70%] aspect-2/1 rounded-3xl overflow-hidden border-4 border-white shadow-xl cursor-pointer"
                onClick={() => setIndex(i)}
              >
                <div className={`absolute inset-0 bg-yellow-400/5 z-10 transition-opacity ${index === i ? 'opacity-0' : 'opacity-100'}`} />
                <Image
                  src={src}
                  alt={`Halaman Banner ${i + 1}`}
                  fill
                  priority={i === 0}
                  className="object-cover"
                />
              </motion.div>
            );
          })}

          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-1 md:-left-10 z-40 bg-black/80 md:bg-yellow-400 p-2 md:p-3 rounded-full text-white shadow-lg hover:bg-black md:hover:bg-yellow-500 transition-all active:scale-90"
            aria-label="Slide Sebelumnya"
          >
            <ChevronLeft size={22} md-size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-1 md:-right-10 z-40 bg-black/80 md:bg-yellow-400 p-2.5 md:p-3 rounded-full text-white shadow-lg hover:bg-black md:hover:bg-yellow-500 transition-all active:scale-90"
            aria-label="Slide Selanjutnya"
          >
            <ChevronRight size={22} md-size={24} />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all rounded-full ${
              index === i ? "w-8 bg-yellow-500" : "w-1.5 bg-yellow-200"
            }`}
            aria-label={`Ke Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}