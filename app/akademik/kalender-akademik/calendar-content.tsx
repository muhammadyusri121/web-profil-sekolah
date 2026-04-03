"use client";

import { useState, useMemo, useCallback } from "react";
import {
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  isToday,
  getDay,
} from "date-fns";
import { id } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

interface Holiday {
  id: string;
  date: string;
  description: string;
}

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function CalendarContent({ initialHolidays }: { initialHolidays: Holiday[] }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [holidays] = useState<Holiday[]>(initialHolidays);

  const monthHolidays = useMemo(() => {
    return holidays
      .filter((h) => isSameMonth(new Date(h.date), currentMonth))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [holidays, currentMonth]);

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const getHolidayForDate = useCallback(
    (day: Date) => holidays.find((h) => isSameDay(new Date(h.date), day)),
    [holidays]
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      <div className="xl:col-span-7">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/30">
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight capitalize">
                {format(currentMonth, "MMMM", { locale: id })}
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Tahun {format(currentMonth, "yyyy")}
              </p>
            </div>
            
            <div className="flex gap-1.5">
              <button 
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} 
                className="p-2 hover:bg-white hover:shadow-sm rounded-xl border border-slate-200 text-slate-500 transition-all active:scale-90"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} 
                className="p-2 hover:bg-white hover:shadow-sm rounded-xl border border-slate-200 text-slate-500 transition-all active:scale-90"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="grid grid-cols-7 mb-4">
              {DAY_NAMES.map((d, i) => (
                <div key={d} className={`text-center text-[10px] font-black uppercase tracking-[0.2em] ${i === 0 ? "text-red-500" : "text-slate-400"}`}>
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 md:gap-1.5">
              {calendarDays.map((day, idx) => {
                const inMonth = isSameMonth(day, currentMonth);
                const holiday = getHolidayForDate(day);
                const isSunday = getDay(day) === 0;
                const isSpecial = holiday || isSunday;
                const selected = selectedDate && isSameDay(day, selectedDate);
                const todayFlag = isToday(day);

                let bgClass = "bg-white border-transparent";
                let textClass = isSpecial ? "text-red-500" : "text-slate-700";
                let ringClass = todayFlag ? "ring-2 ring-slate-900 ring-offset-1" : "";

                if (!inMonth) {
                  textClass = isSpecial ? "text-red-300" : "text-slate-300";
                }

                if (selected) {
                  if (isSpecial) {
                    bgClass = "bg-red-500 text-white shadow-md shadow-red-100 scale-105 z-10";
                    textClass = "text-white";
                  } else {
                    bgClass = "bg-yellow-400 text-slate-900 shadow-md shadow-yellow-100 scale-105 z-10";
                    textClass = "text-slate-900";
                  }
                  ringClass = "";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => inMonth && setSelectedDate(day)}
                    className={`
                      relative aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-200 border
                      ${!inMonth ? "cursor-default" : "cursor-pointer hover:border-slate-200"}
                      ${bgClass} ${ringClass}
                    `}
                  >
                    <span className={`text-sm font-black ${textClass}`}>
                      {format(day, "d")}
                    </span>
                    
                    {holiday && !selected && (
                      <span className={`absolute bottom-1.5 w-1 h-1 rounded-full ${inMonth ? "bg-red-500" : "bg-red-200"}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="xl:col-span-5 space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="w-1 h-4 bg-yellow-500 rounded-full" />
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Agenda Bulan Ini</h3>
        </div>
        
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
          {monthHolidays.length > 0 ? (
            monthHolidays.map((item) => {
              const itemDate = new Date(item.date);
              const isSelected = selectedDate && isSameDay(itemDate, selectedDate);

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedDate(itemDate)}
                  className={`
                    w-full text-left flex items-center gap-3 p-3 rounded-xl border transition-all duration-200
                    ${isSelected 
                      ? "bg-white border-red-500 shadow-md translate-x-1" 
                      : "bg-white border-slate-100 hover:border-slate-200 shadow-sm"}
                  `}
                >
                  <div className={`shrink-0 flex flex-col items-center justify-center w-10 h-10 rounded-lg 
                    ${isSelected ? "bg-red-500 text-white" : "bg-red-50 text-red-500"}`}>
                    <span className="text-base font-black leading-none">
                      {format(itemDate, "d")}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-tighter">
                      {format(itemDate, "MMM", { locale: id })}
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <span className={`text-[13px] font-bold leading-tight line-clamp-1 ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                        {item.description}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      {format(itemDate, "EEEE", { locale: id })}
                    </span>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-12 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-slate-200">
              <CalendarDays size={32} className="text-slate-200 mb-2" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">Kosong</p>
            </div>
          )}
        </div>

        {(() => {
          const upcoming = holidays
            .filter(h => new Date(h.date) >= today)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 3);
          if (upcoming.length === 0) return null;
          return (
            <div className="p-5 bg-slate-900 rounded-2xl text-white shadow-xl">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Segera Datang</p>
              <div className="space-y-3">
                {upcoming.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between group cursor-pointer" 
                    onClick={() => {
                      setCurrentMonth(new Date(item.date));
                      setSelectedDate(new Date(item.date));
                    }}
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-red-400 transition-colors truncate pr-3">
                      {item.description}
                    </span>
                    <span className="shrink-0 text-[9px] font-black text-red-400 bg-red-400/10 px-2 py-1 rounded-lg border border-red-400/20">
                      {format(new Date(item.date), "d MMM")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}