"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface MisiItem {
  id: number;
  title: string;
  desc: string;
}

export default function VisiMisiPage() {
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string }>({
    title: "Visi & Misi",
    content: "Visi adalah pandangan jauh ke depan mengenai apa yang ingin dicapai. Misi adalah langkah-langkah yang dilakukan untuk mewujudkan visi tersebut."
  });
  
  const [visionHtml, setVisionHtml] = useState<string>("");
  const [dynamicMisi, setDynamicMisi] = useState<MisiItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resPost = await fetch('/api/post?slug=visi-misi');
        if (resPost.ok) {
          const dataPost = await resPost.json();
          if (dataPost) {
            setPageInfo({
              title: dataPost.title || "",
              content: dataPost.content || ""
            });
          }
        }

        const resProfile = await fetch('/api/school-profile');
        if (resProfile.ok) {
          const profile = await resProfile.json();
          if (profile) {
            if (profile.vision) setVisionHtml(profile.vision);
            
            if (profile.mission) {
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
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="grow flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="grow pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto px-5">
          {pageInfo.title && (
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-6">
                {pageInfo.title}
              </h1>
              {pageInfo.content && (
                <p className="text-slate-500 font-semibold text-sm md:text-base max-w-2xl mx-auto text-justify md:text-center hyphens-auto">
                  {pageInfo.content.replace(/<[^>]*>/g, '')}
                </p>
              )}
            </div>
          )}

          {visionHtml && (
            <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-white p-10 md:p-16 rounded-2xl border border-slate-100 shadow-sm text-center">
  <p className="text-5xl md:text-6xl font-bold text-slate-900 uppercase mb-6 text-center">
    Visi Sekolah
  </p>
  
  <div 
    className="text-lg md:text-xl font-semibold text-slate-900 leading-relaxed tracking-normal text-center"
    dangerouslySetInnerHTML={{ __html: visionHtml.replace(/"/g, '') }}
  />
</div>
            </section>
          )}

          {dynamicMisi.length > 0 && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] shrink-0">Misi Sekolah</h2>
                <div className="grow h-px bg-slate-200"></div>
              </div>

              <div className="space-y-6 bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-sm">
                {dynamicMisi.map((misi) => (
                  <div
                    key={misi.id}
                    className="flex gap-5 items-start group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                    <p className="text-slate-600 text-base md:text-lg font-medium">
                      {misi.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}