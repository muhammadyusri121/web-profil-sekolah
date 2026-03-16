import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Target, Music, ArrowRight, ArrowUpRight } from "lucide-react";

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

export default function AboutSection() {
  return (
    <section id="about" className="py-10 md:py-16 bg-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">

          {/* Foto kepala sekolah */}
          <div className="lg:col-span-4">
            <div className="relative rounded-[32px] overflow-hidden shadow-xl bg-slate-100 border-4 border-white">
              <Image
                src="/foto-kepsek.jpeg"
                alt="Sulaiman, S.E., M.Pd."
                width={400}
                height={500}
                className="w-full aspect-4/5 object-cover"
              />
              {/* Overlay nama & jabatan */}
              <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-slate-900 p-6 text-white text-center">
                <h3 className="text-sm font-black uppercase tracking-tight">
                  Sulaiman, S.E., M.Pd.
                </h3>
                <p className="text-[9px] text-yellow-400 font-black uppercase tracking-widest mt-0.5">
                  Kepala SMAN 1 Ketapang
                </p>
              </div>
            </div>
          </div>

          {/* Konten teks & navigasi */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Sambutan singkat */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-none uppercase tracking-tighter">
                Selayang <span className="text-yellow-400">Pandang</span>
              </h2>
              <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed max-w-2xl">
                SMAN 1 Ketapang berkomitmen mencetak generasi yang santun dalam
                pekerti dan unggul dalam prestasi melalui lingkungan edukasi yang
                kondusif.
              </p>
              <Link
                href="/profil/sambutan"
                className="inline-flex items-center gap-2 text-[10px] font-black text-yellow-500 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]"
              >
                Baca Sambutan <ArrowRight size={13} />
              </Link>
            </div>

            {/* Kartu navigasi: Visi Misi & Mars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NAV_CARDS.map(({ href, icon: Icon, title, description }) => (
                <Link
                  key={title}
                  href={href}
                  className="group relative flex flex-col gap-3 p-5 bg-white rounded-2xl border border-slate-100 hover:border-yellow-400 hover:shadow-md transition-all duration-300"
                >
                  {/* Ikon panah di pojok kanan atas sebagai penanda klikable */}
                  <ArrowUpRight
                    size={16}
                    className="absolute top-4 right-4 text-slate-300 group-hover:text-yellow-400 transition-colors duration-300"
                  />

                  <div className="flex items-center gap-3 text-yellow-400">
                    <Icon size={20} />
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">
                      {title}
                    </h4>
                  </div>

                  <p className="text-[10px] font-bold text-slate-400 leading-relaxed group-hover:text-slate-600 transition-colors">
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