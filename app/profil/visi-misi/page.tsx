"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface MisiItem {
  id: number;
  title: string;
  desc: string;
}

const staticMisiData: MisiItem[] = [
  {
    id: 1,
    title: "Kualitas Akademik",
    desc: "Proses pembelajaran inovatif untuk lulusan kompetitif."
  },
  {
    id: 2,
    title: "Karakter Bangsa",
    desc: "Menanamkan nilai religius, budi pekerti, dan nasionalisme."
  },
  {
    id: 3,
    title: "Wawasan Lingkungan",
    desc: "Menciptakan lingkungan sekolah asri dan kondusif."
  },
  {
    id: 4,
    title: "Prestasi Non-Akademik",
    desc: "Mengembangkan bakat siswa melalui ekskul terprogram."
  }
];

export default function VisiMisiPage() {
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string }>({
    title: "Visi & Misi",
    content: "Eksplorasi fokus strategis dan tujuan utama sekolah untuk masa depan siswa."
  });
  
  const [visionHtml, setVisionHtml] = useState<string>("Santun dalam pekerti, unggul dalam prestasi, kondusif dalam edukasi.");
  const [dynamicMisi, setDynamicMisi] = useState<MisiItem[]>(staticMisiData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPost = await fetch('/api/post?slug=visi-misi');
        const dataPost = await resPost.json();
        if (dataPost && dataPost.title) {
          setPageInfo(prev => ({
            ...prev,
            title: dataPost.title,
            content: dataPost.content || prev.content
          }));
        }
      } catch (error) {
        console.error("Gagal mengambil info:", error);
      }

      try {
        const resProfile = await fetch('/api/school-profile');
        if (resProfile.ok) {
          const profile = await resProfile.json();
          if (profile && profile.vision) {
            setVisionHtml(profile.vision);
          }
          if (profile && profile.mission) {
            let mText = profile.mission;
            mText = mText.replace(/<\/?(ul|ol|li)[^>]*>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '');
            const list = mText.split('\n').map((s: string) => s.trim()).filter(Boolean);
            
            if (list.length > 0) {
              setDynamicMisi(list.map((item: string, idx: number) => ({
                id: idx + 1,
                title: "",
                desc: item
              })));
            }
          }
        }
      } catch (error) {
         console.error("Gagal mengambil profil:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="grow pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto px-5">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-6">
              {pageInfo.title}
            </h1>
            <p className="text-slate-500 font-semibold text-sm md:text-base max-w-2xl mx-auto">
              {pageInfo.content.replace(/<[^>]*>/g, '')}
            </p>
          </div>

          <section className="mb-20">
            <div className="bg-white p-10 md:p-16 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4 text-center">Visi Sekolah</p>
                 <div 
                    className="text-2xl md:text-4xl font-black text-slate-900 leading-tight uppercase italic tracking-tighter"
                    dangerouslySetInnerHTML={{ __html: visionHtml.replace(/"/g, '') }}
                  />
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] shrink-0">Misi Sekolah</h2>
              <div className="grow h-px bg-slate-200"></div>
            </div>

            <div className="space-y-6 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
              {dynamicMisi.map((misi, idx) => (
                <div
                  key={misi.id}
                  className="flex gap-4 items-start"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2.5 shrink-0" />
                  <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                    {misi.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}