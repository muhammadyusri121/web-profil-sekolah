"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle2, Rocket, ShieldCheck, Zap, Award } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const misiData = [
  {
    id: 1,
    title: "Kualitas Akademik",
    desc: "Menyelenggarakan proses pembelajaran yang inovatif dan efektif untuk menghasilkan lulusan yang kompetitif.",
    icon: <Rocket className="text-[#F3C623]" size={24} />
  },
  {
    id: 2,
    title: "Karakter Bangsa",
    desc: "Menanamkan nilai-nilai religius, budi pekerti luhur, dan jiwa nasionalisme yang kuat pada setiap siswa.",
    icon: <ShieldCheck className="text-[#F3C623]" size={24} />
  },
  {
    id: 3,
    title: "Wawasan Lingkungan",
    desc: "Menciptakan lingkungan sekolah yang bersih, asri, dan nyaman sebagai sarana pendukung edukasi.",
    icon: <Zap className="text-[#F3C623]" size={24} />
  },
  {
    id: 4,
    title: "Prestasi Non-Akademik",
    desc: "Mengembangkan bakat dan minat siswa melalui kegiatan ekstrakurikuler yang terprogram dan berprestasi.",
    icon: <Award className="text-[#F3C623]" size={24} />
  }
];

export default function VisiMisiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.section 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10"
          >
            <div className="bg-slate-900 rounded-[24px] md:rounded-[32px] p-6 md:p-10 text-center text-white relative overflow-hidden shadow-xl">
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F3C623] mb-2">Visi Sekolah</h2>
              <p className="text-lg md:text-2xl font-bold leading-tight italic max-w-2xl mx-auto">
                "Santun dalam pekerti, unggul dalam pretasi, dan kondusif dalam edukasi."
              </p>
            </div>
          </motion.section>

          <section className="space-y-3">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">Misi Sekolah</h2>
              <div className="grow h-px bg-slate-200"></div>
            </div>

            <div className="flex flex-col gap-3">
              {misiData.map((misi, idx) => (
                <motion.div
                  key={misi.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex flex-row items-center gap-4 bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#F3C623] transition-all"
                >
                  {/* ICON: Hanya muncul di Desktop (md) */}
                  <div className="hidden md:flex shrink-0 w-12 h-12 bg-slate-50 rounded-xl items-center justify-center group-hover:bg-yellow-50 transition-colors">
                    {misi.icon}
                  </div>

                  <div className="grow">
                    <h3 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-tight mb-0.5">
                      {misi.title}
                    </h3>
                    <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
                      {misi.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}