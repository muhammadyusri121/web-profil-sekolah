"use client";

import React, { useState, useEffect, useMemo } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BookOpen, Clock, User, ChevronDown, Search } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Schedule {
  id: string;
  class_name: string;
  day_of_week: string;
  period: string;
  time: string;
  subject: string;
  teacher_name?: string | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

const DAY_COLORS: Record<string, string> = {
  Senin: "bg-blue-50 border-blue-200 text-blue-700",
  Selasa: "bg-purple-50 border-purple-200 text-purple-700",
  Rabu: "bg-emerald-50 border-emerald-200 text-emerald-700",
  Kamis: "bg-orange-50 border-orange-200 text-orange-700",
  Jumat: "bg-yellow-50 border-yellow-200 text-yellow-600",
};

const DAY_HEADER: Record<string, string> = {
  Senin: "bg-blue-600",
  Selasa: "bg-purple-600",
  Rabu: "bg-emerald-600",
  Kamis: "bg-orange-500",
  Jumat: "bg-yellow-400 text-slate-900",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScheduleCard({ item }: { item: Schedule }) {
  return (
    <div className={`rounded-2xl border p-3 ${DAY_COLORS[item.day_of_week] || "bg-slate-50 border-slate-200 text-slate-700"}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
          Jam {item.period}
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold opacity-60">
          <Clock size={9} /> {item.time}
        </span>
      </div>
      <p className="text-sm font-black leading-tight">{item.subject}</p>
      {item.teacher_name && (
        <div className="mt-2 flex items-center gap-1.5 opacity-60">
          <User size={10} />
          <p className="text-[10px] font-bold truncate">{item.teacher_name}</p>
        </div>
      )}
    </div>
  );
}

function EmptySlot() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 p-3 flex items-center justify-center min-h-[80px]">
      <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">–</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function JadwalSekolahPage() {
  const [classes, setClasses] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Ambil daftar kelas saat pertama load
  useEffect(() => {
    fetch("/api/schedule")
      .then((r) => r.json())
      .then((data: { class_name: string }[]) => {
        const list = data.map((d) => d.class_name).sort();
        setClasses(list);
        if (list.length > 0) setSelectedClass(list[0]);
      })
      .catch(console.error);
  }, []);

  // Ambil jadwal setiap kali kelas berubah
  useEffect(() => {
    if (!selectedClass) return;
    setLoading(true);
    fetch(`/api/schedule?class=${encodeURIComponent(selectedClass)}`)
      .then((r) => r.json())
      .then((data: Schedule[]) => setSchedules(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedClass]);

  // Kelompokkan jadwal per hari
  const scheduleByDay = useMemo(() => {
    const map: Record<string, Schedule[]> = {};
    DAYS.forEach((d) => { map[d] = []; });
    schedules.forEach((s) => {
      const day = s.day_of_week;
      if (!map[day]) map[day] = [];
      map[day].push(s);
    });
    // Urutkan per hari by period
    Object.keys(map).forEach((day) => {
      map[day].sort((a, b) => Number(a.period) - Number(b.period));
    });
    return map;
  }, [schedules]);

  // Jumlah jam terbanyak dalam satu hari (untuk tinggi kolom seragam)
  const maxPeriods = useMemo(
    () => Math.max(...DAYS.map((d) => scheduleByDay[d]?.length || 0), 1),
    [scheduleByDay]
  );

  // Filter kelas saat search
  const filteredClasses = useMemo(
    () => classes.filter((c) => c.toLowerCase().includes(search.toLowerCase())),
    [classes, search]
  );

  const totalSubjects = useMemo(
    () => new Set(schedules.map((s) => s.subject)).size,
    [schedules]
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />

      <main className="grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* ── Hero Banner ── */}
          <div className="relative rounded-[32px] bg-slate-900 overflow-hidden p-8 md:p-12 mb-10 shadow-xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400/10 blur-[100px] -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/10 blur-[80px] -ml-16 -mb-16" />
            <div className="relative z-10">
              <span className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.4em]">
                Sistem Informasi Akademik
              </span>
              <h1 className="mt-3 text-3xl md:text-5xl font-[1000] text-white uppercase tracking-tighter leading-none">
                Jadwal <span className="text-yellow-400">Pelajaran</span>
              </h1>
              <p className="mt-4 text-sm text-slate-400 max-w-xl leading-relaxed">
                Lihat jadwal pelajaran per kelas secara lengkap. Pilih kelas di bawah
                untuk menampilkan jadwal harian dari Senin hingga Jumat.
              </p>

              {/* Stats */}
              {selectedClass && !loading && (
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2">
                    <BookOpen size={14} className="text-yellow-400" />
                    <span className="text-xs font-black text-white">{schedules.length} Jam Pelajaran / Minggu</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2">
                    <BookOpen size={14} className="text-yellow-400" />
                    <span className="text-xs font-black text-white">{totalSubjects} Mata Pelajaran</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Pemilih Kelas ── */}
          <div className="mb-8 rounded-[24px] bg-white border border-slate-100 p-4 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">
                Pilih Kelas
              </h2>
              {/* Search kelas */}
              <div className="relative w-full sm:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari kelas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
            </div>

            {classes.length === 0 ? (
              <p className="text-xs text-slate-400 font-bold">Tidak ada data kelas tersedia.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {filteredClasses.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-200
                      ${selectedClass === cls
                        ? "bg-slate-900 text-yellow-400 shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Tabel Jadwal ── */}
          {selectedClass && (
            <div className="rounded-[24px] bg-white border border-slate-100 shadow-sm overflow-hidden">

              {/* Header tabel */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black uppercase tracking-tight text-slate-900">
                    Kelas <span className="text-yellow-500">{selectedClass}</span>
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">Tahun Ajaran 2025/2026</p>
                </div>
                {loading && (
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 animate-pulse">
                    Memuat...
                  </div>
                )}
              </div>

              {/* Grid hari */}
              {!loading && schedules.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-sm font-black uppercase text-slate-300">Belum ada jadwal untuk kelas ini</p>
                </div>
              ) : (
                <div className="p-4 md:p-6 overflow-x-auto">
                  <div className="grid grid-cols-5 gap-3 min-w-[700px]">
                    {/* Header hari */}
                    {DAYS.map((day) => (
                      <div
                        key={day}
                        className={`rounded-2xl px-4 py-3 text-center text-[11px] font-black uppercase tracking-widest text-white ${DAY_HEADER[day]}`}
                      >
                        {day}
                      </div>
                    ))}

                    {/* Isi jadwal per hari */}
                    {DAYS.map((day) => (
                      <div key={day} className="flex flex-col gap-2">
                        {loading
                          ? Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="rounded-2xl bg-slate-100 animate-pulse h-[80px]" />
                          ))
                          : scheduleByDay[day].length > 0
                            ? scheduleByDay[day].map((item) => (
                              <ScheduleCard key={item.id} item={item} />
                            ))
                            : <EmptySlot />
                        }
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}