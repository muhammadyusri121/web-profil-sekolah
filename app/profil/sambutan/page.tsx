"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function SambutanPage() {
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string }>({
    title: "Sambutan Kepala Sekolah",
    content: "",
  });

  const [principal, setPrincipal] = useState<{ name: string; image: string }>({
    name: "Sulaiman, S.E., M.Pd.",
    image: "/foto-kepsek.jpeg",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Ambil data pesan dari API Post (untuk konten panjang)
        const resPost = await fetch("/api/post?slug=sambutan");
        const dataPost = await resPost.json();
        
        // 2. Ambil data profil kepsek dari SchoolProfile (Sama dengan AboutSection)
        const resProfile = await fetch("/api/school-profile");
        
        if (resProfile.ok) {
          const dataProfile = await resProfile.json();
          // Jika ada data di profil, gunakan data tersebut
          setPrincipal({
            name: dataProfile.principalName || "Sulaiman, S.E., M.Pd.",
            image: dataProfile.principalImage || "/foto-kepsek.jpeg",
          });

          // Set konten: prioritaskan dari API Post (slug sambutan), 
          // jika tidak ada gunakan welcomeMessage dari profile
          setPageInfo({
            title: dataPost?.title || "Sambutan Kepala Sekolah",
            content: dataPost?.content || dataProfile?.welcomeMessage || "",
          });
        }
      } catch (error) {
        console.error("Gagal mengambil info:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="grow pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="relative bg-white p-3 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100">
                <Image
                  src={principal.image}
                  alt={principal.name}
                  width={500}
                  height={667}
                  className="w-full aspect-[3/4] object-cover rounded-2xl"
                  priority
                />
                <div className="mt-5 text-center pb-2">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">
                    {principal.name}
                  </h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
                    Kepala Sekolah
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-sm">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] uppercase tracking-tighter mb-10">
                {pageInfo.title}
              </h1>

              <div 
                className="text-slate-600 font-medium text-base md:text-lg leading-relaxed prose prose-slate max-w-none text-justify hyphens-auto"
                dangerouslySetInnerHTML={{ __html: pageInfo.content }}
              />

              <div className="mt-12 border-t border-slate-100 pt-10">
                <div className="flex flex-col">
                  <p className="font-black text-slate-400 uppercase tracking-widest text-[10px] mb-4">
                    Tertanda,
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    {principal.name}
                  </p>
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