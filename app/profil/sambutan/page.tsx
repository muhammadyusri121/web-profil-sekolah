"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function SambutanPage() {
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string }>({
    title: "Sambutan Kepala Sekolah",
    content: "Salam hangat bagi kita semua yang tergabung dalam keluarga besar SMAN 1 Ketapang."
  });

  useEffect(() => {
    const fetchPageInfo = async () => {
      try {
        const res = await fetch('/api/post?slug=sambutan');
        const data = await res.json();
        if (data && data.title) {
          setPageInfo({
            title: data.title,
            content: data.content || pageInfo.content
          });
        }
      } catch (error) {
        console.error("Gagal mengambil info:", error);
      }
    };
    fetchPageInfo();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="grow pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-6xl mx-auto px-5">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="relative bg-white p-3 rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100">
                <Image 
                  src="/foto-kepsek.jpeg"
                  alt="Sulaiman, S.E., M.Pd."
                  width={500}
                  height={667}
                  className="w-full aspect-3/4 object-cover rounded-[1.5rem]"
                  priority
                />
                
                <div className="mt-5 text-center pb-2">
                  <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                    Sulaiman, S.E., M.Pd.
                  </h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
                    NIP. 19720512 199802 1 004
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] uppercase tracking-tighter mb-10">
                {pageInfo.title}
              </h1>

              <div className="space-y-6 text-slate-600 leading-relaxed text-base md:text-lg font-medium">
                <p className="font-bold text-slate-900 italic">
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

                <div className="mt-6 border-t border-slate-100 pt-8">
                  <p className="font-bold text-slate-900">
                    Wassalamu’alaikum Warahmatullahi Wabarakatuh.
                  </p>

                  <div className="mt-10">
                    <p className="font-black text-slate-400 uppercase tracking-widest text-[10px] mb-4">
                      Tertanda,
                    </p>
                    <p className="text-2xl font-black text-slate-900 uppercase">
                      Sulaiman, S.E., M.Pd.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}