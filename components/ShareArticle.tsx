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
  Mail,
  Share as ShareIcon
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
    // Memastikan window tersedia (Client Side)
    const hostUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    setCurrentUrl(hostUrl);
    
    if (typeof navigator !== "undefined" && navigator.share) {
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

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: `Cek artikel menarik ini: ${title}`,
          url: currentUrl,
        });
      }
    } catch (err) {
      console.log("Share dibatalkan", err);
    }
  };

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  // Link Media Sosial
  const platforms = [
    { id: 'wa', icon: <MessageCircle size={20} />, link: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, color: 'hover:bg-[#25D366]', label: 'WhatsApp' },
    { id: 'fb', icon: <Facebook size={20} />, link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: 'hover:bg-[#1877F2]', label: 'Facebook' },
    { id: 'x', icon: <Twitter size={20} />, link: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, color: 'hover:bg-black', label: 'X' },
    { id: 'tg', icon: <Send size={20} />, link: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, color: 'hover:bg-[#229ED9]', label: 'Telegram' },
    { id: 'mail', icon: <Mail size={20} />, link: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`, color: 'hover:bg-slate-700', label: 'Email' },
  ];

  return (
    <section className="py-8 bg-[#F3C623] border-t-4 border-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Label Jadul */}
          <div className="flex items-center gap-3">
            <div className="bg-black text-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">Bagikan Karya</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {/* Tombol Salin Link Boxy */}
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-2 px-5 py-2.5 border-2 border-black font-black text-[12px] uppercase tracking-wider transition-all active:translate-y-1 active:shadow-none ${
                isCopied 
                ? "bg-green-400 shadow-none translate-y-1" 
                : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              }`}
            >
              {isCopied ? <Check size={16} strokeWidth={3} /> : <LinkIcon size={16} strokeWidth={3} />}
              {isCopied ? "Tersalin!" : "Salin Link"}
            </button>

            {/* Icon-icon Boxy */}
            <div className="flex gap-2">
              {platforms.map((p) => (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none hover:text-white ${p.color}`}
                  title={p.label}
                >
                  {p.icon}
                </a>
              ))}

              {canNativeShare && (
                <button
                  onClick={handleNativeShare}
                  className="p-2.5 bg-blue-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
                  title="Lainnya"
                >
                  <ShareIcon size={20} />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}