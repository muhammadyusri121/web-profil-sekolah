'use client';

import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VisitorCounter() {
    const [visitorCount, setVisitorCount] = useState<number | null>(null);
    const [hasIncremented, setHasIncremented] = useState(false);

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                // Cek localStorage, apakah user sudah mengunjungi halaman ini sebelumnya
                const visitedBefore = localStorage.getItem('hasVisitedHomepage');

                if (!visitedBefore) {
                    // Jika belum, panggil API POST untuk menambah count
                    const res = await fetch('/api/visitor', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ path: 'homepage' }),
                    });

                    if (res.ok) {
                        const data = await res.json();
                        setVisitorCount(data.count);
                        localStorage.setItem('hasVisitedHomepage', 'true');
                        setHasIncremented(true);
                    }
                } else {
                    // Jika sudah pernah, cukup ambil (GET) count saat ini tanpa menambah
                    const res = await fetch('/api/visitor?path=homepage');
                    if (res.ok) {
                        const data = await res.json();
                        setVisitorCount(data.count);
                    }
                }
            } catch (error) {
                console.error('Error handling visitor count:', error);
            }
        };

        fetchVisitorCount();
    }, []);

    if (visitorCount === null) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-2.5 shadow-sm transition-all hover:border-yellow-300 hover:shadow-md"
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                <Users size={16} className={hasIncremented ? "text-yellow-500" : ""} />
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Pengunjung
                </p>
                <p className="text-sm font-black text-slate-900 leading-tight">
                    {visitorCount.toLocaleString('id-ID')}
                </p>
            </div>
        </motion.div>
    );
}
