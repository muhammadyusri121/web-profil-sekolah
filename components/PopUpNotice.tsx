"use client";

import React, { useState, useEffect } from "react";
import { Info, X } from "lucide-react";

export default function BetaNotice() {
  const [isOpen, setIsOpen] = useState(false);

  // TRIK DEVELOPER: Ubah ini ke 'true' jika ingin pop-up muncul TERUS saat refresh di localhost
  // Ubah ke 'false' jika ingin mengikuti aturan "1x per sesi" saat develop
  const ALWAYS_SHOW_IN_DEV = true; 

  useEffect(() => {
    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
      if (ALWAYS_SHOW_IN_DEV) {
        // Mode Tes: Muncul setiap refresh di localhost
        setIsOpen(true);
      } else {
        // Mode Normal Dev: Hanya muncul 1x per sesi agar tidak mengganggu coding
        const hasSeenNotice = sessionStorage.getItem("beta_notified");
        if (!hasSeenNotice) setIsOpen(true);
      }
    } else {
      // MODE RILIS: Selalu muncul setiap refresh/masuk halaman
      setIsOpen(true);
    }
  }, []);

  const closeNotice = () => {
    setIsOpen(false);
    sessionStorage.setItem("beta_notified", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 font-sans">
      <div className="relative max-w-sm w-full bg-white rounded-[32px] p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
        
        {process.env.NODE_ENV === "development" && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-red-600 text-[8px] font-black text-white rounded-full uppercase tracking-widest">
            Dev Mode
          </div>
        )}

        <button 
          onClick={closeNotice}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#F3C623]/10 flex items-center justify-center rounded-2xl mb-6">
            <Info size={32} className="text-[#F3C623]" />
          </div>

          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
            Versi <span className="text-[#F3C623]">Testing</span>
          </h3>
          
          <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
            Website ini masih dalam tahap pengembangan. Beberapa fitur mungkin menampilkan data yang belum akurat dan beberapa fitur masih dalam tahap optimalisasi. Terima kasih!!!
          </p>

          <button
            onClick={closeNotice}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}