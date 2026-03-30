"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const banners = [
  "/hero.png",
  "/hero.png",
  "/hero.png",
  "/hero.png", // Loop helper
];

export default function SchoolHero() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full bg-white pt-24 md:pt-32 pb-12 overflow-hidden">
      
      {/* --- CAROUSEL WITH EMBLA --- */}
      <div className="container mx-auto px-4 max-w-6xl relative group">
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {banners.map((src, i) => (
              <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2">
                <div className="relative aspect-[2/1] overflow-hidden rounded-xl md:rounded-3xl border border-yellow-100 shadow-sm">
                  <Image
                    src={src}
                    alt={`Banner ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i < 2}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation - Hidden on Mobile */}
          <button
            onClick={() => api?.scrollPrev()}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-yellow-400 p-2 rounded-full text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden md:block z-10 hover:bg-yellow-500"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-yellow-400 p-2 rounded-full text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden md:block z-10 hover:bg-yellow-500"
          >
            <ChevronRight size={20} />
          </button>
        </Carousel>

        {/* Indicators */}
        <div className="flex justify-center gap-1.5 mt-5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-1.5 transition-all rounded-full ${
                current === i ? "w-8 bg-yellow-500" : "w-1.5 bg-yellow-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* --- COMPACT GREETING --- */}
      <div className="container mx-auto px-6 mt-10 max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
            Selamat Datang di <br className="md:hidden" />
            <span className="text-yellow-500">Sekolah Masa Depan</span>
          </h1>
        </motion.div>
      </div>

    </section>
  );
}