"use client";

import React from "react";

import { motion } from "framer-motion";
import {
    GraduationCap,
    Users,
    ChevronRight,
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import Info from "@/components/InfoDetail"

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
        href: "https://spmbjatim.net/",
        isExternal: true,
        color: "bg-yellow-50 text-yellow-600"
    },
];

export default function LayananPage() {
    const [pageInfo, setPageInfo] = React.useState<{ title: string; content: string }>({
        title: "Pusat Layanan Sekolah",
        content: "Berbagai layanan digital SMAN 1 Ketapang untuk memudahkan civitas akademika."
    });

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

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />

            <main className="grow pt-20 pb-5 md:pt-20 md:pb-20">
                <div className="max-w-5xl mx-auto px-6">
                    <header className="mb-10 max-w-2xl">
                        <h1 className="text-2xl md:text-4xl font-[1000] text-slate-900 uppercase">
                            {pageInfo.title.split(' ')[0]} <span className="text-[#F3C623]">{pageInfo.title.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="mt-4 text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                            {pageInfo.content.replace(/<[^>]*>/g, '')}
                        </p>
                    </header>

                    <div className="grid grid-cols-1 gap-3 md:gap-5">
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
                                        <h2 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight leading-tight transition-colors">
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

                    <Info />
                </div>
            </main>

            <Footer />
        </div>
    );
}