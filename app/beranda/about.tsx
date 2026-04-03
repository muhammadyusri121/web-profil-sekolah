import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Target, Music, ArrowRight, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AnimatedHeading } from "@/components/ui/animated-heading";

const NAV_CARDS = [
  {
    href: "/profil/visi-misi",
    icon: Target,
    title: "Visi & Misi",
    description: "Eksplorasi fokus strategis dan tujuan utama sekolah.",
  },
  {
    href: "/profil/mars",
    icon: Music,
    title: "Mars SMANKA",
    description: "Simbol semangat juang dalam alunan nada inspiratif.",
  },
];

export default async function AboutSection() {
  const profile = await prisma.schoolProfile.findFirst();

  const principalName = profile?.principalName || "Sulaiman, S.E., M.Pd.";
  const principalImage = profile?.principalImage || "/foto-kepsek.jpeg";
  const welcomeMessage = profile?.welcomeMessage || "<p>Selamat datang di SMAN 1 Ketapang...</p>";

  return (
    // 2. Menambahkan border-t sebagai pemisah section yang halus
    <section id="about" className="relative py-4 md:py-6 bg-gray-100 border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. Judul ditaruh di atas untuk hirarki yang lebih baik */}
        <div className="mb-12 md:mb-16">
          <AnimatedHeading className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            Sambutan <span className="text-yellow-500">Kepala Sekolah</span>
          </AnimatedHeading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Sisi Kiri: Foto Kepala Sekolah */}
          <div className="lg:col-span-4 flex justify-center lg:sticky lg:top-24">
            <div className="relative w-full max-w-[300px] lg:max-w-none rounded-2xl overflow-hidden shadow-sm border-2 border-white bg-white">
              <Image
                src={principalImage}
                alt={principalName}
                width={400}
                height={500}
                priority
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-white">
                <h3 className="text-sm font-bold uppercase tracking-wide leading-tight">
                  {principalName}
                </h3>
                <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-[0.2em] mt-1">
                  Kepala Sekolah
                </p>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Konten Sambutan & Navigasi */}
          <div className="lg:col-span-8 flex flex-col space-y-10">
            
            {/* Area Teks Sambutan */}
            <div className="relative">
              {/* Icon Kutipan sebagai pemanis desain clean */}
              <div className="absolute -top-4 -left-4 text-gray-200 -z-10 select-none">
                <span className="text-8xl font-serif">“</span>
              </div>
              
              <div 
                className="text-slate-600 font-medium text-base md:text-lg leading-relaxed prose prose-slate line-clamp-[8] md:line-clamp-[10] lg:line-clamp-[12]"
                dangerouslySetInnerHTML={{ __html: welcomeMessage }}
              />
              
              <Link
                href="/profil/sambutan"
                className="inline-flex items-center gap-2 text-[11px] font-black text-yellow-600 hover:text-slate-900 transition-all uppercase tracking-[0.3em] mt-6 border-b-2 border-yellow-500/20 pb-1 group"
              >
                Selengkapnya 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Nav Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {NAV_CARDS.map(({ href, icon: Icon, title, description }) => (
                <Link
                  key={title}
                  href={href}
                  className="group flex flex-col gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-yellow-500 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-gray-50 rounded-lg text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                      <Icon size={20} />
                    </div>
                    <ArrowUpRight size={16} className="text-gray-300 group-hover:text-yellow-500 transition-colors" />
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">
                      {title}
                    </h4>
                    <p className="text-[13px] text-slate-500 leading-snug line-clamp-2">
                      {description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}