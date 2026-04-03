"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  ExternalLink,
  BookOpen,
  FileSpreadsheet,
  Gavel,
  Calendar
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Helper from "@/components/InfoDetail";
import { AnimatedHeading } from "@/components/ui/animated-heading";

enum DocType {
  REGULATION = "REGULATION",
  TEACHING_MATERIAL = "TEACHING_MATERIAL",
  SCHEDULE = "SCHEDULE"
}

interface AcademicDocument {
  id: string;
  file_name: string;
  file_path: string;
  doc_type: DocType;
  createdAt: string;
}

const getDocTypeInfo = (type: DocType) => {
  switch (type) {
    case DocType.REGULATION:
      return { label: "Peraturan", color: "bg-red-50 text-red-600 border-red-100", icon: <Gavel size={18} /> };
    case DocType.TEACHING_MATERIAL:
      return { label: "Bahan Ajar", color: "bg-blue-50 text-blue-600 border-blue-100", icon: <BookOpen size={18} /> };
    case DocType.SCHEDULE:
      return { label: "Jadwal", color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: <FileSpreadsheet size={18} /> };
    default:
      return { label: "Dokumen", color: "bg-slate-50 text-slate-600 border-slate-100", icon: <FileText size={18} /> };
  }
};

export default function PerangkatPembelajaranPage() {
  const [documents, setDocuments] = useState<AcademicDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string }>({
    title: "Perangkat Pembelajaran",
    content: "Akses dan unduh berbagai dokumen pendukung pembelajaran, mulai dari peraturan sekolah hingga bahan ajar terkini."
  });

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch('/api/academic-document');
        if (res.ok) {
          const data = await res.json();
          setDocuments(data);
        }
      } catch (err) {
        console.error("Gagal load dokumen akademik:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchPageInfo = async () => {
      try {
        const res = await fetch('/api/post?slug=perangkat-pembelajaran');
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
        console.error("Gagal load info halaman:", err);
      }
    };

    fetchDocuments();
    fetchPageInfo();
  }, [pageInfo.content]);

  const titleParts = pageInfo.title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header />

      <main className="grow pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-5xl mx-auto px-5">
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
            <div className="grid gap-3">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className="h-24 bg-white border border-slate-100 animate-pulse rounded-xl" />
               ))}
            </div>
          ) : documents.length > 0 ? (
            <div className="grid gap-3 md:gap-4">
              {documents.map((doc, index) => {
                const typeInfo = getDocTypeInfo(doc.doc_type);
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-xl border border-slate-200 p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-yellow-400 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${typeInfo.color}`}>
                        {typeInfo.icon}
                      </div>
                      
                      <div className="flex flex-col gap-1 min-w-0">
                        <h3 className="text-sm md:text-base font-black text-slate-900 leading-tight group-hover:text-yellow-600 transition-colors uppercase tracking-tight truncate">
                          {doc.file_name}
                        </h3>

                        <div className="flex items-center gap-3">
                           <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${typeInfo.color}`}>
                             {typeInfo.label}
                           </span>
                           <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                             <Calendar size={10} className="text-slate-300" />
                             {new Date(doc.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={doc.file_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 text-[10px] font-black uppercase rounded-lg hover:bg-slate-100 transition-colors border border-slate-100"
                      >
                        <ExternalLink size={12} />
                        Lihat
                      </a>
                      <a
                        href={doc.file_path}
                        download
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase rounded-lg hover:bg-yellow-500 hover:text-black shadow-sm transition-all active:scale-95"
                      >
                        <Download size={12} />
                        Unduh
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-xl border border-dashed border-slate-200 text-center">
               <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-slate-200 mb-4">
                  <FileText size={32} />
               </div>
               <p className="text-slate-900 text-sm font-black uppercase tracking-widest">
                 Belum Ada Dokumen
               </p>
               <p className="mt-1 text-slate-400 text-xs font-medium">
                 Dokumen akademik akan segera diunggah oleh pihak kurikulum.
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