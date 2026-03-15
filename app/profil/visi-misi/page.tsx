"use client";

import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Zap, Award, Target } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const misiData = [
  {
    id: 1,
    title: "Kualitas Akademik",
    desc: "Proses pembelajaran inovatif untuk lulusan kompetitif.",
    icon: <Rocket className="text-yellow-600" size={20} />
  },
  {
    id: 2,
    title: "Karakter Bangsa",
    desc: "Menanamkan nilai religius, budi pekerti, dan nasionalisme.",
    icon: <ShieldCheck className="text-yellow-600" size={20} />
  },
  {
    id: 3,
    title: "Wawasan Lingkungan",
    desc: "Menciptakan lingkungan sekolah asri dan kondusif.",
    icon: <Zap className="text-yellow-600" size={20} />
  },
  {
    id: 4,
    title: "Prestasi Non-Akademik",
    desc: "Mengembangkan bakat siswa melalui ekskul terprogram.",
    icon: <Award className="text-yellow-600" size={20} />
  }
];

export default function VisiMisiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="grow pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-5xl mx-auto px-6">

          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 relative"
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest shrink-0">Visi Sekolah</h2>
              <div className="grow h-px bg-slate-400"></div>
            </div>
            
            <div className="relative p-6 md:p-10 bg-slate-50 rounded-[2rem] border-l-8 border-[#F3C623] overflow-hidden">
              <p className="text-xl md:text-3xl font-black text-slate-900 leading-[1.2] uppercase italic tracking-tighter">
                "Santun dalam pekerti, <br />
                unggul dalam pretasi, <br />
                <span className="text-[#F3C623]">kondusif dalam edukasi."</span>
              </p>
            </div>
          </motion.section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest shrink-0">Misi Sekolah</h2>
              <div className="grow h-px bg-slate-400"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {misiData.map((misi, idx) => (
                <motion.div
                  key={misi.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-[#F3C623]/50 hover:bg-slate-50 transition-all"
                >
                  <div>
                    <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-tight mb-1">
                      {misi.title}
                    </h3>
                    <p className="text-slate-500 text-[12px] font-medium leading-relaxed">
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