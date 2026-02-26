"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function TeacherGallery({ teachers = [] }: { teachers: any[] }) {
  const plugin = React.useRef(Autoplay({ delay: 4000 }));

  // Fallback jika data kosong agar tidak bingung
  if (!teachers || teachers.length === 0) {
    return (
      <div className="py-10 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl mx-6">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Data guru tidak ditemukan di database VPS
        </p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-black text-slate-900 uppercase mb-8">
          Struktural <span className="text-[#F3C623]">Pendidik</span>
        </h2>

        <Carousel plugins={[plugin.current]} className="w-full" opts={{ loop: true }}>
          <CarouselContent className="-ml-4">
            {teachers.map((teacher) => (
              <CarouselItem key={teacher.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                  <div className="relative aspect-[3/4] bg-slate-200">
                    <Image
                      src={teacher.image_url || "/placeholder-user.png"}
                      alt={teacher.full_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="text-sm font-black text-slate-900 uppercase">{teacher.full_name}</h4>
                    <p className="text-[10px] font-bold text-[#F3C623] uppercase mt-1">{teacher.position}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}