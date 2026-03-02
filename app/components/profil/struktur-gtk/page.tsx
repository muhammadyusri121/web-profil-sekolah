"use client";

import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Mail } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// --- KOMPONEN KOTAK NAMA (NODE) ---
const MemberNode = ({ member, onClick }: { member: any; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="inline-block cursor-pointer group"
  >
    <div className="bg-white border-2 border-slate-100 group-hover:border-[#F3C623] p-3 rounded-2xl shadow-sm transition-all active:scale-95 min-w-[140px] md:min-w-[180px]">
      <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100">
        <img 
          src={member.foto || "/login-logo.png"} 
          alt={member.nama} 
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as any).src = "https://placehold.co/100x100?text=GTK"; }}
        />
      </div>
      <h4 className="text-[10px] md:text-[12px] font-black text-slate-900 uppercase leading-tight truncate">
        {member.nama}
      </h4>
      <p className="text-[8px] md:text-[9px] font-bold text-[#F3C623] uppercase tracking-tighter mt-1">
        {member.jabatan}
      </p>
    </div>
  </div>
);

export default function StrukturGTKPage() {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  // Data Hirarki SMANKA
  const data = {
    pimpinan: { nama: "Sulaiman, S.E., M.Pd.", jabatan: "Kepala Sekolah", nip: "19720512 199802 1 004" },
    wakasek: [
      { nama: "Wakasek 1", jabatan: "Waka Kurikulum" },
      { nama: "Wakasek 2", jabatan: "Waka Kesiswaan" },
      { nama: "Wakasek 3", jabatan: "Waka Humas" },
    ],
    guru: [
      { nama: "Guru A", jabatan: "Matematika" },
      { nama: "Guru B", jabatan: "B. Indonesia" },
      { nama: "Guru C", jabatan: "Fisika" },
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="grow pt-32 pb-24 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-6 min-w-[800px] md:min-w-full">
          
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-[1000] text-slate-900 uppercase tracking-tighter">
              Struktur <span className="text-[#F3C623]">GTK</span>
            </h1>
            <div className="w-12 h-1 bg-[#F3C623] mx-auto mt-2 rounded-full"></div>
          </div>

          {/* --- POHON STRUKTUR --- */}
          <div className="py-10">
            <Tree
              lineWidth={'2px'}
              lineColor={'#E2E8F0'} // Warna slate-200 agar clean
              lineBorderRadius={'15px'}
              label={
                <MemberNode 
                  member={data.pimpinan} 
                  onClick={() => setSelectedMember(data.pimpinan)} 
                />
              }
            >
              {data.wakasek.map((waka, index) => (
                <TreeNode 
                  key={index} 
                  label={
                    <MemberNode 
                      member={waka} 
                      onClick={() => setSelectedMember(waka)} 
                    />
                  }
                >
                  {/* Contoh Guru di bawah Wakasek tertentu jika ingin hirarki lebih dalam */}
                  {index === 0 && data.guru.map((guru, gIndex) => (
                    <TreeNode 
                      key={gIndex} 
                      label={
                        <MemberNode 
                          member={guru} 
                          onClick={() => setSelectedMember(guru)} 
                        />
                      } 
                    />
                  ))}
                </TreeNode>
              ))}
            </Tree>
          </div>
        </div>
      </main>

      {/* --- POPUP / MODAL SEDERHANA --- */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="bg-[#F3C623] p-8 flex flex-col items-center text-center">
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 p-2 bg-black/10 rounded-full hover:bg-black/20"
                >
                  <X size={20} />
                </button>
                <div className="w-24 h-24 bg-white rounded-3xl p-1 shadow-lg mb-4">
                  <img src="/login-logo.png" className="w-full h-full object-contain" alt="GTK" />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase leading-tight">{selectedMember.nama}</h3>
                <p className="text-slate-800 font-bold text-[10px] uppercase tracking-widest mt-1 opacity-70">
                  {selectedMember.jabatan}
                </p>
              </div>
              <div className="p-8 space-y-4">
                 <div className="flex items-center gap-4 text-slate-600">
                    <User size={18} className="text-[#F3C623]" />
                    <span className="text-xs font-bold uppercase">NIP: {selectedMember.nip || "-"}</span>
                 </div>
                 <div className="flex items-center gap-4 text-slate-600">
                    <Phone size={18} className="text-[#F3C623]" />
                    <span className="text-xs font-bold uppercase">Kontak via Sekolah</span>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}