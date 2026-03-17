"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SchoolHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#020617] overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-72 h-72 bg-yellow-400 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl bottom-10 right-10"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Selamat Datang di
            <span className="block text-yellow-400 mt-2">
              Sekolah Masa Depan
            </span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg max-w-xl mx-auto lg:mx-0">
            Tempat terbaik untuk membangun karakter, ilmu, dan masa depan gemilang. Kami menghadirkan pendidikan modern dengan teknologi dan nilai-nilai terbaik.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg"
            >
              Daftar Sekarang
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-white text-white rounded-xl"
            >
              Lihat Profil
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl"></div>

            <Image
              src="/login-logo.png"
              alt="School Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-white text-sm"
        >
          Scroll ke bawah ↓
        </motion.div>
      </div>
    </section>
  );
}