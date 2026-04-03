import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getHolidays } from "@/lib/data/data_holiday";
import CalendarContent from "./calendar-content";
import { AnimatedHeading } from "@/components/ui/animated-heading";

export const dynamic = 'force-dynamic';

export default async function KalenderPage() {
  const holidays = await getHolidays();

  let pageInfo = {
    title: "Kalender Akademik",
    content: "Pantau seluruh agenda penting, hari libur, dan jadwal kegiatan sekolah."
  };

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/post?slug=kalender-akademik`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.title) {
        pageInfo = {
          title: data.title,
          content: data.content || pageInfo.content
        };
      }
    }
  } catch (e) {
    console.error("Gagal load info halaman:", e);
  }

  const titleParts = pageInfo.title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header />

      <main className="grow pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <AnimatedHeading className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                {firstWord} <span className="text-yellow-500">{restOfTitle}</span>
              </AnimatedHeading>
              
              {pageInfo.content && (
                <p className="mt-6 text-sm md:text-base text-slate-500 font-medium leading-relaxed text-justify md:text-center hyphens-auto">
                  {pageInfo.content.replace(/<[^>]*>/g, '')}
                </p>
              )}

            </div>
          </div>

          <div className="relative z-10">
            <CalendarContent initialHolidays={holidays} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}