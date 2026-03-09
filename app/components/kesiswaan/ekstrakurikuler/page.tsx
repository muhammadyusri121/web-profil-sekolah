"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, LayoutGrid } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const ekskulData = [
    { nama: "PMR", slug: "pmr", icon: "/login-logo.png" },
    { nama: "Voli", slug: "voli", icon: "/login-logo.png" },
    { nama: "Basket", slug: "basket", icon: "/login-logo.png" },
    { nama: "Pramuka", slug: "pramuka", icon: "/login-logo.png" },
    { nama: "Paskibraka", slug: "paskibraka", icon: "/login-logo.png" },
    { nama: "Seni Tari", slug: "seni-tari", icon: "/login-logo.png" },
    { nama: "Jurnalistik", slug: "jurnalistik", icon: "/login-logo.png" },
    { nama: "Paduan Suara", slug: "paduan-suara", icon: "/login-logo.png" },
    { nama: "Sains Club", slug: "sains-club", icon: "/login-logo.png" },
];


export default function EkskulPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="grow pt-24 pb-20 md:pt-32 md:pb-32">
                <div className="max-w-5xl mx-auto px-4 md:px-6">
                    <header className="mb-8 md:mb-12">
                        <h1 className="text-2xl md:text-4xl font-[1000] text-slate-900 uppercase tracking-tight">
                            Daftar <span className="text-[#F3C623]">Ekstrakurikuler</span>
                        </h1>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        {ekskulData.map((ekskul, idx) => (
                            <motion.div
                                key={ekskul.slug}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                            >
                                <Link
                                    href={`/ekskul/${ekskul.slug}`}
                                    className="group relative flex items-center gap-4 p-3 md:p-4 bg-white rounded-2xl border border-slate-200 hover:border-[#F3C623] hover:shadow-md transition-all active:scale-[0.98]"
                                >
                                    <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-slate-50 group-hover:bg-yellow-50 transition-colors overflow-hidden">
                                        <img
                                            src={ekskul.icon}
                                            alt={ekskul.nama}
                                            className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                (e.target as any).src = "https://placehold.co/100x100?text=Logo";
                                            }}
                                        />
                                    </div>

                                    <div className="flex-1 pr-6">
                                        <h2 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-tight leading-tight group-hover:text-[#F3C623] transition-colors">
                                            {ekskul.nama}
                                        </h2>
                                    </div>

                                    <div className="absolute top-3 right-3 text-slate-300 group-hover:text-[#F3C623] transition-colors">
                                        <ChevronRight size={16} strokeWidth={3} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}