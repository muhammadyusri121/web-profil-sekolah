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
  const [selectedDate, setSelectedDate] = useState<Date | null>(today); // Default pilih hari ini
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
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-none">
                {format(currentMonth, "MMMM", { locale: id })}
              </h2>
              <span className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
                Tahun {format(currentMonth, "yyyy")}
              </span>
            </div>
            
            <div className="flex gap-1 ml-2">
              <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-slate-50 rounded-md border border-slate-100 transition-colors">
                <ChevronLeft size={18} className="text-slate-600" />
              </button>
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-slate-50 rounded-md border border-slate-100 transition-colors">
                <ChevronRight size={18} className="text-slate-600" />
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="grid grid-cols-7 mb-4">
              {DAY_NAMES.map((d, i) => (
                <div key={d} className={`text-center text-[10px] font-bold uppercase tracking-widest ${i === 0 ? "text-red-500" : "text-slate-400"}`}>
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {calendarDays.map((day, idx) => {
                const inMonth = isSameMonth(day, currentMonth);
                const holiday = getHolidayForDate(day);
                const isSunday = getDay(day) === 0;
                const isSpecial = holiday || isSunday;
                const selected = selectedDate && isSameDay(day, selectedDate);
                const todayFlag = isToday(day);

                let bgClass = "bg-white border-transparent hover:bg-slate-50";
                let textClass = isSpecial ? "text-red-500" : "text-slate-700";
                let borderClass = "border-transparent";

                if (!selected && todayFlag) {
                   borderClass = "border-slate-900 ring-1 ring-slate-900";
                }

                if (selected) {
                  if (isSpecial) {
                    bgClass = "bg-red-500 text-white shadow-md shadow-red-100";
                    textClass = "text-white";
                  } else {
                    bgClass = "bg-yellow-400 text-white shadow-md shadow-yellow-100";
                    textClass = "text-white";
                  }
                  borderClass = "border-transparent";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => inMonth && setSelectedDate(day)}
                    disabled={!inMonth}
                    className={`
                      relative aspect-square flex flex-col items-center justify-center rounded-md transition-all duration-200 border
                      ${!inMonth ? "opacity-10 cursor-default" : "cursor-pointer"}
                      ${bgClass}
                      ${borderClass}
                    `}
                  >
                    <span className={`text-sm font-bold ${textClass}`}>
                      {format(day, "d")}
                    </span>
                    
                    {/* Dot Penanda Holiday */}
                    {holiday && !selected && (
                      <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-red-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="xl:col-span-5 space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Agenda Bulan Ini</h3>
        </div>
        
        <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
          {monthHolidays.length > 0 ? (
            monthHolidays.map((item) => {
              const itemDate = new Date(item.date);
              const isSelected = selectedDate && isSameDay(itemDate, selectedDate);

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedDate(itemDate)}
                  className={`
                    w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all
                    ${isSelected 
                      ? "bg-white border-red-400 shadow-sm" 
                      : "bg-white border-slate-100 hover:border-slate-200"}
                  `}
                >
                  <div className={`shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-lg 
                    ${isSelected ? "bg-red-500 text-white" : "bg-red-50 text-red-500"}`}>
                    <span className="text-lg font-bold leading-none">
                      {format(itemDate, "d")}
                    </span>
                    <span className="text-[9px] font-bold uppercase mt-1">
                      {format(itemDate, "MMM", { locale: id })}
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className={`text-sm font-bold leading-tight ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                        {item.description}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium mt-1">
                      {format(itemDate, "EEEE", { locale: id })}
                    </span>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-16 flex flex-col items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <CalendarDays size={32} className="text-slate-300 mb-3" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tidak ada agenda</p>
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
            <div className="p-5 bg-slate-900 rounded-xl text-white shadow-lg shadow-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Segera Datang</p>
              <div className="space-y-3">
                {upcoming.map((item) => (
                  <div key={item.id} className="flex items-center justify-between group cursor-pointer" onClick={() => {
                    setCurrentMonth(new Date(item.date));
                    setSelectedDate(new Date(item.date));
                  }}>
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-red-400 transition-colors truncate pr-4">
                      {item.description}
                    </span>
                    <span className="shrink-0 text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded">
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