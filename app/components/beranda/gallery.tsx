"use client";

import * as React from "react";
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

  const plugin = React.useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  if (!teachers || teachers.length === 0) return null;

  return (
    <section id="gallery" className="relative overflow-hidden bg-gray-200 py-6">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {/* Header UI tetap sama menggunakan font Poppins */}
        <div className="mb-10">
          <h2 className="text-3xl font-[900] text-slate-900 uppercase tracking-tighter">
            Tenaga Pendidik & <span className="text-[#d4a911]">Struktural</span>
          </h2>
        </div>

        <div className="rounded-[32px] bg-white p-4 shadow-xl border border-slate-100">
          <Carousel setApi={setApi} plugins={[plugin.current]} opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-4">
              {teachers.map((teacher, index) => (
                <CarouselItem key={teacher.id} className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
                  <div className="group overflow-hidden rounded-[24px] border border-slate-100 bg-white transition-all hover:shadow-lg">
                    <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
                      {/* src sudah berisi URL VPS lengkap dari server */}
                      <img
                        src={teacher.image_url || "/placeholder-user.png"}
                        alt={teacher.full_name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/placeholder-user.png";
                        }}
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-sm font-black text-slate-900 uppercase leading-tight">
                        {teacher.full_name}
                      </h3>
                      <p className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
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