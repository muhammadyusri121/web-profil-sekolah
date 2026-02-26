"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { X, Menu as Burger, ChevronDown, ChevronRight } from "lucide-react";
import { navigationData } from "@/data/data_header";
import { cn } from "@/lib/utils";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
      setIsHidden(true);
      setActiveMenu(null);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
  }, [isMobileOpen]);

  return (
    <>
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 inset-x-0 z-50 bg-[#F3C623] h-14 flex items-center shadow-sm"
      >
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3 shrink-0 active:scale-95 transition-transform">
            <div className="relative w-10 h-10">
              <Image src="/login-logo.png" alt="Logo" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-base font-black uppercase text-slate-900 leading-none">
                SMAN 1 KETAPANG
              </span>
              <span className="text-[10px] font-bold text-slate-800/70 tracking-widest uppercase mt-1">
                Sampang Madura
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationData.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => item.children && setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
                className="relative"
              >
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        "px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-1 rounded-lg",
                        activeMenu === item.label
                          ? "bg-yellow-300 text-slate-900"
                          : "text-slate-800 hover:bg-yellow-100"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={15}
                        className={cn(
                          "transition-transform duration-300",
                          activeMenu === item.label && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {activeMenu === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-0 top-full pt-2 z-40"
                        >
                          <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 min-w-[220px]">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="block p-3 rounded-lg text-sm font-bold text-slate-700 hover:bg-yellow-100 hover:text-yellow-500 transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-slate-800 hover:bg-yellow-300 rounded-lg transition-all"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <Link href="/ppdb" className="hidden lg:block">
              <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all active:scale-95">
                PPDB 2026
              </button>
            </Link>

            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-slate-900 hover:bg-black/5 rounded-lg transition"
            >
              <Burger size={26} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="absolute inset-0 bg-white/50 backdrop-blur-lg"
            />

            {/* Side Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-[80%] max-w-xs bg-white h-full shadow-2xl flex flex-col"
            >
              {/* MOBILE HEADER */}
              <div className="h-15 px-5 bg-[#F3C623] rounded-b-2xl flex items-center justify-between shrink-0 ">
                <div className="flex items-center gap-2 ">
                  <Image src="/login-logo.png" alt="Logo" width={32} height={32} />
                  <span className="text-sm font-black uppercase text-slate-900 tracking-tight">
                    Menu
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-black/10 rounded-full transition-colors"
                >
                  <X size={22} className="text-slate-900" />
                </button>
              </div>

              {/* MOBILE NAV LIST */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {navigationData.map((item) => (
                  <div key={item.label} className="py-1">
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="text-[15px] flex justify-between items-center p-2 rounded-xl hover:bg-yellow-100 font-bold text-slate-900 transition-colors"
                      >
                        {item.label}
                        <ChevronRight size={18} className="text-slate-900" />
                      </Link>
                    ) : (
                      <div className="mt-2">
                        <div className="text-[15px] font-black text-slate-900 px-2 mb-2">
                          {item.label}
                        </div>
                        <div className="space-y-1">
                          {item.children?.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setIsMobileOpen(false)}
                              className="flex justify-between items-center p-2 rounded-xl hover:bg-yellow-100 text-sm font-semibold text-slate-700 transition-colors"
                            >
                              {child.label}
                              <ChevronRight size={16} className="text-slate-900" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* BOTTOM ACTION */}
              <div className="p-5 border-t border-slate-900 rounded-2xl">
                <Link href="/ppdb" onClick={() => setIsMobileOpen(false)}>
                  <button className="w-full bg-[#F3C623] hover:bg-[#E2B612] text-slate-900 font-bold py-4 rounded-xl text-sm shadow-sm transition-transform active:scale-95">
                    DAFTAR PPDB 2026
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}