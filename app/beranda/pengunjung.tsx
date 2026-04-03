'use client';

import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VisitorCounter() {
    const [visitorCount, setVisitorCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                // Fetch with POST to both increment (if new) and get count
                const res = await fetch('/api/visitor', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: 'homepage' }),
                    cache: 'no-store',
                });

                if (res.ok) {
                    const data = await res.json();
                    setVisitorCount(data.count);
                }
            } catch (error) {
                console.error('Error fetching visitor count:', error);
            }
        };

        fetchCount();
        const interval = setInterval(fetchCount, 10 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (visitorCount === null) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-white/80 backdrop-blur-sm px-3 py-1 shadow-sm transition-all hover:bg-white hover:shadow-md"
        >
            <Users size={12} className="text-yellow-500" />
            <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Visitors:</span>
                <span className="text-[11px] font-black text-slate-800">
                    {visitorCount.toLocaleString('id-ID')}
                </span>
            </div>
        </motion.div>
    );
}
