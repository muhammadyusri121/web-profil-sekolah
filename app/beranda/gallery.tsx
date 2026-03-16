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
    <section id="gallery" className="relative overflow-hidden bg-gray-100 py-12 md:py-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">

        {/* Header: judul, deskripsi, dan tombol ke halaman lengkap */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter md:text-4xl">
              Tenaga Pendidik &{" "}
              <span className="text-yellow-400">Kependidikan</span>
            </h2>
            <p className="max-w-lg text-sm text-slate-500 font-medium leading-relaxed">
              Didukung oleh tenaga pendidik profesional dan berdedikasi yang
              berkomitmen mengantarkan setiap siswa meraih prestasi terbaik.
            </p>
          </div>

          <div className="flex justify-end">
            <Link
              href="/profil/struktur-gtk"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-yellow-400 hover:text-slate-900"
            >
              <Users size={12} />
              Lihat Selengkapnya
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        {/* Carousel daftar guru */}
        <div className="rounded-[28px] bg-white p-4 shadow-lg border border-slate-100">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent className="-ml-3">
              {teachers.map((teacher) => (
                <CarouselItem
                  key={teacher.id}
                  className="pl-3 basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="group overflow-hidden rounded-[20px] border border-slate-100 bg-white transition-all duration-300 hover:border-yellow-400 hover:shadow-md">
                    <div className="relative aspect-3/4 overflow-hidden bg-slate-50">
                      <Image
                        src={teacher.image_url || "/placeholder-user.png"}
                        alt={teacher.full_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="text-[11px] font-black text-slate-900 uppercase leading-tight line-clamp-2">
                        {teacher.full_name}
                      </h3>
                      <p className="mt-1 text-[9px] font-bold text-yellow-500 uppercase tracking-widest line-clamp-1">
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