import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl shadow-slate-200/50 text-center border border-slate-100">
        
        {/* Ikon Sukses dengan Aksen Matte Yellow */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center border-4 border-white shadow-inner">
            <CheckCircle2 size={48} className="text-[#F3C623]" />
          </div>
        </div>

        {/* Teks Utama */}
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">
          Selamat! <br />
          <span className="text-[#F3C623]">Anda Berhasil</span>
        </h1>
        
        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
          Aksi atau pengiriman data Anda telah berhasil diproses oleh sistem SMAN 1 Ketapang.
        </p>

        {/* Tombol Kembali (Desain Matte) */}
        <Link href="/">
          <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-2xl hover:bg-[#F3C623] hover:text-slate-900 transition-all duration-300 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </button>
        </Link>
        
      </div>
    </main>
  );
}