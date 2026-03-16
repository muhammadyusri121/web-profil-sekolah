"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Clock, User, Search, X, ChevronDown, ChevronUp, CalendarDays } from "lucide-react";

interface Schedule {
  id: string;
  class_name: string;
  day_of_week: string;
  period: string;
  time: string;
  subject: string;
  teacher_name?: string | null;
}

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

const DAY_COLORS: Record<string, string> = {
  Senin: "bg-blue-50 border-blue-100 text-blue-700",
  Selasa: "bg-purple-50 border-purple-100 text-purple-700",
  Rabu: "bg-emerald-50 border-emerald-100 text-emerald-700",
  Kamis: "bg-orange-50 border-orange-100 text-orange-700",
  Jumat: "bg-sky-50 border-sky-100 text-sky-600",
};

const DAY_HEADER: Record<string, string> = {
  Senin: "bg-blue-600",
  Selasa: "bg-purple-600",
  Rabu: "bg-emerald-600",
  Kamis: "bg-orange-500",
  Jumat: "bg-sky-600",
};

function ScheduleCard({ item }: { item: Schedule }) {
  return (
    <div className={`rounded-xl border p-3 transition-all hover:shadow-sm ${DAY_COLORS[item.day_of_week] || "bg-slate-50 border-slate-200 text-slate-700"}`}>
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="text-[9px] font-black uppercase tracking-widest opacity-70">
          Jam {item.period}
        </span>
      </div>
      <p className="text-[13px] font-black leading-snug line-clamp-2">{item.subject}</p>
      {item.teacher_name && (
        <div className="mt-2 pt-2 border-t border-current/10 flex items-center gap-1.5 opacity-70">
          <User size={10} />
          <p className="text-[12px] font-bold truncate">{item.teacher_name}</p>
        </div>
      )}
    </div>
  );
}

function EmptySlot() {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 p-4 flex flex-col items-center justify-center min-h-[100px] bg-slate-50/30">
      <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Kosong</span>
    </div>
  );
}

export default function JadwalSekolahPage() {
  const [classes, setClasses] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string }>({
    title: "Jadwal Pelajaran",
    content: "Pantau seluruh agenda belajar-mengajar di lingkungan sekolah dengan mudah. Pilih kelas Anda untuk melihat rincian mata pelajaran harian secara real-time."
  });

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const LIMIT = isMobile ? 10 : 15;

  useEffect(() => {
    fetch("/api/schedule")
      .then((r) => r.json())
      .then((data: { class_name: string }[]) => {
        const list = Array.from(new Set(data.map((d) => d.class_name))).sort();
        setClasses(list);
        if (list.length > 0) setSelectedClass(list[0]);
      })
      .catch(console.error);

    // Fetch page info
    fetch("/api/post?slug=jadwal-sekolah")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.title) {
          setPageInfo({
            title: data.title,
            content: data.content || pageInfo.content
          });
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedClass) return;
    setLoading(true);
    fetch(`/api/schedule?class=${encodeURIComponent(selectedClass)}`)
      .then((r) => r.json())
      .then((data: Schedule[]) => setSchedules(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedClass]);

  const scheduleByDay = useMemo(() => {
    const map: Record<string, Schedule[]> = {};
    DAYS.forEach((d) => { map[d] = []; });
    schedules.forEach((s) => {
      if (map[s.day_of_week]) map[s.day_of_week].push(s);
    });
    Object.keys(map).forEach((day) => {
      map[day].sort((a, b) => Number(a.period) - Number(b.period));
    });
    return map;
  }, [schedules]);

  const filteredSuggestions = useMemo(() => {
    if (!search) return [];
    return classes.filter(c => c.toLowerCase().includes(search.toLowerCase())).slice(0, 5);
  }, [classes, search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayedClasses = showAll ? classes : classes.slice(0, LIMIT);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 uppercase tracking-tighter mt-2 leading-none">
              {pageInfo.title.split(' ')[0]} <span className="text-yellow-500">{pageInfo.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-500 font-medium leading-relaxed">
              {pageInfo.content.replace(/<[^>]*>/g, '')}
            </p>
          </div>

          <div className="mb-6 rounded-2xl bg-white border border-slate-200 p-5 shadow-sm relative z-20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-yellow-500" />
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-900">
                  Daftar Kelas
                </h2>
              </div>

              <div className="relative w-full sm:w-72" ref={searchRef}>
                <div className="relative">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari kelas Anda..."
                    value={search}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setShowSuggestions(true);
                    }}
                    className="w-full pl-10 pr-10 py-2.5 text-xs font-bold rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all"
                  />
                  {search && (
                    <button 
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      <X size={12} className="text-slate-500" />
                    </button>
                  )}
                </div>

                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
                    {filteredSuggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSelectedClass(s);
                          setSearch("");
                          setShowSuggestions(false);
                        }}
                        className="w-full px-4 py-3 text-left text-xs font-bold text-slate-700 hover:bg-yellow-50 hover:text-yellow-700 flex items-center justify-between border-b last:border-0 border-slate-50 transition-colors"
                      >
                        {s}
                        <span className="text-[8px] bg-slate-100 px-1.5 py-0.5 rounded uppercase">Pilih</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {displayedClasses.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 border
                    ${selectedClass === cls
                      ? "bg-slate-900 border-slate-900 text-yellow-400 shadow-lg shadow-slate-200 -translate-y-0.5"
                      : "bg-white border-slate-200 text-slate-500 hover:border-yellow-400 hover:text-yellow-600"
                    }`}
                >
                  {cls}
                </button>
              ))}

              {classes.length > LIMIT && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center gap-2 transition-all"
                >
                  {showAll ? (
                    <>Sembunyikan <ChevronUp size={14} /></>
                  ) : (
                    <>Lihat Semua ({classes.length - LIMIT}+) <ChevronDown size={14} /></>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky left-0">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black uppercase tracking-tight text-slate-900">
                    Jadwal Kelas <span className="text-yellow-500">{selectedClass || "-"}</span>
                  </h2>
                </div>
              </div>
              {loading && (
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-yellow-600 animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-current" /> Memuat...
                </div>
              )}
            </div>

            <div className="p-4 md:p-6 overflow-x-auto bg-white">
              <div className="grid grid-cols-5 gap-4 min-w-[1000px]">
                {DAYS.map((day) => (
                  <div key={day} className="flex flex-col gap-4">
                    <div className={`rounded-xl px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-sm ${DAY_HEADER[day]}`}>
                      {day}
                    </div>

                    <div className="flex flex-col gap-3">
                      {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="rounded-xl bg-slate-50 border border-slate-100 animate-pulse h-[85px]" />
                        ))
                      ) : scheduleByDay[day].length > 0 ? (
                        scheduleByDay[day].map((item) => (
                          <ScheduleCard key={item.id} item={item} />
                        ))
                      ) : (
                        <EmptySlot />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}