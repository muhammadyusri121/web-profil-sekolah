import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getHolidays } from "@/lib/data/data_holiday";
import CalendarContent from "./calendar-content";

export const dynamic = 'force-dynamic';
export default async function KalenderPage() {
  const holidays = await getHolidays();

  let pageInfo = {
    title: "Kalender Akademik",
    content: "Pantau seluruh agenda penting, hari libur, dan jadwal kegiatan sekolah dalam satu tempat yang praktis."
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

  const now = new Date();
  const upcoming = holidays.filter((h: any) => new Date(h.date) >= now);
  const thisMonth = holidays.filter((h: any) => {
    const d = new Date(h.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="grow pt-32 pb-5 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="mb-12 flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none">
                {pageInfo.title.split(' ')[0]} <span className="text-[#F3C623]">{pageInfo.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="mt-4 text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                {pageInfo.content.replace(/<[^>]*>/g, '')}
              </p>
            </div>
          </div>

          <CalendarContent initialHolidays={holidays} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
