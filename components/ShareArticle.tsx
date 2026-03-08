"use client";

import { useState, useEffect } from "react";
import { Link as LinkIcon, Check, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareArticleProps {
  title: string;
  url?: string;
}

const BrandLogos = {
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
  ),
  Telegram: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944 6.598 0 11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0Zm5.206 16.561c-.19.231-.475.313-.761.22l-2.618-.873-1.33 1.282c-.2.193-.497.247-.751.136-.255-.111-.421-.366-.421-.644v-1.74l5.312-4.836c.15-.136.17-.363.045-.521-.125-.158-.352-.19-.513-.075l-6.666 4.343-2.522-.841c-.347-.116-.547-.487-.457-.837.091-.35.451-.555.795-.471l13.565 4.65c.311.107.498.441.424.757-.074.316-.364.53-.68.53h-.01Z" /></svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
  ),
  Gmail: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z" /></svg>
  )
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
    { id: 'wa', icon: <BrandLogos.WhatsApp />, link: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, color: 'bg-[#25D366]' },
    { id: 'fb', icon: <BrandLogos.Facebook />, link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: 'bg-[#1877F2]' },
    { id: 'tg', icon: <BrandLogos.Telegram />, link: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, color: 'bg-[#229ED9]' },
    { id: 'mail', icon: <BrandLogos.Gmail />, link: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`, color: 'bg-[#EA4335]' },
  ];

  return (
    <section className="py-4 bg-yellow-200 border-y border-slate-100 flex justify-center">
      <div className="flex items-center gap-2">

        <button
          onClick={handleCopyLink}
          className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 border-2 ${isCopied
              ? "bg-emerald-50 border-emerald-500 text-emerald-600 shadow-inner"
              : "bg-white border-slate-200 text-slate-500 hover:border-[#F3C623] hover:text-black"
            }`}
          title="Salin Link"
        >
          <AnimatePresence mode="wait">
            {isCopied ? (
              <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <Check size={18} strokeWidth={3} />
              </motion.div>
            ) : (
              <motion.div key="link" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <LinkIcon size={18} strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <div className="flex gap-2">
          {shareOptions.map((option) => (
            <a
              key={option.id}
              href={option.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-10 h-10 rounded-xl text-white transition-all hover:-translate-y-1 active:scale-90 shadow-sm ${option.color}`}
            >
              {option.icon}
            </a>
          ))}

          {canNativeShare && (
            <button
              onClick={() => navigator.share({ title, url: currentUrl })}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-black text-[#F3C623] transition-all hover:-translate-y-1 active:scale-90 shadow-sm"
            >
              <Share2 size={18} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}