"use client";

import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function SambutanPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="grow pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-5xl mx-auto px-5">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-yellow-400 rounded-[2rem] rotate-3 group-hover:rotate-0 transition-transform duration-500" />
                
                <div className="relative bg-white p-3 rounded-[2rem] shadow-xl shadow-slate-700/50 border border-slate-100">
                  <img 
                    src="/foto-kepsek.jpeg"
                    alt="Sulaiman, S.E., M.Pd."
                    className="w-full aspect-3/4 object-cover rounded-[1.5rem]"
                    onError={(e) => { 
                      (e.target as any).src = "https://placehold.co/400x533/F3C623/333?text=Kepala+Sekolah"; 
                    }}
                  />
                  
                  <div className="mt-5 text-center pb-2">
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                      Sulaiman, S.E., M.Pd.
                    </h2>
                    <p className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">
                      NIP. 19720512 199802 1 004
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-8 bg-white p-6 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm"
            >
              <h1 className="text-2xl md:text-4xl font-[1000] text-slate-900 leading-[1.1] uppercase tracking-tighter mb-8">
                Santun dalam <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-yellow-600">
                  Pekerti
                </span>,<br />
                Unggul dalam <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-yellow-600">
                  Prestasi
                </span>,<br />
                Kondusif dalam <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-yellow-600">
                  Edukasi
                </span>
              </h1>

              <div className="space-y-5 text-slate-600 leading-relaxed text-sm md:text-[15px]">
                <p className="font-bold text-slate-900 text-base italic">
                  "Assalamu’alaikum Warahmatullahi Wabarakatuh,"
                </p>

                <p>
                  Salam hangat bagi kita semua yang tergabung dalam keluarga besar <strong>SMAN 1 Ketapang</strong>. 
                  Melalui halaman ini, kami ingin menyampaikan rasa syukur dan apresiasi atas dukungan 
                  semua pihak yang telah membantu perkembangan sekolah ini hingga sekarang.
                </p>
                
                <p>
                  SMAN 1 Ketapang terus bertransformasi menjadi lembaga pendidikan yang tidak hanya 
                  fokus pada angka-angka akademik, tetapi juga pada pembentukan karakter siswa. 
                  Kami ingin menciptakan rumah bagi kreativitas dan inovasi bagi setiap anak didik kami.
                </p>
                
                <p>
                  Kami berupaya memastikan setiap siswa mendapatkan bimbingan terbaik untuk menghadapi 
                  tantangan masa depan yang dinamis dengan tetap menjunjung tinggi integritas dan 
                  akhlakul karimah.
                </p>

                <div className="mt-6 border-t border-slate-50">
                  <p className="font-bold text-yellow-600">
                    Wassalamu’alaikum Warahmatullahi Wabarakatuh.
                  </p>

                  <p className="pt-10 mb-10 font-black text-slate-900 uppercase tracking-widest text-xs">
                    Tertanda,
                  </p>

                  <div className="mt-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
                    <span className="text-2xl text-slate-900">Sulaiman M.Pd.</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}