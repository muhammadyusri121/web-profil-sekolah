'use client';

import React, { useEffect, useState } from 'react';
import { Users, Globe, CalendarDays, CalendarClock, Target, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface VisitorStats {
    today: number;
    month: number;
    year: number;
    total: number;
    country: string;
}

export default function StatistikPengunjung() {
    const [stats, setStats] = useState<VisitorStats>({
        today: 0,
        month: 0,
        year: 0,
        total: 0,
        country: 'ID'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);

                // 1. Selalu POST untuk mencatat kunjungan setiap kali halaman diload
                const postRes = await fetch('/api/visitor', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: 'homepage' }),
                    cache: 'no-store',
                });

                let country = 'ID'; // Default fallback
                if (postRes.ok) {
                    const postData = await postRes.json();
                    country = postData.country || 'ID';
                }

                // 2. GET agregasi hari, bulan, tahun
                const getRes = await fetch('/api/visitor?path=homepage', {
                    cache: 'no-store',
                });
                if (getRes.ok) {
                    const getData = await getRes.json();
                    setStats({
                        today: getData.today || 0,
                        month: getData.month || 0,
                        year: getData.year || 0,
                        total: getData.total || 0,
                        country: country
                    });
                }
            } catch (error) {
                console.error('Gagal mengambil statistik pengunjung:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        // Refresh data setiap 5 menit agar live
        const interval = setInterval(fetchStats, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const dataItems = [
        { label: "Hari Ini", value: stats.today, icon: <Activity size={14} />, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Bulan Ini", value: stats.month, icon: <CalendarDays size={14} />, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: "Tahun Ini", value: stats.year, icon: <CalendarClock size={14} />, color: "text-amber-500", bg: "bg-amber-50" },
        { label: "Total Kunjungan", value: stats.total, icon: <Target size={14} />, color: "text-indigo-500", bg: "bg-indigo-50" },
    ];

    return (
        <div className="w-full bg-slate-900 border-t border-slate-800 text-slate-300 py-3 sm:py-4">
            <div className="mx-auto max-w-7xl px-4 md:px-6">

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                    {/* Judul & Negara */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-slate-700">
                            <Users size={18} className="text-yellow-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-wider">Statistik Web</h3>
                            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] font-medium text-slate-400">
                                <Globe size={11} className="text-slate-500" />
                                <span>Asal Negara: <strong className="text-slate-200">{stats.country}</strong></span>
                            </div>
                        </div>
                    </div>

                    {/* Baris Statistik */}
                    <div className="flex flex-wrap lg:flex-nowrap gap-2 sm:gap-3 lg:justify-end w-full">
                        {dataItems.map((item, idx) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="flex flex-1 min-w-[130px] items-center gap-3 rounded-xl bg-slate-800/50 border border-slate-700/50 px-3.5 py-2.5 hover:bg-slate-800 transition-colors"
                            >
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color}`}>
                                    {item.icon}
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 truncate">{item.label}</span>
                                    <span className="text-sm font-black text-white leading-tight">
                                        {loading ? "..." : item.value.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}
