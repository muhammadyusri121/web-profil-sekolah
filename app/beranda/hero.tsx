"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern"; // Pastikan path sesuai
import { cn } from "@/lib/utils";

interface HeroItem {
  id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  link_url: string | null;
  sort_order: number;
}

export default function SchoolHero() {
  const [banners, setBanners] = useState<HeroItem[]>([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Cek ukuran layar untuk mematikan efek rotasi di mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/hero", { cache: "no-store" });
        if (res.ok) {
          const result = await res.json();
          const rawData = result.data || result;
          if (Array.isArray(rawData) && rawData.length > 0) {
            setBanners(rawData);
          }
        }
      } catch (err) {
        console.error("HERO_FETCH_EXCEPTION:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  const nextSlide = useCallback(() => {
    if (banners.length === 0) return;
    setIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    if (banners.length === 0) return;
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (isPaused || banners.length === 0) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [index, isPaused, nextSlide, banners.length]);

  const getSlideStyle = (slideIndex: number) => {
    if (banners.length === 0) return {};
    const diff = (slideIndex - index + banners.length) % banners.length;

    if (diff === 0) {
      return {
        zIndex: 30,
        scale: isMobile ? 1.1 : 1.3, // Skala dikurangi di mobile agar tidak terpotong
        x: "0%",
        opacity: 1,
        rotateY: 0,
        filter: "brightness(100%)",
      };
    }
    
    // Slide Samping
    if (diff === 1 || (index === banners.length - 1 && slideIndex === 0)) {
      return {
        zIndex: 20,
        scale: 0.80,
        x: isMobile ? "60%" : "100%", // Jarak dikurangi di mobile
        opacity: 0.4,
        rotateY: isMobile ? 0 : -15, // 3. Matikan rotasi di mobile
        filter: "brightness(90%)",
      };
    }
    if (diff === banners.length - 1) {
      return {
        zIndex: 20,
        scale: 0.80,
        x: isMobile ? "-60%" : "-100%",
        opacity: 0.4,
        rotateY: isMobile ? 0 : 15, // 3. Matikan rotasi di mobile
        filter: "brightness(90%)",
      };
    }
    return {
      zIndex: 10,
      scale: 0.6,
      x: "0%",
      opacity: 0,
      rotateY: 0,
      filter: "brightness(50%)",
    };
  };

  if (loading) {
    return (
      <section className="w-full bg-white h-[400px] lg:h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section
      className="relative w-full bg-white lg:h-screen flex flex-col justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Background Dot Pattern */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
        )}
      />

      <div className="relative z-10 container mx-auto px-4 text-center mt-10 mb-10 lg:mt-20 lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-2 block">
            Selamat Datang Di
          </span>
          <h1 className="text-3xl md:text-6xl font-black text-black uppercase tracking-tighter leading-none">
            SMAN 1 <span className="text-yellow-500">KETAPANG SAMPANG</span>
          </h1>
        </motion.div>
      </div>

      <div className="relative z-10 px-4 h-[220px] sm:h-[300px] md:h-[400px] lg:h-[480px] flex items-center justify-center">
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center perspective-distant">
          {banners.map((banner, i) => {
            const style = getSlideStyle(i);
            const isActive = i === index;

            return (
              <motion.div
                key={banner.id}
                initial={false}
                animate={style}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                // 2. Stroke card dibuat lebih tebal (border-2 atau border-4)
                className="absolute w-[85%] md:w-[80%] aspect-[2/1] rounded-2xl overflow-hidden cursor-pointer border-2 md:border-4 border-white shadow-2xl bg-white"
                onClick={() => setIndex(i)}
              >
                <div className={`absolute inset-0 bg-black/10 z-10 transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`} />
                
                {banner.link_url && isActive && (
                   <a href={banner.link_url} className="absolute inset-0 z-30" aria-label="Lihat Detail" />
                )}

                <Image
                  src={banner.image_url}
                  alt={`Banner SMAN 1 Ketapang ${i + 1}`}
                  fill
                  priority={isActive}
                  className="object-cover"
                />
              </motion.div>
            );
          })}

          {/* 4. Tombol Navigasi lebih terlihat dengan Background Putih Blur */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-0 md:-left-16 z-40 bg-white/90 p-2 md:p-3 rounded-full text-black shadow-lg hover:bg-yellow-500 hover:text-white transition-all active:scale-90 border border-gray-100"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-0 md:-right-16 z-40 bg-white/90 p-2 md:p-3 rounded-full text-black shadow-lg hover:bg-yellow-500 hover:text-white transition-all active:scale-90 border border-gray-100"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex justify-center items-center gap-3 mt-8 lg:mt-16 pb-4">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              index === i ? "w-10 h-1.5 bg-yellow-500" : "w-2 h-1.5 bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}