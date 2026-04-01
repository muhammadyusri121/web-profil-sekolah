"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { X, Menu as Burger, ChevronDown, ChevronRight, LayoutGrid } from "lucide-react";
import { navigationData, NavItem } from "@/lib/data/data_header";
import { cn } from "@/lib/utils";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 50) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileOpen]);

  const handleMouseEnter = React.useCallback((menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  return (
    <>
      <motion.div
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 inset-x-0 z-50 bg-yellow-300 border-b border-yellow-200 shadow-sm"
      >
      <header className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between transition-all">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-base md:text-lg font-black tracking-wider text-black uppercase"
          >
              <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0">
                <Image
                  src="/login-logo.png"
                  alt="Logo SMAN 1 Ketapang"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col leading-tight">
                <span>
                  SMAN 1 <span className="text-black">Ketapang</span>
                </span>
                <span className="text-xs md:text-sm tracking-[0.3em]">
                  Sampang
                </span>
              </div>
            </Link>
          </div>

        <nav className="hidden md:flex flex-1 justify-center gap-1 lg:gap-2 h-full">
          {navigationData.map((item: NavItem) => (
            <div
              key={item.label}
              onMouseEnter={() => item.children && handleMouseEnter(item.label)}
              onMouseLeave={() => item.children && handleMouseLeave()}
              className="relative h-full flex items-center px-2.5"
            >
              {item.children ? (
                <button
                  className={cn(
                    "text-[15px] md:text-base font-bold tracking-normal transition-colors flex items-center gap-1",
                    activeMenu === item.label ? "text-black scale-105" : "text-black"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform duration-200",
                      activeMenu === item.label && "rotate-180"
                    )}
                  />
                </button>
              ) : (
                <Link
                  href={item.href || "/"}
                  className="text-[15px] md:text-base font-bold tracking-normal text-black hover:scale-105 transition-all"
                >
                  {item.label}
                </Link>
              )}

              <AnimatePresence>
                {item.children && activeMenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50"
                  >
                    <div className="bg-white border border-yellow-400 rounded-2xl shadow-xl p-2 min-w-[220px]">
                      {item.label === "Akademik" ? (
                        <div className="flex gap-2">
                          <div className="flex flex-col min-w-[180px]">
                            <span className="text-[10px] font-black uppercase text-slate-500 px-3 py-1.5 mb-1 border-b border-yellow-100">
                              Kurikulum
                            </span>
                            {item.children
                              .filter((child) => child.group === "Kurikulum")
                              .map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="px-3 py-2 text-[13px] font-semibold text-black rounded-xl hover:bg-yellow-50 transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                          </div>
                          <div className="flex flex-col min-w-[180px] border-l border-yellow-100 pl-2">
                            <span className="text-[10px] font-black uppercase text-slate-500 px-3 py-1.5 mb-1 border-b border-yellow-100">
                              Asesmen
                            </span>
                            {item.children
                              .filter((child) => child.group === "Asesmen")
                              .map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="px-3 py-2 text-[13px] font-semibold text-black rounded-xl hover:bg-yellow-50 transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              target={child.isExternal ? "_blank" : "_self"}
                              className="px-4 py-2.5 text-[13px] font-semibold text-black rounded-xl hover:bg-yellow-50 transition-colors flex items-center justify-between group"
                            >
                              {child.label}
                              {child.isExternal && (
                                <ChevronRight size={13} className="text-slate-400" />
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/layanan"
              className="hidden md:flex px-5 py-2.5 text-[13px] font-bold text-white rounded-full bg-black hover:bg-neutral-800 transition-all items-center gap-2 shadow-lg"
            >
              LAYANAN KAMI
            </Link>

            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2.5 text-black bg-yellow-400 rounded-xl active:scale-95 transition-transform shadow-sm"
              aria-label="Buka Menu"
            >
              <Burger size={22} />
            </button>
          </div>
        </header>
      </motion.div>





      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-100 bg-white flex flex-col"
          >
            <div className="h-16 flex justify-between items-center px-6 border-b border-yellow-100 bg-yellow-300 shrink-0">
              <span className="font-black tracking-widest text-black text-sm uppercase">Menu Navigasi</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 bg-black text-yellow-300 rounded-full active:scale-90 transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-32">
              {navigationData.map((item) => (
                <div key={item.label} className="space-y-2">
                  {item.children ? (
                    <>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-yellow-100 pb-1 px-2">
                        {item.label}
                      </h3>
                      <div className="grid grid-cols-1 gap-1.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            target={child.isExternal ? "_blank" : "_self"}
                            onClick={() => setIsMobileOpen(false)}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-yellow-50/30 border border-yellow-100/30 text-[15px] font-semibold text-black active:bg-yellow-100 transition-colors"
                          >
                            <span>{child.label}</span>
                            <ChevronRight size={15} className="text-yellow-600" />
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href || "/"}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-yellow-50 text-[15px] font-bold text-black active:bg-yellow-100 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={18} className="text-black opacity-30" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 bg-linear-to-t from-white via-white to-transparent">
              <Link
                href="/layanan"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-4 bg-black text-white rounded-2xl font-black tracking-widest text-[13px] shadow-2xl active:scale-[0.98] transition-all"
              >
                LAYANAN KAMI
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}