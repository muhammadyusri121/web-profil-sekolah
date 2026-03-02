import React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getHolidays } from "@/data/data_holiday";
import CalendarContent from "./calendar-content";

export default async function KalenderPage() {
  const holidays = await getHolidays();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Halaman */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-[1000] text-slate-900 uppercase tracking-tighter">
              Kalender <span className="text-[#F3C623]">Akademik</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
              Tahun Ajaran 2025/2026
            </p>
          </div>

          {/* Layout 2 Kolom: Kiri (Data), Kanan (Kalender) */}
          <CalendarContent initialHolidays={holidays} />

        </div>
      </main>

      <Footer />
    </div>
  );
}