"use client";

import React, { useState, useMemo, useCallback } from "react";
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
  createdAt?: string;
  updatedAt?: string;
}

const THEME = {
  event: { bg: "bg-red-600", text: "text-red-600", light: "bg-red-50", border: "border-red-600" },
  regular: { bg: "bg-[#F3C623]", text: "text-[#F3C623]", light: "bg-yellow-50", border: "border-[#F3C623]" }
};

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function CalendarContent({ initialHolidays }: { initialHolidays: Holiday[] }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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

  const prevMonth = () => setCurrentMonth((m) => subMonths(m, 1));
  const nextMonth = () => setCurrentMonth((m) => addMonths(m, 1));

  const monthLabel = format(currentMonth, "MMMM yyyy", { locale: id });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      <div className="xl:col-span-7 space-y-6">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">

          <div className="flex items-center justify-between px-3 py-3 border-b border-slate-50">
            <button onClick={prevMonth} className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
              <ChevronLeft size={22} className="text-slate-600" />
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-[1000] text-slate-900 uppercase tracking-tighter">
                {format(currentMonth, "MMMM", { locale: id })}
              </h2>
              <p className="text-3xl font-black text-slate-900 tracking-[0.3em] uppercase">
                {format(currentMonth, "yyyy")}
              </p>
            </div>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-2xl transition-all">
              <ChevronRight size={22} className="text-slate-900" />
            </button>
          </div>

          <div className="bg-slate-100 p-3">
            <div className="grid grid-cols-7 mb-4">
              {DAY_NAMES.map((d, i) => (
                <div key={d} className={`text-center text-[12px] font-black uppercase tracking-wider ${i === 0 ? "text-red-500" : "text-slate-900"}`}>
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5 md:gap-2">
              {calendarDays.map((day, idx) => {
                const inMonth = isSameMonth(day, currentMonth);
                const holiday = getHolidayForDate(day);
                const isSunday = getDay(day) === 0;
                const isSpecial = holiday || isSunday;
                const color = isSpecial ? THEME.event : THEME.regular;
                const selected = selectedDate && isSameDay(day, selectedDate);
                const todayFlag = isToday(day);

                return (
                  <button
                    key={idx}
                    onClick={() => inMonth && setSelectedDate(day)}
                    disabled={!inMonth}
                    className={`
                      relative aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-300
                      ${!inMonth ? "opacity-5 cursor-default bg-transparent" : "cursor-pointer"}
                      ${selected 
                        ? `${color.bg} text-white shadow-lg shadow-${isSpecial ? 'red' : 'yellow'}-200/50 scale-[1.05] z-10` 
                        : "bg-white border border-slate-100 shadow-sm hover:border-slate-300 hover:shadow-md"}
                      ${!selected && todayFlag ? "ring-2 ring-black ring-inset z-10" : ""}
                    `}
                  >
                    <span className={`
                      text-sm md:text-base font-black tracking-tighter
                      ${selected ? "text-white" : (isSpecial ? "text-red-500" : "text-slate-900")}
                    `}>
                      {format(day, "d")}
                    </span>

                    {holiday && !selected && (
                      <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    )}
                    {holiday && selected && (
                      <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-white/60" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="xl:col-span-5 space-y-6">

        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 scrollbar-hide">
          {monthHolidays.length > 0 ? (
            monthHolidays.map((item) => {
              const isSelected = selectedDate && isSameDay(new Date(item.date), selectedDate);

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    const d = new Date(item.date);
                    setCurrentMonth(d);
                    setSelectedDate(d);
                  }}
                  className={`
                    w-full text-left flex items-center gap-5 p-5 rounded-[30px] border-2 transition-all duration-500
                    ${isSelected 
                      ? "bg-white border-red-300" 
                      : "bg-white border-slate-100"}
                  `}
                >
                  <div className={`shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-2xl ${isSelected ? "bg-red-600" : "bg-slate-100"}`}>
                    <span className={`text-xl font-black leading-none ${isSelected ? "text-white" : "text-slate-900"}`}>
                      {format(new Date(item.date), "d")}
                    </span>
                    <span className={`text-[9px] font-black uppercase mt-0.5 ${isSelected ? "text-white" : "text-slate-900"}`}>
                      {format(new Date(item.date), "MMM", { locale: id })}
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className={`text-sm font-black uppercase tracking-tight leading-tight truncate ${isSelected ? "text-red-600" : "text-slate-900"}`}>
                      {item.description}
                    </span>
                    <span className="text-[10px] text-slate-900 font-bold capitalize mt-1.5 flex items-center gap-1.5">
                      <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-red-900' : 'bg-slate-900'}`} />
                      {format(new Date(item.date), "EEEE", { locale: id })}
                    </span>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-20 flex flex-col items-center justify-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
              <CalendarDays size={40} className="text-slate-900 mb-4" />
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Tidak ada Agenda</p>
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
            <div className="p-6 bg-slate-200 rounded-2xl border border-slate-100">
              <p className="text-[12px] font-black text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
                Acara Akan Datang - 
              </p>
              <div className="space-y-4">
                {upcoming.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      const d = new Date(item.date);
                      setCurrentMonth(d);
                      setSelectedDate(d);
                    }}
                    className="w-full flex items-center justify-between group"
                  >
                    <span className="text-xs font-black text-slate-600 truncate group-hover:text-red-600 transition-colors uppercase tracking-tight">
                      {item.description}
                    </span>
                    <span className="shrink-0 ml-4 px-2 py-1 bg-white rounded-lg text-[9px] font-black text-slate-900 border border-slate-100 group-hover:border-red-100 group-hover:text-red-500 transition-all">
                      {format(new Date(item.date), "d MMM")}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}