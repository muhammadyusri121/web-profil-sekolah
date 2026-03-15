"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Briefcase, ZoomIn } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const Tree = dynamic(() => import("react-organizational-chart").then((m) => m.Tree), { ssr: false });
const TreeNode = dynamic(() => import("react-organizational-chart").then((m) => m.TreeNode), { ssr: false });

const MemberNode = ({ member, onClick }: { member: any; onClick: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="inline-block cursor-pointer group"
  >
    <div className="bg-white border-2 border-slate-100 group-hover:border-[#F3C623] p-4 rounded-[24px] shadow-xl shadow-slate-200/50 transition-all min-w-[160px] md:min-w-[200px]">
      <div className="w-16 mx-auto mb-3 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100" style={{ aspectRatio: "3/4" }}>
        <img
          src={member.image_url || "/placeholder-user.png"}
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
  const [zoomedPhoto, setZoomedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await fetch('/api/personnel');
        const data = await response.json();
        setPersonnel(data);
      } catch (err) {
        console.error("Gagal load data GTK:", err);
      }
    };
    fetchPersonnel();
  }, []);

  const kepalaSekolah = personnel.find(p => p.position.toLowerCase().includes("kepala sekolah"));
  const wakasekList = personnel.filter(p => p.position.toLowerCase().includes("waka"));
  const guruList = personnel.filter(p =>
    !p.position.toLowerCase().includes("kepala") &&
    !p.position.toLowerCase().includes("waka")
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Header />

      <main className="grow pt-20 pb-5 overflow-x-auto selection:bg-[#F3C623]">
        <div className="max-w-7xl mx-auto px-6 min-w-[1000px]">

          <div className="text-center mb-5">
            <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 uppercase tracking-tighter mt-2">
              Struktur GTK
            </h1>
          </div>

          <div className="py-10">
            {kepalaSekolah ? (
              <Tree
                lineWidth={'3px'}
                lineColor={'#000000'}
                lineBorderRadius={'20px'}
                label={<MemberNode member={kepalaSekolah} onClick={() => setSelectedMember(kepalaSekolah)} />}
              >
                {wakasekList.map((waka, idx) => (
                  <TreeNode key={waka.id} label={<MemberNode member={waka} onClick={() => setSelectedMember(waka)} />}>
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

      <AnimatePresence>
        {selectedMember && (
          <div
            className="fixed inset-0 z-100 flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-linear-to-br from-[#F3C623] to-[#e0a800] pt-10 pb-8 px-8 flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div
                    className="w-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <img
                      src={selectedMember.image_url || "/placeholder-user.png"}
                      className="w-full h-full object-cover"
                      alt="Avatar"
                      onError={(e) => { (e.currentTarget.src = "/placeholder-user.png"); }}
                    />
                  </div>
                  <button
                    onClick={() => setZoomedPhoto(selectedMember.image_url || "/placeholder-user.png")}
                    className="absolute bottom-2 right-[-10px] flex items-center gap-1 bg-white text-slate-800 text-[10px] font-bold px-2 py-1 rounded-full shadow-lg hover:bg-slate-50 transition-colors border border-slate-100"
                    title="Lihat Foto"
                  >
                    <ZoomIn size={11} />
                    <span>Lihat</span>
                  </button>
                </div>

                <h3 className="text-xl font-black text-slate-900 uppercase leading-tight">{selectedMember.full_name}</h3>
                <span className="mt-2 inline-block bg-black/10 text-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                  {selectedMember.position}
                </span>
              </div>

              <div className="p-8 space-y-5 bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center text-[#F3C623] shrink-0">
                    <User size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nomor Induk Pegawai</span>
                    <span className="text-sm font-bold text-slate-800">{selectedMember.nip || "N/A"}</span>
                  </div>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center text-[#F3C623] shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Jabatan Struktural</span>
                    <span className="text-sm font-bold text-slate-800">{selectedMember.position}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {zoomedPhoto && (
          <div
            className="fixed inset-0 z-200 flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setZoomedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                style={{ width: "340px", aspectRatio: "3/4" }}
              >
                <img
                  src={zoomedPhoto}
                  alt="Foto Lengkap"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget.src = "/placeholder-user.png"); }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}