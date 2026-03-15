"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PostCarouselDetail({ images, title }: { images: string[], title: string }) {
  const [idx, setIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-slate-100 flex items-center justify-center rounded-2xl border border-slate-200 text-4xl font-black text-slate-300 italic">
        404
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 group">
      <img 
        src={images[idx]} 
        alt={title} 
        className="w-full h-full object-cover transition-all duration-500" 
      />

      {images.length > 1 && (
        <>
          <button 
            onClick={() => setIdx(idx === 0 ? images.length - 1 : idx - 1)} 
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-black"
          >
            <ChevronLeft size={40} strokeWidth={2.5} />
          </button>

          <button 
            onClick={() => setIdx(idx === images.length - 1 ? 0 : idx + 1)} 
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-black"
          >
            <ChevronRight size={40} strokeWidth={2.5} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 transition-all rounded-full drop-shadow-sm ${
                  i === idx ? "w-8 bg-yellow-400" : "w-2 bg-white/50"
                }`} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}