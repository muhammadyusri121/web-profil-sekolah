"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  Monitor, 
  Home, 
  Dribbble, 
  Coffee, 
  Music, 
  Users, 
  HeartPulse 
} from "lucide-react";
import AdditionalInfo from "@/components/InfoDetail";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer"

const facilities = [
  {
    title: "Ruang Kelas Digital",
    description: "Kelas nyaman dilengkapi proyektor dan akses internet cepat.",
    icon: <Home className="w-6 h-6" />,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Laboratorium Komputer",
    description: "Unit komputer terbaru untuk praktik IT dan desain grafis.",
    icon: <Monitor className="w-6 h-6" />,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Perpustakaan",
    description: "Koleksi buku lengkap dengan area baca yang tenang dan sejuk.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "Lapangan Olahraga",
    description: "Fasilitas basket, voli, dan futsal untuk kegiatan outdoor.",
    icon: <Dribbble className="w-6 h-6" />,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Kantin Sehat",
    description: "Menyediakan makanan bergizi dengan standar kebersihan tinggi.",
    icon: <Coffee className="w-6 h-6" />,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Studio Seni",
    description: "Wadah kreativitas untuk musik, tari, dan seni rupa.",
    icon: <Music className="w-6 h-6" />,
    color: "bg-pink-50 text-pink-600",
  },
  {
    title: "Aula Serbaguna",
    description: "Ruang luas untuk pertemuan, seminar, dan acara sekolah.",
    icon: <Users className="w-6 h-6" />,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "UKS",
    description: "Layanan kesehatan pertama bagi siswa dan staf sekolah.",
    icon: <HeartPulse className="w-6 h-6" />,
    color: "bg-red-50 text-red-600",
  },
];

export default function FasilitasPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <section className="bg-white border-b border-slate-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-yellow-600 text-sm font-bold uppercase tracking-widest">
              Lingkungan Belajar
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Sarana & <span className="text-yellow-500">Prasarana</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-slate-500 leading-relaxed">
              Kami menyediakan fasilitas terbaik untuk mendukung kenyamanan belajar 
              serta pengembangan bakat akademik maupun non-akademik seluruh siswa.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group p-6 bg-white rounded-md border border-slate-100 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-md flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${item.color}`}>
                  {item.icon}
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <AdditionalInfo />
        </div>
      </section>

      <Footer />
    </div>
  );
}