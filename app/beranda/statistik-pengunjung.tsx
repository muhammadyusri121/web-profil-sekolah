'use client';

import React, { useEffect, useState } from 'react';
import { Users, Globe, CalendarDays, CalendarClock, Target, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface VisitorStats {
    today: number;
    month: number;
    year: number;
    total: number;
}

export default function StatistikPengunjung() {
    const [stats, setStats] = useState<VisitorStats>({
        today: 0,
        month: 0,
        year: 0,
        total: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);

                // 1. Selalu POST untuk mencatat kunjungan setiap kali halaman diload
                await fetch('/api/visitor', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: 'homepage' }),
                    cache: 'no-store',
                });

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
                        total: getData.total || 0
                    });
                }
            } catch (error) {
                console.error('Gagal mengambil statistik pengunjung:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const dataItems = [
        { label: "Hari Ini", value: stats.today, color: "text-white" },
        { label: "Bulan Ini", value: stats.month, color: "text-white" },
        { label: "Tahun Ini", value: stats.year, color: "text-white" },
        { label: "Total", value: stats.total, color: "text-white" },
    ];

    return (
        <div className="w-full bg-slate-900 backdrop-blur-sm border-t border-slate-800 text-slate-300 py-2">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                    <div className="hidden sm:flex items-center gap-2 pr-6 border-r border-slate-800">
                        <Users size={12} className="text-yellow-500" />
                        <span className="text-[10px] font-bold uppercase tracking-tight text-slate-500">Statistik Pengunjung</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1">
                        {dataItems.map((item, idx) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="flex items-center gap-2"
                            >
                                <span className="text-[9px] font-bold uppercase tracking-tight text-slate-500">{item.label}</span>
                                <span className={`text-xs font-black leading-none ${item.color}`}>
                                    {loading ? "..." : item.value.toLocaleString('id-ID')}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
