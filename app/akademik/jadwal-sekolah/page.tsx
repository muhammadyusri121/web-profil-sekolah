"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { User, Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedHeading } from "@/components/ui/animated-heading";

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
    <div className={`rounded-xl border p-2.5 transition-all hover:shadow-sm ${DAY_COLORS[item.day_of_week] || "bg-slate-50 border-slate-200 text-slate-700"}`}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-[8px] font-black uppercase tracking-widest opacity-60">
          Jam {item.period}
        </span>
      </div>
      <p className="text-[12px] font-black leading-tight line-clamp-2 uppercase tracking-tight">{item.subject}</p>
      {item.teacher_name && (
        <div className="mt-2 pt-1.5 border-t border-current/10 flex items-center gap-1.5 opacity-70">
          <User size={10} />
          <p className="text-[10px] font-bold truncate">{item.teacher_name}</p>
        </div>
      )}
    </div>
  );
}

function EmptySlot() {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 p-4 flex flex-col items-center justify-center min-h-[80px] bg-slate-50/30">
      <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">Kosong</span>
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

  const LIMIT = isMobile ? 8 : 15;

  useEffect(() => {
    fetch("/api/schedule")
      .then((r) => r.json())
      .then((data: { class_name: string }[]) => {
        const list = Array.from(new Set(data.map((d) => d.class_name))).sort();
        setClasses(list);
        if (list.length > 0) setSelectedClass(list[0]);
      })
      .catch(console.error);

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
  const titleParts = pageInfo.title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="grow pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <AnimatedHeading className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                {firstWord} <span className="text-yellow-500">{restOfTitle}</span>
              </AnimatedHeading>
              <p className="mt-6 text-sm md:text-base text-slate-500 font-medium leading-relaxed text-justify md:text-center hyphens-auto">
                {pageInfo.content.replace(/<[^>]*>/g, '')}
              </p>
            </div>
          </div>

          <div className="mb-6 rounded-xl bg-white border border-slate-200 p-4 shadow-sm relative z-20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Pilih Kelas
              </h2>

              <div className="relative w-full sm:w-64" ref={searchRef}>
                <div className="relative">
                  <Search size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari kelas..."
                    value={search}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-[11px] font-bold rounded-lg border border-slate-200 bg-slate-50 outline-none focus:border-yellow-400 transition-all"
                  />
                  {search && (
                    <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                      <X size={10} className="text-slate-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {displayedClasses.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all border
                    ${selectedClass === cls
                      ? "bg-slate-900 border-slate-900 text-yellow-400 shadow-md"
                      : "bg-white border-slate-200 text-slate-500 hover:border-yellow-400 hover:text-yellow-600"
                    }`}
                >
                  {cls}
                </button>
              ))}

              {classes.length > LIMIT && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center gap-1.5 transition-all"
                >
                  {showAll ? "Tutup" : `Semua (${classes.length})`}
                  {showAll ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden min-h-[300px]">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <h2 className="text-xs font-black uppercase tracking-[0.1em] text-slate-900">
                Jadwal Kelas <span className="text-yellow-500">{selectedClass || "-"}</span>
              </h2>
              {loading && (
                <div className="text-[9px] font-black uppercase text-yellow-600 animate-pulse">
                  Memuat...
                </div>
              )}
            </div>

            <div className="p-4 md:p-5 overflow-x-auto bg-white">
              <div className="grid grid-cols-5 gap-3 min-w-[900px]">
                {DAYS.map((day) => (
                  <div key={day} className="flex flex-col gap-3">
                    <div className={`rounded-lg px-3 py-2 text-center text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-sm ${DAY_HEADER[day]}`}>
                      {day}
                    </div>

                    <div className="flex flex-col gap-2">
                      {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="rounded-xl bg-slate-50 border border-slate-100 animate-pulse h-16" />
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