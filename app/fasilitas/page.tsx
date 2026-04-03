"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Image as ImageIcon,
  Box
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Helper from "@/components/InfoDetail";
import { AnimatedHeading } from "@/components/ui/animated-heading";

interface Facility {
  id: string;
  name: string;
  quantity: number;
  image_url: string | null;
}

export default function FasilitasPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string }>({
    title: "Fasilitas Sekolah",
    content: "Sarana dan prasarana pendukung kegiatan belajar mengajar di SMAN 1 Ketapang."
  });

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch('/api/facility');
        if (res.ok) {
          const data = await res.json();
          setFacilities(data);
        }
      } catch (err) {
        console.error("Gagal ambil data ", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchPageInfo = async () => {
      try {
        const res = await fetch('/api/post?slug=fasilitas');
        if (res.ok) {
          const data = await res.json();
          if (data && data.title) {
            setPageInfo({
              title: data.title,
              content: data.content || pageInfo.content
            });
          }
        }
      } catch (err) {
        console.error("Gagal mengambil data ", err);
      }
    };

    fetchFacilities();
    fetchPageInfo();
  }, [pageInfo.content]);

  const titleParts = pageInfo.title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header />

      <main className="grow pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-5">
  
          <header className="mb-12 md:mb-16 flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <AnimatedHeading className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                {firstWord} <span className="text-yellow-500">{restOfTitle}</span>
              </AnimatedHeading>
              
              <p className="mt-6 text-sm md:text-base text-slate-500 font-medium leading-relaxed text-justify md:text-center hyphens-auto">
                {pageInfo.content.replace(/<[^>]*>/g, '')}
              </p>
            </div>
          </header>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
               {[...Array(10)].map((_, i) => (
                 <div key={i} className="aspect-[4/3] bg-white border border-slate-100 animate-pulse rounded-xl" />
               ))}
            </div>
          ) : facilities.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {facilities.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-yellow-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  <div className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden border-b border-slate-100">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <ImageIcon className="w-8 h-8 text-slate-200" />
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-black rounded-lg flex items-center gap-1.5 tracking-widest uppercase border border-white/10">
                       <Box size={10} className="text-yellow-400" />
                       {item.quantity} Unit
                    </div>
                  </div>

                  <div className="p-3 md:p-4 flex flex-col grow justify-center">
                    <h3 className="text-[11px] md:text-sm font-bold text-slate-900 leading-tight line-clamp-2 uppercase tracking-tight group-hover:text-yellow-600 transition-colors">
                       {item.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-xl border border-dashed border-slate-200 text-center">
               <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-slate-200 mb-4">
                  <Box size={32} />
               </div>
               <p className="text-slate-900 text-sm font-black uppercase tracking-widest">
                 Data Belum Tersedia
               </p>
               <p className="mt-1 text-slate-400 text-xs font-medium">
                 Daftar sarana prasarana sedang diperbarui oleh pihak sarpras.
               </p>
            </div>
          )}
        </div>
        <Helper />
      </main>

      <Footer />
    </div>
  );
}