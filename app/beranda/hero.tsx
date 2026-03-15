"use client";

import React from "react";

const STATS = [
  { label: "Akreditasi", value: "Unggul" },
  { label: "Guru", value: "40+" },
  { label: "Kepuasan", value: "98%" },
  { label: "Siswa/i", value: "230+" },
];

const TRUST_POINTS = [
  "Kurikulum relevan",
  "Guru kompeten",
  "Komunikasi aktif",
  "Fasilitas lengkap",
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden min-h-screen bg-yellow-400 text-slate-900 font-sans selection:bg-slate-900 selection:text-yellow-400">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.3),transparent_35%)]" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Kolom kiri: Judul, deskripsi, dan statistik */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-[1000] leading-[1.1] tracking-tighter sm:text-5xl lg:text-7xl uppercase">
              SMA Negeri 1 Ketapang
            </h1>

            <p className="mt-5 mx-auto lg:mx-0 max-w-lg text-sm leading-relaxed text-slate-800/80 sm:text-base">
              Kami menghadirkan lingkungan belajar yang aman, disiplin, dan
              inspiratif dengan kurikulum berkualitas untuk mencetak generasi
              unggul di Madura.
            </p>

            {/* Kartu statistik */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/60 bg-white/40 p-3 shadow-sm backdrop-blur-md"
                >
                  <p className="text-xl font-black sm:text-2xl">{item.value}</p>
                  <p className="mt-0.5 text-[10px] uppercase font-bold tracking-wider text-slate-600 sm:text-xs">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom kanan: Kartu informasi */}
          <div className="relative">
            <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-white/30 blur-2xl hidden sm:block" />

            <div className="relative rounded-[2.5rem] border border-white/60 bg-white/50 p-3 sm:p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
              <div className="overflow-hidden rounded-[2rem] bg-slate-900 p-1">
                <div className="rounded-[1.8rem] bg-linear-to-br from-slate-50 to-yellow-50 p-4 sm:p-6">

                  {/* Kartu fitur utama */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500">
                        Fokus
                      </p>
                      <p className="mt-1.5 text-base font-black sm:text-lg">
                        Akademik + Karakter
                      </p>
                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        Pendekatan belajar seimbang untuk prestasi dan sikap positif.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-900 p-4 text-white shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
                        Lingkungan
                      </p>
                      <p className="mt-1.5 text-base font-black sm:text-lg">
                        Aman &amp; Nyaman
                      </p>
                      <p className="mt-2 text-xs leading-5 text-white/70">
                        Area belajar bersih dan mendukung tumbuh kembang optimal.
                      </p>
                    </div>
                  </div>

                  {/* Kartu kepercayaan & poin unggulan */}
                  <div className="mt-4 rounded-[2rem] bg-white p-4 sm:p-5 shadow-sm border border-slate-100">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Kepercayaan
                        </p>
                        <h2 className="mt-1 text-base font-black leading-snug sm:text-lg">
                          Informasi jelas, program terarah, dan hasil nyata.
                        </h2>
                      </div>
                      <span className="shrink-0 rounded-xl bg-yellow-400 px-3 py-1 text-[10px] font-black uppercase text-slate-900">
                        Terpercaya
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {TRUST_POINTS.map((point) => (
                        <div
                          key={point}
                          className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                        >
                          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                          <p className="text-[11px] font-bold text-slate-600">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}