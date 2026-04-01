"use client";

import * as React from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "motion/react";

interface Teacher {
  id: string;
  full_name: string;
  position: string;
  image_url: string | null;
}

export default function TeacherGallery({ teachers = [] }: { teachers: Teacher[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const plugin = React.useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));

  // Sinkronisasi state slide aktif dengan carousel API
  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => { };
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  if (!teachers || teachers.length === 0) return null;

  return (
    <section id="gallery" className="relative overflow-hidden bg-gray-100 py-12 md:py-20 border-t border-gray-200">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">

        {/* Header: judul, deskripsi, dan tombol ke halaman lengkap */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="max-w-xl text-center sm:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-none"
            >
              Tenaga <span className="text-yellow-600">Pendidik & Kependidikan</span>
            </motion.h2>
          </div>
            <p className="max-w-lg text-[15px] font-medium leading-relaxed text-slate-600">
              Didukung oleh tenaga pendidik profesional dan berdedikasi yang berkomitmen mengantarkan setiap siswa meraih prestasi terbaik.
            </p>
          </div>

          <div className="flex justify-end sm:pb-1">
            <Link
              href="/profil/struktur-gtk"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-yellow-400 hover:text-slate-900 shadow-md hover:shadow-xl active:scale-95"
            >
              Lihat Selengkapnya
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Carousel daftar guru - NO WRAPPER as requested */}
        <div className="w-full">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {teachers.map((teacher) => (
                <CarouselItem
                  key={teacher.id}
                  className="pl-4 sm:pl-6 basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white transition-all duration-300 hover:border-yellow-400 hover:shadow-2xl">
                    <div className="relative aspect-3/4 overflow-hidden bg-slate-50 border-b border-slate-100">
                      <Image
                        src={teacher.image_url || "/foto-kepsek.jpeg"}
                        alt={teacher.full_name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Gradient Hover Effect */}
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="py-3 px-2 text-center bg-white">
                      <h3 className="text-xs font-black text-slate-900 uppercase leading-tight line-clamp-2 min-h-8 flex items-center justify-center">
                        {teacher.full_name}
                      </h3>
                      <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest line-clamp-1 opacity-90 mt-0.5">
                        {teacher.position}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

      </div>
    </section>
  );
}