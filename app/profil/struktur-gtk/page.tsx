"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LayoutGrid, Network, X } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const Tree = dynamic(() => import("react-organizational-chart").then((m) => m.Tree), { ssr: false });
const TreeNode = dynamic(() => import("react-organizational-chart").then((m) => m.TreeNode), { ssr: false });

const OrgChartStyles = () => (
    <style dangerouslySetInnerHTML={{ __html: `
        .org-tree-container ul { padding-top: 20px; position: relative; transition: all 0.5s; display: flex; justify-content: center; }
        .org-tree-container li { text-align: center; list-style-type: none; position: relative; padding: 20px 5px 0 5px; transition: all 0.5s; }
        .org-tree-container li::before, .org-tree-container li::after { content: ''; position: absolute; top: 0; right: 50%; border-top: 2px solid #CBD5E1; width: 50%; height: 20px; }
        .org-tree-container li::after { right: auto; left: 50%; border-left: 2px solid #CBD5E1; }
        .org-tree-container li:only-child::after, .org-tree-container li:only-child::before { display: none; }
        .org-tree-container li:only-child { padding-top: 0; }
        .org-tree-container li:first-child::before, .org-tree-container li:last-child::after { border: 0 none; }
        .org-tree-container li:last-child::before { border-right: 2px solid #CBD5E1; border-radius: 0 10px 0 0; }
        .org-tree-container li:first-child::after { border-radius: 10px 0 0 0; }
        .org-tree-container ul ul::before { content: ''; position: absolute; top: 0; left: 50%; border-left: 2px solid #CBD5E1; width: 0; height: 20px; }
    `}} />
);

const MemberNode = ({ member, onClick, isCompact = false }: { member: any; onClick: () => void; isCompact?: boolean }) => (
  <div
    onClick={onClick}
    className={`inline-flex flex-col items-center cursor-pointer group ${isCompact ? "p-2" : "p-4"}`}
  >
    <div className={`relative ${isCompact ? "w-20 h-20" : "w-24 h-24 md:w-32 md:h-32"} mb-4 bg-slate-100 overflow-hidden shadow-sm`}>
      <Image
        src={member.image_url || "/placeholder-user.png"}
        alt={member.full_name}
        fill
        className="object-cover"
        sizes={isCompact ? "80px" : "128px"}
      />
    </div>
    
    <div className="max-w-[150px] text-center">
      <h4 className="text-[11px] md:text-[13px] font-black text-slate-900 uppercase leading-none tracking-tight">
        {member.full_name}
      </h4>
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight mt-1.5">
        {member.position}
      </p>
    </div>
  </div>
);

export default function StrukturGTKPage() {
  const [personnel, setPersonnel] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"chart" | "grid">("grid");
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string }>({
    title: "Struktur GTK",
    content: "Daftar Tenaga Pendidik dan Kependidikan SMAN 1 Ketapang."
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personnelRes = await fetch('/api/personnel');
        const resData = await personnelRes.json();
        const actualData = Array.isArray(resData) ? resData : (resData.data || []);
        setPersonnel(actualData);

        const pageRes = await fetch('/api/post?slug=struktur-gtk');
        const pageData = await pageRes.json();
        if (pageData && pageData.title) {
          setPageInfo({
            title: pageData.title,
            content: pageData.content || pageInfo.content
          });
        }
      } catch (err) {
        console.error("Gagal load data:", err);
      }
    };
    fetchData();

    if (window.innerWidth > 1024) setViewMode("chart");
  }, []);

  const kepalaSekolah = personnel.find(p => p.position.toLowerCase().includes("kepala sekolah"));
  const wakasekList = personnel.filter(p => p.position.toLowerCase().includes("waka"));
  const guruList = personnel.filter(p =>
    !p.position.toLowerCase().includes("kepala") &&
    !p.position.toLowerCase().includes("waka")
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Header />
      <OrgChartStyles />

      <main className="grow pt-24 pb-10 block overflow-hidden selection:bg-slate-200">
        <div className="max-w-7xl mx-auto px-5">

          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4">
              {pageInfo.title}
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-semibold">
              {pageInfo.content.replace(/<[^>]*>/g, '')}
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-slate-200/40 rounded-xl border border-slate-200">
                <button 
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === "grid" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                >
                    <LayoutGrid size={14} />
                    Grid View
                </button>
                <button 
                    onClick={() => setViewMode("chart")}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === "chart" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                >
                    <Network size={14} />
                    Tree View
                </button>
            </div>
          </div>

          <div className={`transition-all duration-500 ${viewMode === "chart" ? "overflow-x-auto pb-10" : ""}`}>
            <div className={viewMode === "chart" ? "min-w-[1200px] flex justify-center py-6" : ""}>
                {personnel.length > 0 ? (
                    viewMode === "chart" ? (
                        kepalaSekolah && (
                            <Tree
                                lineWidth={'2px'}
                                lineColor={'#CBD5E1'}
                                lineHeight={'50px'}
                                lineBorderRadius={'0px'}
                                nodePadding={'10px'}
                                label={<MemberNode member={kepalaSekolah} onClick={() => setSelectedMember(kepalaSekolah)} />}
                            >
                                {wakasekList.map((waka) => (
                                    <TreeNode 
                                        key={waka.id} 
                                        label={<MemberNode member={waka} onClick={() => setSelectedMember(waka)} />}
                                    />
                                ))}
                                
                                <TreeNode 
                                  label={
                                    <div className="py-2 px-6 bg-slate-100 inline-block text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-200">
                                      Tenaga Pendidik & Kependidikan
                                    </div>
                                  }
                                >
                                  {guruList.map((guru) => (
                                      <TreeNode 
                                      key={guru.id} 
                                      label={<MemberNode member={guru} onClick={() => setSelectedMember(guru)} isCompact />} 
                                      />
                                  ))}
                                </TreeNode>
                            </Tree>
                        )
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-center">
                            {kepalaSekolah && <MemberNode member={kepalaSekolah} onClick={() => setSelectedMember(kepalaSekolah)} />}
                            {wakasekList.map(waka => <MemberNode key={waka.id} member={waka} onClick={() => setSelectedMember(waka)} />)}
                            {guruList.map(guru => <MemberNode key={guru.id} member={guru} onClick={() => setSelectedMember(guru)} />)}
                        </div>
                    )
                ) : (
                    <div className="py-20 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Memuat data personnel...
                    </div>
                )}
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedMember && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-10 text-center">
                <div className="relative w-40 aspect-[3/4] mx-auto mb-8 bg-slate-50 border border-slate-100">
                  <Image
                    src={selectedMember.image_url || "/placeholder-user.png"}
                    fill
                    className="object-cover"
                    alt={selectedMember.full_name}
                  />
                </div>

                <h3 className="text-2xl font-black text-slate-900 uppercase leading-tight tracking-tight mb-2">
                  {selectedMember.full_name}
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10">
                  {selectedMember.position}
                </p>

                <div className="space-y-4 pt-8 border-t border-slate-50 text-left">
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">NIP Sekolah</p>
                    <p className="text-base font-bold text-slate-800">{selectedMember.nip || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Status Jabatan</p>
                    <p className="text-base font-bold text-slate-800">{selectedMember.position}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50/50">
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="w-full py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Tutup Profil
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}