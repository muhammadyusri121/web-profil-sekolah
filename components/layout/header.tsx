"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  X,
  Menu as Burger,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { navigationData, NavChild } from "@/data/data_header";
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

  const RenderLink = ({
    child,
    className,
    onClick,
  }: {
    child: NavChild;
    className: string;
    onClick?: () => void;
  }) => {
    if (child.isExternal) {
      return (
        <a
          href={child.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(className, "flex items-center justify-between")}
        >
          {child.label}
          <ExternalLink size={14} className="opacity-50" />
        </a>
      );
    }
    return (
      <Link href={child.href} onClick={onClick} className={className}>
        {child.label}
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 inset-x-0 z-50 h-20 flex items-center bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm"
      >
        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-11 h-11">
              <Image
                src="/login-logo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                SMAN 1 Ketapang
              </span>
              <span className="text-xs text-slate-500">
                Sampang Madura
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navigationData.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() =>
                  item.children && setActiveMenu(item.label)
                }
                onMouseLeave={() => setActiveMenu(null)}
                className="relative"
              >
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        "px-4 py-2 text-sm font-semibold text-slate-700 rounded-xl transition hover:bg-slate-100 flex items-center gap-1.5",
                        activeMenu === item.label &&
                          "bg-slate-100 text-slate-900"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform duration-200",
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
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full pt-3 z-50 min-w-[260px]"
                        >
                          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5">
                            <div className="space-y-1">
                              {item.children.map((child) => (
                                <RenderLink
                                  key={child.label}
                                  child={child}
                                  className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 rounded-xl hover:bg-slate-100 transition"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Action */}
          <div className="flex items-center gap-4">
            <Link href="/ppdb" className="hidden lg:block">
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-6 py-3 rounded-xl text-sm font-semibold hover:scale-105 transition-all shadow-md active:scale-95">
                PPDB 2026
              </button>
            </Link>

            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2.5 bg-slate-100 rounded-xl text-slate-800"
            >
              <Burger size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end mb-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-[85%] max-w-sm bg-white h-full flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900">
                  Menu Navigasi
                </span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {navigationData.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <div className="space-y-2">
                        <h3 className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          {item.label}
                        </h3>
                        <div className="bg-slate-50 rounded-2xl p-2 space-y-1">
                          {item.children.map((child) => (
                            <RenderLink
                              key={child.label}
                              child={child}
                              onClick={() => setIsMobileOpen(false)}
                              className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-white transition"
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href || "/"}
                        onClick={() => setIsMobileOpen(false)}
                        className="block px-4 py-3 bg-slate-50 rounded-2xl text-sm font-semibold text-slate-900"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-slate-200">
                <Link href="/ppdb" onClick={() => setIsMobileOpen(false)}>
                  <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 py-3 rounded-xl font-semibold text-slate-900 hover:scale-105 transition active:scale-95">
                    Daftar PPDB 2026
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