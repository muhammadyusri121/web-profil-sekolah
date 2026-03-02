"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarDays, MapPin } from "lucide-react";

export default function CalendarContent({ initialHolidays }: { initialHolidays: any[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Memetakan tanggal libur dari database untuk indikator kalender
  const holidayDates = initialHolidays.map((h) => new Date(h.date));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      {/* --- KOLOM KIRI: DAFTAR DATA (AGENDA) --- */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px bg-slate-100 grow" />
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Daftar Agenda</h2>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
          {initialHolidays.length > 0 ? (
            initialHolidays.map((item) => (
              <div 
                key={item.id} 
                className="group flex gap-4 p-5 bg-slate-50 rounded-3xl border border-transparent hover:border-[#F3C623] hover:bg-white transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center min-w-[50px] h-12 bg-white rounded-2xl shadow-sm group-hover:bg-[#F3C623] group-hover:text-white transition-colors">
                  <span className="text-lg font-black leading-none">{new Date(item.date).getDate()}</span>
                  <span className="text-[8px] font-black uppercase tracking-tighter">
                    {format(new Date(item.date), "MMM", { locale: id })}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase leading-tight group-hover:text-[#F3C623] transition-colors">
                    {item.description}
                  </h4>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400 py-10 font-bold uppercase text-xs">Belum ada agenda terdaftar.</p>
          )}
        </div>
      </div>

      {/* --- KOLOM KANAN: KALENDER INTERAKTIF --- */}
      <div className="lg:col-span-7 order-1 lg:order-2">
        <div className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-100 flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={id}
            className="rounded-md"
            // CUSTOM: Tandai tanggal libur dari database
            modifiers={{ holiday: holidayDates }}
            modifiersClassNames={{
              holiday: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#F3C623] after:rounded-full font-black text-slate-900"
            }}
            classNames={{
              day_selected: "bg-[#F3C623] text-slate-900 hover:bg-[#F3C623] hover:text-slate-900 focus:bg-[#F3C623] focus:text-slate-900 rounded-xl",
              day_today: "bg-slate-100 text-slate-900 font-black rounded-xl",
            }}
          />
        </div>
        
        {/* Legend / Keterangan Warna */}
        <div className="mt-6 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F3C623]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hari Libur / Agenda</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-100" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hari Ini</span>
          </div>
        </div>
      </div>

    </div>
  );
}