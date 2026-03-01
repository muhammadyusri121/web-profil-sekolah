"use client";

import { useState, useEffect } from "react";
import {
  Link as LinkIcon,
  Check,
  Share2,
  Facebook,
  Twitter,
  MessageCircle,
  Send,
  Printer,
  Mail
} from "lucide-react";

interface ShareArticleProps {
  title: string;
  url?: string;
}

export default function ShareArticle({ title, url }: ShareArticleProps) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCurrentUrl(url || window.location.href);
    if (navigator.share) {
      setCanNativeShare(true);
    }
  }, [url]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin link:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: `Lihat karya menarik ini dari siswa SMAN 1 Ketapang: ${title}`,
        url: currentUrl,
      });
    } catch (err) {
      console.log("Share dibatalkan atau gagal", err);
    }
  };

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const waLink = `https://wa.me/?text=${encodedTitle}%20-%20Baca%20selengkapnya%20di:%20${encodedUrl}`;
  const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const xLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const telegramLink = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
  const mailLink = `mailto:?subject=${encodedTitle}&body=Halo,%0D%0ACoba lihat karya menarik dari SMAN 1 Ketapang ini:%0D%0A${encodedUrl}`;

  return (
    <section className="mt-16 mb-8 py-10 bg-slate-50/50 border border-slate-100 rounded-3xl">
      <div className="flex flex-col items-center justify-center text-center gap-6 px-6">
        <div className="max-w-md">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">
            Apresiasi Karya Ini
          </h3>
          <p className="text-[13px] font-medium text-slate-500 leading-relaxed">
            Dukung siswa-siswi SMAN 1 Ketapang dengan membagikan atau menyimpan halaman ini.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold transition-all border ${isCopied
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 shadow-sm"
              }`}
          >
            {isCopied ? <Check size={16} /> : <LinkIcon size={16} />}
            {isCopied ? "Tersalin!" : "Salin Tautan"}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all text-[13px] font-bold shadow-sm"
            title="Cetak Halaman"
          >
            <Printer size={16} className="text-slate-500" />
            <span>Cetak</span>
          </button>

          <a href={waLink} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all shadow-sm group" title="WhatsApp">
            <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
          </a>

          <a href={fbLink} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all shadow-sm group" title="Facebook">
            <Facebook size={18} className="group-hover:scale-110 transition-transform" />
          </a>

          <a href={xLink} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm group" title="X (Twitter)">
            <Twitter size={18} className="group-hover:scale-110 transition-transform" />
          </a>

          <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9] transition-all shadow-sm group" title="Telegram">
            <Send size={18} className="group-hover:scale-110 transition-transform" />
          </a>

          <a href={mailLink} className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-600 hover:text-white hover:border-slate-600 transition-all shadow-sm group" title="Kirim via Email">
            <Mail size={18} className="group-hover:scale-110 transition-transform" />
          </a>

          {canNativeShare && (
            <button onClick={handleNativeShare} className="p-2.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm group" title="Opsi Bagikan Lainnya">
              <Share2 size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          )}

        </div>
      </div>
    </section>
  );
}