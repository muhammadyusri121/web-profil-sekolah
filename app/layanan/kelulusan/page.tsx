"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Hash,
  User,
  School,
  Clock3,
  CalendarDays,
  Sparkles,
  Trophy,
  PartyPopper,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import confetti from "canvas-confetti";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

interface GraduationData {
  nisn: string;
  birthday: string;
  student_name: string;
  is_graduated: boolean;
  graduation_year: string;
  gender: string;
  class_name?: string;
}

export default function GraduationCheckPage() {
  const [data, setData] = useState<GraduationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [nisnInput, setNisnInput] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [result, setResult] = useState<GraduationData | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [pageInfo, setPageInfo] = useState<{ title: string; content: string }>({
    title: "Hasil Kelulusan",
    content: "Silakan masukkan NISN dan tanggal lahir Anda untuk mengecek status kelulusan."
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/graduation");
        const json = await res.json();
        setData(Array.isArray(json) ? json : []);

        const infoRes = await fetch("/api/post?slug=kelulusan");
        if (infoRes.ok) {
          const infoData = await infoRes.json();
          if (infoData && infoData.title) {
            setPageInfo({
              title: infoData.title,
              content: infoData.content || pageInfo.content
            });
          }
        }
      } catch (err) {
        console.error("Gagal load data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const birthdayInput = useMemo(() => {
    if (!selectedDate) return "";
    return format(selectedDate, "yyyy-MM-dd");
  }, [selectedDate]);

  const formattedDateLabel = useMemo(() => {
    if (!selectedDate) return "Pilih tanggal lahir";
    return format(selectedDate, "dd MMMM yyyy", { locale: id });
  }, [selectedDate]);

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nisnInput.trim() || !birthdayInput) return;

    const found = data.find(
      (item) =>
        String(item.nisn) === nisnInput.trim() &&
        String(item.birthday) === birthdayInput
    );

    setResult(found || null);
    setHasSearched(true);

    if (found && found.is_graduated) {
      fireConfetti();
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-50">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-purple-100/40 blur-[100px]" />
        <div className="absolute bottom-0 left-[20%] h-[600px] w-[600px] rounded-full bg-yellow-50/50 blur-[140px]" />
      </div>

      <Header />

      <main className="grow relative z-10 pt-28 pb-20 md:pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-1.5 text-xs font-bold text-yellow-700 shadow-sm">
              <Sparkles size={14} className="animate-pulse" />
              <span>PENGUMUMAN KELULUSAN</span>
            </div>
            <h1 className="text-4xl font-black uppercase text-slate-950 md:text-6xl">
              {pageInfo.title.split(' ').slice(0, -1).join(' ')} <span className="text-yellow-500">{pageInfo.title.split(' ').slice(-1)}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-500 md:text-xl">
              {pageInfo.content.replace(/<[^>]*>/g, '')}
            </p>
          </motion.div>

          {/* Search Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative mb-12 rounded-[32px] border border-white/60 bg-white/70 p-6 shadow-2xl shadow-blue-900/5 backdrop-blur-xl md:p-8"
          >
            <div className="absolute -top-4 -right-4 hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-yellow-400 opacity-20" />
                <div className="relative rounded-full bg-yellow-400 p-3 text-white shadow-lg">
                  <GraduationCap size={24} />
                </div>
              </div>
            </div>

            <form onSubmit={handleSearch} className="grid items-end gap-5 md:grid-cols-12">
              <div className="md:col-span-5">
                <label className="mb-3 block text-xs font-black uppercase tracking-widest text-slate-400">
                  Nomor Induk Siswa Nasional (NISN)
                </label>
                <div className="group flex h-16 items-center gap-4 rounded-2xl border-2 border-slate-100 bg-white px-5 transition-all focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-400/10">
                  <Hash size={20} className="text-slate-300 group-focus-within:text-blue-500" />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Contoh: 0012345678"
                    className="w-full bg-transparent text-lg font-bold text-slate-900 outline-none placeholder:text-slate-300"
                    value={nisnInput}
                    onChange={(e) => setNisnInput(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <label className="mb-3 block text-xs font-black uppercase tracking-widest text-slate-400">
                  Tanggal Lahir
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "group flex h-16 w-full items-center justify-between rounded-2xl border-2 px-5 text-left transition-all",
                        "border-slate-100 bg-white hover:border-yellow-300 hover:bg-yellow-50/10",
                        !selectedDate && "text-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <CalendarDays size={20} className="text-slate-300 group-hover:text-yellow-500" />
                        <span className="text-lg font-bold text-slate-900">
                          {formattedDateLabel}
                        </span>
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto rounded-3xl border-slate-100 p-0 shadow-2xl ring-1 ring-slate-950/5">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      locale={id}
                      captionLayout="dropdown"
                      fromYear={1990}
                      toYear={2030}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="md:col-span-3">
                <Button
                  type="submit"
                  size="lg"
                  className="h-16 w-full rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-950/20 transition-all active:scale-95 hover:bg-slate-800 hover:shadow-2xl"
                >
                  <Search size={22} className="mr-3" />
                  <span className="text-sm font-black uppercase tracking-widest">Periksa</span>
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Dynamic Results Display */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <div className="relative h-20 w-20">
                  <div className="absolute inset-0 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
                  <div className="absolute inset-2 animate-spin rounded-full border-4 border-slate-950 border-b-transparent [animation-direction:reverse]" />
                </div>
                <p className="mt-6 text-sm font-black uppercase tracking-widest text-slate-400">Sedang Memproses...</p>
              </motion.div>
            ) : hasSearched ? (
              result ? (
                <ResultCard key="result-found" result={result} />
              ) : (
                <motion.div
                  key="result-empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[32px] border-2 border-dashed border-slate-200 bg-white/50 px-8 py-20 text-center backdrop-blur-sm"
                >
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Info size={48} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">Data Tidak Ditemukan</h3>
                  <p className="mx-auto mt-4 max-w-sm text-lg font-medium text-slate-500">Mohon periksa kembali NISN dan tanggal lahir yang Anda masukkan.</p>
                </motion.div>
              )
            ) : (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-[40px] border-2 border-slate-100 bg-gradient-to-br from-white/80 to-slate-50/80 px-8 py-24 text-center backdrop-blur-sm"
              >
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[32px] bg-yellow-400 text-white shadow-2xl shadow-yellow-400/30">
                  <User size={48} strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 md:text-4xl">Siapkan Data Anda</h2>
                <p className="mx-auto mt-4 max-w-md text-lg font-medium text-slate-500 leading-relaxed">Gunakan NISN resmi dari kemendikbud dan pastikan tanggal lahir sesuai dengan Raprot.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ResultCard({ result }: { result: GraduationData }) {
  const isLulus = result.is_graduated;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="overflow-hidden rounded-[40px] border border-white/80 bg-white shadow-2xl shadow-slate-900/10"
    >
      <div className={cn(
        "relative p-8 md:p-12",
        isLulus 
          ? "bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white" 
          : "bg-linear-to-br from-slate-800 via-slate-900 to-black text-white"
      )}>
        {/* Decorative elements */}
        {isLulus && (
          <div className="absolute top-0 right-0 p-4">
             <Trophy size={140} className="text-white/10" strokeWidth={1} />
          </div>
        )}
        
        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <div className={cn(
              "flex h-24 w-24 items-center justify-center rounded-[32px] border-4 border-white/20 shadow-2xl backdrop-blur-md",
              isLulus ? "bg-white/20" : "bg-white/10 text-red-400"
            )}>
              {isLulus ? <CheckCircle2 size={56} strokeWidth={2.5} /> : <XCircle size={56} strokeWidth={2.5} />}
            </div>
            <div>
              <h2 className="mt-1 text-5xl font-black uppercase tracking-tight md:text-7xl">
                {isLulus ? "Selamat!" : "Maaf."}
              </h2>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-black uppercase tracking-widest backdrop-blur-xl">
                {isLulus ? <PartyPopper size={18} /> : null}
                <span>Anda {isLulus ? "LULUS" : "BELUM LULUS"}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border-2 border-white/10 bg-white/5 p-6 backdrop-blur-xl md:text-right">
             <p className="text-xs font-black uppercase tracking-widest text-white/40">Tahun Lulus</p>
             <p className="text-4xl font-black">{result.graduation_year}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-8 md:p-12">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
           <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Detail Siswa</p>
              <h3 className="mt-2 text-3xl font-black uppercase tracking-tight text-slate-900 md:text-4xl">{result.student_name}</h3>
           </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DetailBox label="NISN" value={result.nisn} icon={<Hash size={18} />} />
          <DetailBox label="Jenis Kelamin" value={result.gender === "L" ? "Laki-laki" : "Perempuan"} icon={<User size={18} />} />
          <DetailBox label="Tanggal Lahir" value={result.birthday} icon={<Clock3 size={18} />} />
          <DetailBox label="Sekolah" value="SMAN 1 Ketapang" icon={<School size={18} />} />
          <DetailBox label="Kelas" value={result.class_name || "-"} icon={<GraduationCap size={18} />} />
          <DetailBox 
            label="Keterangan" 
            value={isLulus ? "LULUS PENUH" : "SILAKAN HUBUNGI ADMIN"} 
            icon={<Info size={18} />} 
          />
        </div>
      </div>
    </motion.div>
  );
}

function DetailBox({ label, value, icon }: { label: string; value: string | undefined | null; icon: React.ReactNode }) {
  return (
    <div className="group rounded-[24px] border-2 border-white bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-500">
        {icon}
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-black text-slate-900 truncate">{value || "-"}</p>
    </div>
  );
}
