import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Construction } from "lucide-react";

export default function PlaceholderPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="grow pt-32 pb-16 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center py-20">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Construction size={32} />
            </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">
            Halaman Sedang <span className="text-yellow-500">Dipersiapkan</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Konten untuk halaman ini akan segera hadir. Terima kasih atas kesabaran Anda.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
