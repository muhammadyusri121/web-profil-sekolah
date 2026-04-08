"use client";

import React from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    BookOpen,
    ArrowRight,
    ExternalLink,
    User2,
    Calendar1,
    Calendar,
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import Info from "@/components/InfoDetail"

const layananData = [
    {
        title: "Cek Kelulusan Murid",
        desc: "Layanan mandiri pengecekan status kelulusan siswa SMAN 1 Ketapang.",
        icon: <User2 size={20} />,
        href: "/kelulusan",
        isExternal: false,
        color: "bg-yellow-50 text-yellow-600",
        usage: [
            "Siapkan Nomor Induk Siswa Nasional (NISN).",
            "Klik tombol 'Masuk Layanan' di bawah ini.",
            "Masukkan NISN dan tanggal lahir pada kolom yang tersedia.",
            "Tekan tombol 'Cek' untuk melihat status kelulusan."
        ]
    },
    {
        title: "Cek SPMB Siswa",
        desc: "Layanan pendaftaran siswa SMAN 1 Ketapang.",
        icon: <Calendar1 size={20} />,
        href: "https://spmbjatim.net/",
        isExternal: true,
        color: "bg-blue-50 text-blue-600",
    },
    {
        title: "Cek Hasil SNPMB",
        desc: "Layanan pengecekan SNPMB nasional siswa SMAN 1 Ketapang untuk hasil SNBP & SNBT.",
        icon: <Calendar size={20} />,
        href: "https://pengumuman-snbp.snpmb.id/timer.html",
        isExternal: true,
        color: "bg-blue-50 text-blue-600",
        usage: [
            "Pastikan Anda menyiapkan nomor pendaftaran peserta terlebih dahulu.",
            "Buka portal resmi di bawah ini untuk masuk ke situs resminya.",
            "Masukkan nomor pendaftaran peserta pada kolom yang tersedia.",
            "Klik tombol 'Lihat Hasil Seleksi' untuk melihat status kelulusan.",
            "Tunggu sampai layar menampilkan hasilnya.",
            "Selesai."

        ]
    },
];

export default function LayananPage() {
    const [pageInfo, setPageInfo] = React.useState<{ title: string; content: string }>({
        title: "Pusat Layanan Sekolah",
        content: "Berbagai layanan digital SMAN 1 Ketapang untuk memudahkan civitas akademika."
    });
    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

    React.useEffect(() => {
        const fetchPageInfo = async () => {
            try {
                const res = await fetch('/api/post?slug=layanan');
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
        fetchPageInfo();
    }, []);

    const toggleExpand = (idx: number) => {
        setExpandedIndex(expandedIndex === idx ? null : idx);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />

            <main className="grow pt-24 pb-12 md:pt-32 md:pb-24">
                <div className="max-w-4xl mx-auto px-6">
                    <header className="mb-12">
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-5xl font-[1000] text-slate-900 uppercase tracking-tighter"
                        >
                            {pageInfo.title.split(' ')[0]} <span className="text-[#F3C623]">{pageInfo.title.split(' ').slice(1).join(' ')}</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 text-slate-500 text-sm md:text-lg font-medium leading-relaxed max-w-2xl"
                        >
                            {pageInfo.content.replace(/<[^>]*>/g, '')}
                        </motion.p>
                    </header>

                    <div className="grid grid-cols-1 gap-4">
                        {layananData.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`overflow-hidden bg-white rounded-2xl border transition-all duration-300 ${
                                    expandedIndex === idx 
                                    ? "border-[#F3C623] shadow-xl shadow-yellow-500/5 ring-1 ring-[#F3C623]/20" 
                                    : "border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/50"
                                }`}
                            >
                                <button
                                    onClick={() => toggleExpand(idx)}
                                    className="w-full text-left flex items-center gap-4 p-5 md:p-6 transition-colors group"
                                >
                                    <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl transition-all duration-500 ${
                                        expandedIndex === idx ? "bg-[#F3C623] text-white rotate-6" : item.color
                                    }`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">
                                            {item.title}
                                        </h2>
                                        <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:text-[#F3C623] transition-all duration-300 ${
                                        expandedIndex === idx ? "rotate-180 bg-yellow-50 text-[#F3C623]" : ""
                                    }`}>
                                        <ChevronDown size={18} strokeWidth={3} />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {expandedIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-5 pb-6 md:px-24 md:pb-10 border-t border-slate-50 pt-6">
                                                {item.usage && item.usage.length > 0 && (
                                                    <>
                                                        <div className="flex items-center gap-2 mb-4 text-[#F3C623]">
                                                            <BookOpen size={16} strokeWidth={3} />
                                                            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Tata Cara Penggunaan</span>
                                                        </div>
                                                        
                                                        <ul className="space-y-3 mb-8">
                                                            {item.usage.map((step, sIdx) => (
                                                                <li key={sIdx} className="flex gap-4 group/step">
                                                                    <span className="flex-none w-6 h-6 rounded-lg bg-slate-50 text-slate-400 text-[10px] font-bold flex items-center justify-center border border-slate-100 group-hover/step:border-[#F3C623]/30 group-hover/step:text-[#F3C623] transition-colors mt-0.5">
                                                                        {sIdx + 1}
                                                                    </span>
                                                                    <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                                                        {step}
                                                                    </p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}

                                                <Link
                                                    href={item.href}
                                                    target={item.isExternal ? "_blank" : "_self"}
                                                    className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-slate-900 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-[#F3C623] hover:text-slate-900 transition-all active:scale-95 group/btn"
                                                >
                                                    Masuk Layanan
                                                    {item.isExternal ? <ExternalLink size={14} strokeWidth={3} /> : <ArrowRight size={14} strokeWidth={3} />}
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    <Info />
                </div>
            </main>

            <Footer />
        </div>
    );
}
