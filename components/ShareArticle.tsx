"use client";

import { useState, useEffect } from "react";
import { Check, Share2, Link as LinkIcon, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareArticleProps {
  title: string;
  url?: string;
}

// Ikon Brand menggunakan SVG murni agar tajam dan konsisten (Custom Icons)
const SocialIcons = {
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.553 4.197 1.608 6.022L0 24l6.117-1.605a12.034 12.034 0 005.927 1.558h.005c6.632 0 12.045-5.414 12.045-12.05a11.85 11.85 0 00-3.534-8.502z" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  Telegram: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.944 0C5.344 0 0 5.344 0 11.944c0 6.6 5.344 11.944 11.944 11.944 6.6 0 11.944-5.344 11.944-11.944C23.888 5.344 18.544 0 11.944 0zm5.83 8.133l-1.97 9.28c-.145.657-.54 1.1-.983 1.1-.38 0-.74-.216-.94-.5l-2.85-2.39-1.4 1.35c-.15.15-.35.25-.56.25-.17 0-.33-.07-.46-.19l-3.32-3.13c-.32-.3-.32-.83 0-1.13l7.98-7.37c.36-.33.81-.15.93.3l.03.11z" />
    </svg>
  ),
};

export default function ShareArticle({ title, url }: ShareArticleProps) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    const hostUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    setCurrentUrl(hostUrl);

    if (typeof navigator !== "undefined" && 'share' in navigator) {
      setCanNativeShare(true);
    }
  }, [url]);

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error("Gagal menyalin link:", err);
    }
  };

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareOptions = [
    { id: 'wa', icon: <SocialIcons.WhatsApp />, link: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, color: "hover:bg-[#25D366] hover:text-white" },
    { id: 'fb', icon: <SocialIcons.Facebook />, link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: "hover:bg-[#1877F2] hover:text-white" },
    { id: 'tg', icon: <SocialIcons.Telegram />, link: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, color: "hover:bg-[#0088cc] hover:text-white" },
    { id: 'mail', icon: <Mail size={20} />, link: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`, color: "hover:bg-slate-800 hover:text-white" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center gap-2 md:gap-3">
        
        {/* Tombol Salin Link */}
        <button
          onClick={handleCopyLink}
          className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 transition-all hover:border-yellow-500 hover:shadow-md active:scale-95"
          title="Salin Link"
        >
          <AnimatePresence mode="wait">
            {isCopied ? (
              <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                <Check size={18} className="text-emerald-600" strokeWidth={3} />
              </motion.div>
            ) : (
              <motion.div key="link" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                <LinkIcon size={18} className="text-slate-500 group-hover:text-yellow-600" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Tooltip Tersalin */}
          <AnimatePresence>
            {isCopied && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -35 }}
                exit={{ opacity: 0 }}
                className="absolute text-[10px] font-black bg-emerald-600 text-white px-2 py-1 rounded-md"
              >
                TERSALIN!
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Pembagi (Divider) */}
        <div className="w-px h-6 bg-slate-200 mx-1" />

        {/* Opsi Berbagi Sosial */}
        <div className="flex items-center gap-2">
          {shareOptions.map((option) => (
            <a
              key={option.id}
              href={option.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 transition-all shadow-sm ${option.color} hover:border-transparent hover:-translate-y-1 active:scale-90`}
            >
              {option.icon}
            </a>
          ))}

          {/* Tombol Native Share (Lainnya) */}
          {canNativeShare && (
            <button
              onClick={() => navigator.share({ title, url: currentUrl })}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 text-white transition-all hover:bg-yellow-500 hover:text-slate-900 shadow-sm active:scale-90"
              title="Lainnya"
            >
              <Share2 size={18} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}