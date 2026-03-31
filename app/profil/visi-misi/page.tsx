"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Zap, Award, Target } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface MisiItem {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const staticMisiData: MisiItem[] = [
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
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string }>({
    title: "Visi & Misi",
    content: "Eksplorasi fokus strategis dan tujuan utama sekolah untuk masa depan siswa."
  });
  
  const [visionHtml, setVisionHtml] = useState<string>("\"Santun dalam pekerti, <br /> unggul dalam prestasi, <br /> <span class=\\\"text-[#F3C623]\\\">kondusif dalam edukasi.\\\"</span>");
  const [dynamicMisi, setDynamicMisi] = useState<MisiItem[]>(staticMisiData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch page info from post
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
        console.error("Gagal mengambil info halaman:", error);
      }

      try {
        // Fetch vision and mission from profile
        const resProfile = await fetch('/api/school-profile');
        if (resProfile.ok) {
          const profile = await resProfile.json();
          if (profile && profile.vision) {
            setVisionHtml(profile.vision);
          }
          if (profile && profile.mission) {
            // parse the mission text
            let mText = profile.mission;
            mText = mText.replace(/<\/?(ul|ol|li)[^>]*>/gi, '\\n').replace(/<br\s*\/?>/gi, '\\n').replace(/<[^>]*>/g, '');
            const list = mText.split('\\n').map((s: string) => s.trim()).filter(Boolean);
            
            if (list.length > 0) {
              const icons = [
                <Rocket key="1" className="text-yellow-600" size={20} />,
                <ShieldCheck key="2" className="text-yellow-600" size={20} />,
                <Zap key="3" className="text-yellow-600" size={20} />,
                <Award key="4" className="text-yellow-600" size={20} />,
                <Target key="5" className="text-yellow-600" size={20} />
              ];
              
              setDynamicMisi(list.map((item: string, idx: number) => {
                // Try to extract title if there's a colon or dash
                let title = `Misi ${idx + 1}`;
                let desc = item;
                const splitMisi = item.split(/[:\-]/);
                if (splitMisi.length > 1 && splitMisi[0].length < 40) {
                  title = splitMisi[0].trim();
                  desc = splitMisi.slice(1).join(" - ").trim();
                }

                return {
                  id: idx + 1,
                  title: title,
                  desc: desc,
                  icon: icons[idx % icons.length]
                };
              }));
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
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="grow pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Header Dinamis */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none mb-4">
              {pageInfo.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "text-yellow-500" : ""}>{word} </span>
              ))}
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
              {pageInfo.content.replace(/<[^>]*>/g, '')}
            </p>
          </div>

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
              <div 
                className="text-xl md:text-3xl font-black text-slate-900 leading-[1.2] uppercase italic tracking-tighter"
                dangerouslySetInnerHTML={{ __html: visionHtml }}
              />
            </div>
          </motion.section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest shrink-0">Misi Sekolah</h2>
              <div className="grow h-px bg-slate-400"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dynamicMisi.map((misi, idx) => (
                <motion.div
                  key={misi.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-[#F3C623]/50 hover:bg-slate-50 transition-all"
                >
                  <div className="mt-1">
                    {misi.icon}
                  </div>
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