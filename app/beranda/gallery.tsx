"use client";

import * as React from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { AnimatedHeading } from "@/components/ui/animated-heading";

interface Teacher {
  id: string;
  full_name: string;
  position: string;
  image_url: string | null;
}

export default function TeacherGallery({ teachers = [] }: { teachers: Teacher[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const plugin = React.useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));

  if (!teachers || teachers.length === 0) return null;

  return (
    <section id="gallery" className="relative overflow-hidden bg-gray-50 py-16 md:py-24 border-t border-gray-200">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-12 text-left">
          <div className="space-y-2">
            <AnimatedHeading className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Tenaga Pendidik
            </AnimatedHeading>
            <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl">
              Mengenal lebih dekat para pendidik berdedikasi yang membimbing dan mencetak generasi unggul di SMAN 1 Ketapang Sampang.
            </p>
          </div>
        </div>

        <div className="w-full">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {teachers.map((teacher) => (
                <CarouselItem
                  key={teacher.id}
                  className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-400">
                    
                    <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 border-b border-gray-100 group-hover:border-slate-900/10">
                      <Image
                        src={teacher.image_url || "/placeholder-user.png"}
                        alt={teacher.full_name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, 20vw"
                      />
                    </div>

                    <div className="p-4 text-center">
                      <h3 className="text-[11px] md:text-xs font-black text-slate-900 uppercase tracking-tight leading-tight line-clamp-2 min-h-[2rem] flex items-center justify-center">
                        {teacher.full_name}
                      </h3>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 group-hover:text-slate-800 transition-colors">
                        {teacher.position}
                      </p>
                    </div>

                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/profil/struktur-gtk"
            className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-3.5 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-yellow-500 hover:text-black shadow-lg active:scale-95 group"
          >
            Lihat Selengkapnya
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}