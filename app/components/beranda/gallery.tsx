"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Teacher {
  id: string;
  full_name: string;
  position: string;
  image_url: string | null;
}

export default function TeacherGallery({ teachers = [] }: { teachers: Teacher[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  // Sync indikator scroll
  React.useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!teachers || teachers.length === 0) return null;

  return (
    <section id="gallery" className="relative py-16 md:py-24 bg-[#F3C623] overflow-hidden">
      {/* --- PATTERN OVERLAY --- */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(135deg, #000 25%, transparent 25%), linear-gradient(225deg, #000 25%, transparent 25%), linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(315deg, #000 25%, #F3C623 25%)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '20px 0, 20px 0, 0 0, 0 0'
        }} 
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 text-center md:text-left">
          <div className="space-y-3 flex-grow">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-900/60">
              <Users size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Profil Pendidik</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Struktural <span className="text-white drop-shadow-sm">Sekolah</span>
            </h2>
            <p className="text-slate-800/70 text-sm md:text-base max-w-xl mx-auto md:mx-0 leading-relaxed font-bold">
              Jajaran tenaga pendidik profesional yang berdedikasi tinggi untuk kemajuan siswa SMAN 1 Ketapang.
            </p>
          </div>
          
          {/* Tombol Center di Mobile */}
          <div className="flex justify-center md:justify-end">
            <Link href="/profil/guru">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-3.5 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-xl"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">Selengkapnya</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* --- CAROUSEL --- */}
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {teachers.map((teacher, index) => (
              <CarouselItem 
                key={teacher.id} 
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5" 
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white/20"
                >
                  {/* FOTO CERAH (No Grayscale) */}
                  <Image
                    src={teacher.image_url || "/placeholder-user.png"}
                    alt={teacher.full_name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* INFO DI DALAM CARD */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-5 pt-10">
                    <h4 className="text-white font-black text-[13px] uppercase leading-tight tracking-tight drop-shadow-md">
                      {teacher.full_name}
                    </h4>
                    <p className="text-[#F3C623] text-[9px] font-bold uppercase mt-1 tracking-widest opacity-90">
                      {teacher.position}
                    </p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* --- INDIKATOR SCROLL (Dots) --- */}
        <div className="flex justify-center gap-2 mt-10">
          {teachers.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                current === i ? "w-8 bg-slate-900" : "w-2 bg-slate-900/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}