"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    UserPlus,
    BookOpen,
    GraduationCap,
    Users,
    MessageCircle,
    FileText,
    ChevronRight,
    LayoutGrid,
    User
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";

const layananData = [
    {
        title: "Cek Kelulusan Murid",
        desc: "Layanan mandiri pengecekan status kelulusan siswa SMAN 1 Ketapang.",
        icon: <GraduationCap size={20} />,
        href: "/kelulusan",
        isExternal: false,
        color: "bg-yellow-50 text-yellow-600"
    },
    {
        title: "Cek Hasil SNPMB",
        desc: "Layanan pengecekan SNPMB nasional siswa SMAN 1 Ketapang.",
        icon: <Users size={20} />,
        href: "https://pengumuman-snbp.snpmb.id",
        isExternal: true,
        color: "bg-yellow-50 text-yellow-600"
    },
];

export default function LayananPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />

            <main className="grow pt-28 pb-20 md:pt-36 md:pb-24">
                <div className="max-w-5xl mx-auto px-6">
                    <header className="mb-10">
                        <h1 className="text-2xl md:text-4xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none mb-2">
                            Pusat <span className="text-[#F3C623]">Layanan Sekolah</span>
                        </h1>
                    </header>

                    <div className="grid grid-cols-1 gap-3 md:gap-4">
                        {layananData.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    target={item.isExternal ? "_blank" : "_self"}
                                    className="group relative flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-[#F3C623] hover:shadow-md transition-all active:scale-[0.98]"
                                >
                                    <div className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${item.color}`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 pr-4">
                                        <h2 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:text-[#F3C623] transition-colors">
                                            {item.title}
                                        </h2>
                                        <p className="text-[11px] md:text-xs font-medium text-slate-500 mt-0.5 line-clamp-1">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="absolute top-4 right-4 text-slate-700 group-hover:text-[#F3C623] transition-colors">
                                        <ChevronRight size={16} strokeWidth={3} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Card Minimalist */}
                    <div className="mt-16 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Butuh bantuan lainnya?</p>
                        <p className="text-sm font-bold text-slate-600">Silahkan hubungi bagian administrasi sekolah atau guru pendidik pada jam kerja.</p>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}