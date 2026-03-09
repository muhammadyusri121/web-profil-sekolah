"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Briefcase, GraduationCap } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// SSR disabled karena library chart memanipulasi DOM secara langsung
const Tree = dynamic(() => import("react-organizational-chart").then((m) => m.Tree), { ssr: false });
const TreeNode = dynamic(() => import("react-organizational-chart").then((m) => m.TreeNode), { ssr: false });

const VPS_BASE = "http://202.52.147.214:5433";

// --- KOMPONEN KOTAK NAMA ---
const MemberNode = ({ member, onClick }: { member: any; onClick: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="inline-block cursor-pointer group"
  >
    <div className="bg-white border-2 border-slate-100 group-hover:border-[#F3C623] p-4 rounded-[24px] shadow-xl shadow-slate-200/50 transition-all min-w-[160px] md:min-w-[200px]">
      <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100">
        <img
          src={member.image_url ? (member.image_url.startsWith('http') ? member.image_url : `${VPS_BASE}${member.image_url}`) : "/placeholder-user.png"}
          alt={member.full_name}
          className="w-full h-full object-cover"
          onError={(e) => { (e.currentTarget.src = "/placeholder-user.png"); }}
        />
      </div>
      <h4 className="text-[11px] md:text-[13px] font-black text-slate-900 uppercase leading-tight">
        {member.full_name}
      </h4>
      <p className="text-[9px] font-bold text-[#F3C623] uppercase tracking-widest mt-1">
        {member.position}
      </p>
    </div>
  </motion.div>
);

export default function StrukturGTKPage() {
  const [personnel, setPersonnel] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await fetch('/api/personnel'); // Menggunakan route API yang kita buat
        const data = await response.json();
        setPersonnel(data);
      } catch (err) {
        console.error("Gagal load data GTK:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonnel();
  }, []);

  // --- LOGIKA HIRARKI ---
  // 1. Cari Kepala Sekolah
  const kepalaSekolah = personnel.find(p => p.position.toLowerCase().includes("kepala sekolah"));
  // 2. Cari semua Wakasek
  const wakasekList = personnel.filter(p => p.position.toLowerCase().includes("waka"));
  // 3. Sisanya adalah Guru/Staff
  const guruList = personnel.filter(p => 
    !p.position.toLowerCase().includes("kepala") && 
    !p.position.toLowerCase().includes("waka")
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-slate-400">Loading Struktur...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Header />

      <main className="grow pt-32 pb-24 overflow-x-auto selection:bg-[#F3C623]">
        <div className="max-w-7xl mx-auto px-6 min-w-[1000px]">

          <div className="text-center mb-20">
            <span className="text-[10px] font-black text-[#F3C623] uppercase tracking-[0.4em]">Organization Chart</span>
            <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 uppercase tracking-tighter mt-2">
              Struktur <span className="text-transparent [text-stroke:1px_#0f172a] md:[text-stroke:2px_#0f172a]">GTK</span>
            </h1>
          </div>

          <div className="py-10">
            {kepalaSekolah ? (
              <Tree
                lineWidth={'3px'}
                lineColor={'#F1F5F9'}
                lineBorderRadius={'20px'}
                label={<MemberNode member={kepalaSekolah} onClick={() => setSelectedMember(kepalaSekolah)} />}
              >
                {wakasekList.map((waka, idx) => (
                  <TreeNode key={waka.id} label={<MemberNode member={waka} onClick={() => setSelectedMember(waka)} />}>
                    {/* Tampilkan Guru hanya di bawah Wakasek pertama agar pohon tidak terlalu lebar horizontal */}
                    {idx === 1 && guruList.slice(0, 5).map((guru) => (
                      <TreeNode key={guru.id} label={<MemberNode member={guru} onClick={() => setSelectedMember(guru)} />} />
                    ))}
                  </TreeNode>
                ))}
              </Tree>
            ) : (
              <p className="text-center text-slate-400 font-bold uppercase italic">Data Pimpinan Belum Tersedia</p>
            )}
          </div>
        </div>
      </main>

      {/* --- MODAL DETAIL (POppins & Yellow Theme) --- */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[40px] overflow-hidden shadow-2xl border border-slate-100"
            >
              <div className="bg-[#F3C623] p-10 flex flex-col items-center text-center">
                <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 p-2 bg-black/5 rounded-full hover:bg-black/10 transition-colors">
                  <X size={20} />
                </button>
                <div className="w-28 h-28 bg-white rounded-[32px] p-1 shadow-xl mb-6 border-4 border-white">
                   <img src={selectedMember.image_url || "/placeholder-user.png"} className="w-full h-full object-cover rounded-[28px]" alt="Avatar" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase leading-none">{selectedMember.full_name}</h3>
                <p className="text-slate-800 font-bold text-[10px] uppercase tracking-[0.3em] mt-3 opacity-60">{selectedMember.position}</p>
              </div>
              <div className="p-10 space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#F3C623]"><User size={20} /></div>
                  <div className="flex flex-col"><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nomor Induk Pegawai</span><span className="text-sm font-bold text-slate-700">{selectedMember.nip || "N/A"}</span></div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#F3C623]"><Briefcase size={20} /></div>
                  <div className="flex flex-col"><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Jabatan Struktural</span><span className="text-sm font-bold text-slate-700">{selectedMember.position}</span></div>
                </div>
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">Lihat Jadwal Mengajar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}