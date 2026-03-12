"use client";

interface AdditionalInfoProps {
  title?: string;
  description?: string;
}

export default function AdditionalInfo({
  title = "Butuh informasi lebih detail?",
  description = "Silakan hubungi pihak sekolah untuk informasi lebih lanjut mengenai layanan ini. Terima kasih.",
}: AdditionalInfoProps) {
  
  return (
    <div className={`mt-12 p-8 rounded-md border text-center bg-yellow-50 border-yellow-100 text-yellow-700`}>
      <h4 className="text-lg font-bold text-slate-900">{title}</h4>
      <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
}