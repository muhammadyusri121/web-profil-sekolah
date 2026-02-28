import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

interface ArticleProps {
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
  date?: string;
}

export default function ArticleCard({ title, slug, thumbnail, category, date }: ArticleProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnail || "/placeholder-school.jpg"} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-lg">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-slate-400 text-xs mb-3 gap-2">
          <Calendar className="w-3 h-3" />
          <span>{date || "Februari 2026"}</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <Link 
            href={`/${category.toLowerCase()}/${slug}`}
            className="text-blue-600 font-semibold text-sm flex items-center gap-1 group/btn"
          >
            Baca Selengkapnya 
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}