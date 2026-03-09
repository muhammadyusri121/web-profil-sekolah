import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Building2 } from "lucide-react";

export default function FasilitasPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="grow pt-32 pb-16 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-yellow-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-yellow-500 border border-yellow-100 shadow-sm">
                <Building2 size={40} />
            </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4">
            Sarana & <span className="text-yellow-500">Prasarana</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto mb-12">
            Halaman ini sedang dalam tahap pengembangan. Segera hadir informasi lengkap mengenai fasilitas pendukung pembelajaran di SMAN 1 Ketapang.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {["Ruang Kelas", "Laboratorium", "Perpustakaan"].map((item) => (
                <div key={item} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest">{item}</h3>
                    <div className="h-1 w-12 bg-yellow-400 rounded-full" />
                </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
