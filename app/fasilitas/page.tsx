"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus,
  Image as ImageIcon
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface Facility {
  id: string;
  name: string;
  quantity: number;
  image_url: string | null;
}

export default function FasilitasPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch('/api/facility');
        if (res.ok) {
          const data = await res.json();
          setFacilities(data);
        }
      } catch (err) {
        console.error("Gagal load fasilitas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="grow pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 text-center md:text-left">
             <h1 className="mt-4 text-4xl md:text-6xl font-black text-black leading-[1.1] tracking-tighter uppercase">
               Fasilitas <span className="text-yellow-500">Sekolah</span>
             </h1>
          </header>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className="aspect-4/3 bg-slate-100 animate-pulse rounded-lg" />
               ))}
            </div>
          ) : facilities.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {facilities.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col bg-white rounded-lg overflow-hidden border border-yellow-200 shadow-sm h-full"
                >
                  <div className="relative aspect-4/3 w-full bg-slate-50 flex items-center justify-center overflow-hidden border-b border-yellow-100">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-slate-50">
                        <ImageIcon className="w-8 h-8 text-slate-200" />
                      </div>
                    )}
                    
                    {/* Quantity Badge */}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 text-white text-[9px] font-black rounded-md flex items-center gap-1">
                       <Plus size={8} /> {item.quantity} Unit
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="text-xs md:text-sm font-bold text-black leading-snug line-clamp-2">
                       {item.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-yellow-50/20 rounded-xl border border-dashed border-yellow-200 text-center">
               <p className="text-black text-sm font-medium italic uppercase tracking-widest">
                  Data Fasilitas Belum Tersedia
               </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}