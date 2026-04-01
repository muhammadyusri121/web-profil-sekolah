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
    description: "Eksplorasi fokus strategis dan tujuan utama sekolah untuk masa depan siswa.",
  },
  {
    href: "/profil/mars",
    icon: Music,
    title: "Mars SMANKA",
    description: "Simbol semangat juang dan identitas sekolah dalam alunan nada yang inspiratif.",
  },
];

export default async function AboutSection() {
  const profile = await prisma.schoolProfile.findFirst();

  const principalName = profile?.principalName || "Sulaiman, S.E., M.Pd.";
  const principalImage = profile?.principalImage || "/foto-kepsek.jpeg";
  const welcomeMessage = profile?.welcomeMessage || "SMAN 1 Ketapang berkomitmen mencetak generasi yang santun dalam pekerti dan unggul dalam prestasi melalui lingkungan edukasi yang kondusif.";

  return (
    <section id="about" className="py-12 md:py-20 bg-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">

          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[280px] lg:max-w-none rounded-[32px] overflow-hidden shadow-2xl bg-slate-100 border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
              <Image
                src={principalImage}
                alt={principalName}
                width={400}
                height={500}
                priority
                className="w-full aspect-4/5 object-cover"
              />

              <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent p-6 text-white text-center">
                <h3 className="text-sm font-black uppercase tracking-wide">
                  {principalName}
                </h3>
                <p className="text-xs text-yellow-400 font-black uppercase tracking-widest mt-1">
                  Kepala SMAN 1 Ketapang
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-8 md:gap-10">
            <div className="space-y-5">
              <div className="max-w-xl text-center sm:text-left">
                <AnimatedHeading 
                  className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-none"
                >
                  Sambutan <span className="text-yellow-600">Kepala Sekolah</span>
                </AnimatedHeading>
              </div>
              <p className="text-slate-600 font-medium text-[15px] md:text-base leading-relaxed max-w-2xl">
                {welcomeMessage}
              </p>
              <Link
                href="/profil/sambutan"
                className="inline-flex items-center gap-2 text-xs font-black text-amber-600 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]"
              >
                Baca Sambutan <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {NAV_CARDS.map(({ href, icon: Icon, title, description }) => (
                <Link
                  key={title}
                  href={href}
                  className="group relative flex flex-col gap-4 p-6 bg-white rounded-2xl border border-slate-100 hover:border-yellow-400 hover:shadow-xl transition-all duration-300"
                >
                  <ArrowUpRight
                    size={18}
                    className="absolute top-5 right-5 text-slate-300 group-hover:text-yellow-500 transition-colors duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                      <Icon size={20} />
                    </div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                      {title}
                    </h4>
                  </div>

                  <p className="text-[13px] font-bold text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                    {description}
                  </p>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}