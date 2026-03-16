"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  ExternalLink,
  BookOpen,
  FileSpreadsheet,
  Gavel
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

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
      return { label: "Peraturan", color: "bg-red-50 text-red-600 border-red-100", icon: <Gavel size={16} /> };
    case DocType.TEACHING_MATERIAL:
      return { label: "Bahan Ajar", color: "bg-blue-50 text-blue-600 border-blue-100", icon: <BookOpen size={16} /> };
    case DocType.SCHEDULE:
      return { label: "Jadwal", color: "bg-green-50 text-green-600 border-green-100", icon: <FileSpreadsheet size={16} /> };
    default:
      return { label: "Dokumen", color: "bg-slate-50 text-slate-600 border-slate-100", icon: <FileText size={16} /> };
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
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="grow pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 text-center md:text-left">
             <h1 className="mt-4 text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase">
               {pageInfo.title.split(' ')[0]} <span className="text-yellow-500">{pageInfo.title.split(' ').slice(1).join(' ')}</span>
             </h1>
             <p className="mt-4 text-slate-500 font-medium max-w-2xl leading-relaxed">
               {pageInfo.content.replace(/<[^>]*>/g, '')}
             </p>
          </header>

          {loading ? (
            <div className="space-y-4">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className="h-20 bg-slate-50 animate-pulse rounded-2xl" />
               ))}
            </div>
          ) : documents.length > 0 ? (
            <div className="grid gap-4">
              {documents.map((doc, index) => {
                const typeInfo = getDocTypeInfo(doc.doc_type);
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-3xl border border-slate-100 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:shadow-slate-200/50 hover:border-yellow-200 transition-all duration-300"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 ${typeInfo.color}`}>
                        {typeInfo.icon}
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                           <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${typeInfo.color}`}>
                             {typeInfo.label}
                           </span>
                           <span className="text-[10px] text-slate-400 font-bold">
                             {new Date(doc.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                           </span>
                        </div>
                        <h3 className="text-base md:text-lg font-black text-slate-900 leading-tight group-hover:text-yellow-600 transition-colors">
                          {doc.file_name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={doc.file_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 text-[11px] font-black uppercase rounded-2xl hover:bg-slate-100 transition-colors"
                      >
                        <ExternalLink size={14} />
                        Lihat
                      </a>
                      <a
                        href={doc.file_path}
                        download
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black text-[11px] font-black uppercase rounded-2xl hover:bg-yellow-500 shadow-lg shadow-yellow-200 transition-all active:scale-95"
                      >
                        <Download size={14} />
                        Unduh
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 px-6 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 text-center">
               <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 mb-6 shadow-sm">
                  <FileText size={40} />
               </div>
               <p className="text-slate-900 text-lg font-black uppercase tracking-tighter">
                  Belum Ada Dokumen
               </p>
               <p className="mt-2 text-slate-400 text-sm font-medium">
                  Dokumen akademik akan segera diunggah oleh pihak kurikulum.
               </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}