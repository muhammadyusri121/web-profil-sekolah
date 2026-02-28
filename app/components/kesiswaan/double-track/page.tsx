import Link from "next/link";
import { Calendar, Image as ImageIcon, ArrowRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default async function KaryaPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/post?category=DOUBLE_TRACK`, {
    cache: 'no-store'
  });

  const posts = await res.json();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="grow pt-25 pb-16 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {posts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/double-track/${post.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-yellow-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-tranyellow-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-yellow-100">
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-yellow-300">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-4 flex flex-col grow">
                    <div className="flex items-center gap-1.5 text-yellow-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {post.createdat
                          ? new Date(post.createdat).toLocaleDateString('id-ID', {
                              day: 'numeric', month: 'short', year: 'numeric'
                            })
                          : "YEAR_INFO_UPDATE"}
                      </span>
                    </div>

                    <h2 className="text-sm font-bold text-yellow-800 leading-snug line-clamp-2 group-hover:text-yellow-600 transition-colors duration-300">
                      {post.title}
                    </h2>

                    <div className="mt-auto pt-4 flex items-center gap-1.5 text-[11px] font-black text-yellow-600 uppercase tracking-widest group-hover:text-yellow-700 transition-colors">
                      Lihat Karya Selengkapnya
                      <ArrowRight className="w-3.5 h-3.5 group-hover:tranyellow-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-3xl border border-dashed border-yellow-200">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4 text-yellow-300">
                <ImageIcon size={32} />
              </div>
              <p className="text-yellow-500 font-medium text-center">Belum ada item yang dipublikasikan.</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}