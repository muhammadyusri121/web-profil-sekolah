"use client";

import { useState, useEffect } from "react";
import { Check, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareArticleProps {
  title: string;
  url?: string;
}

const BrandLogos = {
  WhatsApp: () => (
    <img src="/icon/wa.png" alt="WhatsApp" className="w-10 h-10 object-contain drop-shadow-sm" />
  ),
  Telegram: () => (
    <img src="/icon/telegram.png" alt="Telegram" className="w-10 h-10 object-contain drop-shadow-sm" />
  ),
  Facebook: () => (
    <img src="/icon/facebook.png" alt="Facebook" className="w-10 h-10 object-contain drop-shadow-sm" />
  ),
  Gmail: () => (
    <img src="/icon/gmail.png" alt="Gmail" className="w-10 h-10 object-contain drop-shadow-sm" />
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
    { id: 'wa', icon: <BrandLogos.WhatsApp />, link: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, label: 'WhatsApp' },
    { id: 'fb', icon: <BrandLogos.Facebook />, link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, label: 'Facebook' },
    { id: 'tg', icon: <BrandLogos.Telegram />, link: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, label: 'Telegram' },
    { id: 'mail', icon: <BrandLogos.Gmail />, link: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`, label: 'Gmail' },
  ];

  return (
    <section className="py-3 bg-yellow-200 border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-6 flex justify-center">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={handleCopyLink}
            className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 transition-all hover:bg-yellow-50 hover:border-yellow-200 hover:shadow-md active:scale-95"
            title="Salin Link"
          >
            <AnimatePresence mode="wait">
              {isCopied ? (
                <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs pr-1">
                    <Check size={16} strokeWidth={3} />
                    <span>TERSALIN!</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="link" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <img src="/icon/copy.png" alt="Copy Link" className="w-10 h-10 object-contain" />
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
                className="flex items-center justify-center w-14 h-14 rounded-2xl transition-all hover:bg-yellow-50 hover:-translate-y-1 active:scale-90"
                title={option.label}
              >
                {option.icon}
              </a>
            ))}

            {canNativeShare && (
              <button
                onClick={() => navigator.share({ title, url: currentUrl })}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-black text-white transition-all hover:bg-neutral-800 hover:-translate-y-1 active:scale-90 shadow-md ml-2 self-center"
                title="Lainnya"
              >
                <Share2 size={18} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
