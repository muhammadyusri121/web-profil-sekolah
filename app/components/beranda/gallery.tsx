"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ArrowRight, Users, GraduationCap } from "lucide-react";
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

export default function TeacherGallery({
  teachers = [],
}: {
  teachers: Teacher[];
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
    })
  );

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!teachers || teachers.length === 0) return null;

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-gray-200 py-2 md:py-4"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
                Tenaga Pendidik &
                <span className="block text-[#d4a911]">Struktural Sekolah</span>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                Jajaran tenaga pendidik profesional yang berdedikasi dalam
                membimbing dan membangun generasi unggul di SMAN 1 Ketapang.
              </p>
            </div>

            {/* Badge + Button sejajar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white shadow-sm">
                <Users className="h-4 w-4" />
                <span className="text-xs font-semibold">
                  {teachers.length} Pendidik
                </span>
              </div>

              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/profil/guru"
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  Lihat Selengkapnya
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-3 shadow-[0_15px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm md:p-4">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {teachers.map((teacher, index) => (
                <CarouselItem
                  key={teacher.id}
                  className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5 md:pl-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                      <Image
                        src={teacher.image_url || "/placeholder-user.png"}
                        alt={teacher.full_name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-3 text-center">
                      <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900">
                        {teacher.full_name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                        {teacher.position}
                      </p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Indicators */}
          <div className="mt-5 flex justify-center gap-2">
            {teachers.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Pergi ke slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  current === i
                    ? "h-2 w-6 bg-slate-900"
                    : "h-2 w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}