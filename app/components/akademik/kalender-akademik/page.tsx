import React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getHolidays } from "@/data/data_holiday";
import CalendarContent from "./calendar-content";
import { CalendarDays } from "lucide-react";

export default async function KalenderPage() {
  const holidays = await getHolidays();

  // Stats for the header
  const now = new Date();
  const upcoming = holidays.filter((h: any) => new Date(h.date) >= now);
  const thisMonth = holidays.filter((h: any) => {
    const d = new Date(h.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />

      <main className="grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* ── Page Header ── */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none">
                Kalender <span className="text-[#F3C623]">Akademik</span>
              </h1>
            </div>
          </div>

          <CalendarContent initialHolidays={holidays} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
