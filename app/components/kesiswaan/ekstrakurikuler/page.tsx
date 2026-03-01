"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const ekskulData = [
    { nama: "Pramuka", slug: "pramuka", icon: "/login-logo.png" },
    { nama: "PMR", slug: "pmr", icon: "/login-logo.png" },
    { nama: "Paskibra", slug: "paskibra", icon: "/login-logo.png" },
    { nama: "Seni Tari", slug: "tari", icon: "/login-logo.png" },
    { nama: "Basket", slug: "basket", icon: "/login-logo.png" },
    { nama: "Voli", slug: "voli", icon: "/login-logo.png" },
    { nama: "Paduan Suara", slug: "padus", icon: "/login-logo.png" },
];

export default function EkskulPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />

            <main className="grow pt-32 pb-32">
                <div className="max-w-5xl mx-auto px-5">

                    <header className="mb-12">
                        <h1 className="text-3xl md:text-4xl font-[1000] text-slate-900 uppercase tracking-tight">
                            Daftar <span className="text-[#F3C623]">Ekstrakurikuler </span>
                        </h1>
                        <p className="text-slate-500 text-sm mt-2 font-medium">
                            Masuk untuk melihat detail informasi setiap ekstrakurikuler.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ekskulData.map((ekskul, idx) => (
                            <motion.div
                                key={ekskul.slug}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Link
                                    href={`/jenis/${ekskul.slug}`}
                                    className="group flex flex-col items-center p-8 bg-white rounded-[32px] border border-slate-200 hover:border-[#F3C623] hover:shadow-xl transition-all active:scale-95"
                                >
                                    <img
                                        src={ekskul.icon}
                                        alt={ekskul.nama}
                                        className="w-20 h-20 object-contain mb-6 group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            (e.target as any).src = "https://placehold.co/200x200?text=Icon";
                                        }}
                                    />

                                    <div className="flex items-center justify-between w-full px-2">
                                        <span className="text-base font-black text-slate-800 uppercase tracking-wide">
                                            {ekskul.nama}
                                        </span>
                                        <div className="bg-slate-50 p-2 rounded-full group-hover:bg-[#F3C623] group-hover:text-white transition-colors">
                                            <ChevronRight size={18} />
                                        </div>
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