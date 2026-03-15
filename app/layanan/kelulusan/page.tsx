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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { id } from "date-fns/locale";

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

export default function GraduationCheckPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nisnInput, setNisnInput] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [result, setResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/graduation");
        const json = await res.json();
        setData(Array.isArray(json) ? json : []);
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
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gray-100">
      <Header />

      <main className="grow pt-20 pb-5 md:pt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-black uppercase text-slate-950 md:text-5xl">
              Hasil <span className="text-[#F3C623]">Kelulusan</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-8 rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.15)] backdrop-blur"
          >
            <form onSubmit={handleSearch} className="grid gap-3 md:grid-cols-12">
              <div className="md:col-span-5">
                <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.24em] text-slate-900">
                  NISN
                </label>
                <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-yellow-400 focus-within:bg-white focus-within:shadow-sm">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Masukkan NISN anda"
                    className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                    value={nisnInput}
                    onChange={(e) => setNisnInput(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.24em] text-slate-900">
                  Tanggal Lahir
                </label>

                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "flex h-14 w-full items-center justify-between rounded-2xl border px-4 text-left transition-all",
                        "border-slate-200 bg-slate-50 hover:bg-white hover:border-yellow-300",
                        !selectedDate && "text-slate-400"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <CalendarDays size={18} className="text-slate-400" />
                        <span className="text-sm font-bold capitalize text-slate-900">
                          {formattedDateLabel}
                        </span>
                      </div>
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="start"
                    className="w-auto rounded-2xl border-slate-200 p-0 shadow-xl"
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      locale={id}
                      captionLayout="dropdown"
                      fromYear={1990}
                      toYear={2015}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="md:col-span-3">
                <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.24em] text-transparent">
                  Cari
                </label>
                <Button
                  type="submit"
                  className="h-14 w-full rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  <Search size={18} className="mr-2" />
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.22em]">
                    Cari Data
                  </span>
                </Button>
              </div>
            </form>
          </motion.div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-20"
              >
                <div className="h-10 w-10 rounded-full border-[3px] border-yellow-400 border-t-transparent animate-spin" />
              </motion.div>
            ) : hasSearched ? (
              result ? (
                <motion.div
                  key="result-found"
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-[0_24px_80px_-28px_rgba(15,23,42,0.28)]"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden px-6 py-6 text-white",
                      result.is_graduated
                        ? "bg-linear-to-r from-emerald-500 to-emerald-600"
                        : "bg-linear-to-r from-red-500 to-rose-600"
                    )}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/30" />
                      <div className="absolute bottom-0 left-10 h-20 w-20 rounded-full bg-white/20" />
                    </div>

                    <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                          {result.is_graduated ? (
                            <CheckCircle2 size={34} />
                          ) : (
                            <XCircle size={34} />
                          )}
                        </div>
                        <div>
                          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/80">
                            Status Kelulusan
                          </p>
                          <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
                            {result.is_graduated ? "Lulus" : "Tidak Lulus"}
                          </h2>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/80">
                          Tahun Ajaran
                        </p>
                        <p className="text-lg font-black">
                          {result.graduation_year}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 md:p-7">
                    <div className="mb-6 rounded-[24px] border border-slate-200 bg-slate-50/70 p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-500">
                            Siswa Bersangkutan Atas Nama
                          </p>
                          <h3 className="text-xl font-black uppercase tracking-tight text-slate-950 md:text-2xl">
                            {result.student_name}
                          </h3>
                        </div>

                        <div
                          className={cn(
                            "inline-flex w-fit items-center rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em]",
                            result.is_graduated
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-red-50 text-red-700 border border-red-100"
                          )}
                        >
                          {result.is_graduated ? "Status: Lulus" : "Status: Tidak Lulus"}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <DataRow
                        icon={<Hash size={16} className="text-slate-500" />}
                        label="NISN"
                        value={result.nisn}
                      />
                      <DataRow
                        icon={<User size={16} className="text-slate-500" />}
                        label="Gender"
                        value={
                          result.gender === "L" ? "Laki-laki" : "Perempuan"
                        }
                      />
                      <DataRow
                        icon={<Clock3 size={16} className="text-slate-500" />}
                        label="Tanggal Lahir"
                        value={result.birthday}
                      />
                      <DataRow
                        icon={<School size={16} className="text-slate-500" />}
                        label="Kelas"
                        value={result.class_name || "-"}
                      />
                      <DataRow
                        icon={
                          <GraduationCap
                            size={16}
                            className="text-slate-500"
                          />
                        }
                        label="Hasil"
                        value={result.is_graduated ? "LULUS" : "TIDAK LULUS"}
                        className="md:col-span-2"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result-empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-[30px] border border-dashed border-slate-200 bg-white px-6 py-14 text-center shadow-sm"
                >
                  <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                    Data Tidak Ditemukan
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                    Masukkan NISN dan tanggal lahir yang Anda yang sesuai
                  </p>
                </motion.div>
              )
            ) : (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-[30px] border border-dashed border-slate-200 bg-white/80 px-6 py-14 text-center backdrop-blur"
              >
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                  Siapkan Data Diri Anda
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function DataRow({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: any;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-sm",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500">
            {label}
          </p>
          <p className="truncate text-sm font-black uppercase tracking-tight text-slate-900">
            {value || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}