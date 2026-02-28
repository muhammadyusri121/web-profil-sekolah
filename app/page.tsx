// src/app/page.tsx
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import Hero from '@/app/components/beranda/hero';
import About from '@/app/components/beranda/about';
import Gallery from '@/app/components/beranda/gallery';
import Exstra from '@/app/components/beranda/ekstra';
import PostSection from '@/app/components/beranda/postingan';

// Impor fungsi data fetching
import { getStructuralPersonnel } from "@/data/data_beranda/data_guru";
import { getLatestPosts } from "@/data/data_beranda/data_postingan";

// Wajib menggunakan 'async' agar bisa menggunakan 'await'
export default async function Home() {
  // 1. Ambil data dari database VPS
  const teachers = await getStructuralPersonnel(); 
  const posts = await getLatestPosts();
  
  // 2. Debugging (akan muncul di terminal, bukan console browser)
  console.log("Data guru yang berhasil ditarik:", teachers.length);
  console.log("Data postingan yang berhasil ditarik:", posts.length);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Konten Utama */}
      <div className="grow">
        <Hero />
        <About />
        
        {/* 3. KRUSIAL: Kirim data teachers ke komponen Gallery */}
        <Gallery teachers={teachers} />
        <Exstra />
        <PostSection posts={posts} />
      </div>

      <Footer />
    </main>
  );
}