"use client";

import React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function SambutanPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="grow pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* --- BAGIAN IDENTITAS (COMPACT) --- */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 border-b border-slate-100 pb-12">
            
            {/* Foto: Ukuran Diperkecil & Simple */}
            <div className="shrink-0">
              <img 
                src="/foto-kepsek.jpeg"
                alt="Sulaiman, S.E., M.Pd."
                className="w-60 h-80 md:w-80 md:h-100 object-cover rounded-2xl shadow-md border-4 border-slate-50"
                onError={(e) => { 
                  (e.target as any).src = "https://placehold.co/400x500/F3C623/333?text=Kepala+Sekolah"; 
                }}
              />
            </div>

            {/* Nama & Slogan */}
            <div className="text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-yellow-100 text-[#F3C623] text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-4">
                Sambutan Kepala Sekolah
              </div>
              
              <h1 className="text-2xl md:text-4xl font-[1000] text-slate-900 leading-tight uppercase tracking-tighter mb-6">
                Santun dalam pekerti, <br />
                unggul dalam prestasi, <br />
                <span className="text-[#F3C623]">kondusif dalam edukasi</span>
              </h1>
              
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-800 uppercase">
                  Sulaiman, S.E., M.Pd.
                </h2>
                <p className="text-slate-500 font-bold text-[11px] uppercase tracking-widest">
                  NIP. 19720512 199802 1 004
                </p>
              </div>
            </div>
          </div>

          {/* --- ISI SAMBUTAN (CLEAN) --- */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm md:text-base">
            <p className="font-bold text-slate-900 mb-6">
              Assalamu’alaikum Warahmatullahi Wabarakatuh,
            </p>

            <p className="mb-4 text-justify">
              Salam hangat bagi kita semua yang tergabung dalam keluarga besar SMAN 1 Ketapang. 
              Melalui halaman ini, kami ingin menyampaikan rasa syukur dan apresiasi atas dukungan 
              semua pihak yang telah membantu perkembangan sekolah ini hingga sekarang.
            </p>
            
            <p className="mb-4 text-justify">
              SMAN 1 Ketapang terus bertransformasi menjadi lembaga pendidikan yang tidak hanya 
              fokus pada angka-angka akademik, tetapi juga pada pembentukan karakter siswa. 
              Kami ingin menciptakan rumah bagi kreativitas dan inovasi bagi setiap anak didik kami.
            </p>
            
            <p className="mb-4 text-justify">
              Kami berupaya memastikan setiap siswa mendapatkan bimbingan terbaik untuk menghadapi 
              tantangan masa depan yang dinamis dengan tetap menjunjung tinggi integritas dan 
              akhlakul karimah.
            </p>

            <div className="mt-10">
              <p className="font-black text-slate-900">
                Wassalamu’alaikum Warahmatullahi Wabarakatuh.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}