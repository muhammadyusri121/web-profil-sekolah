// src/app/page.tsx
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import Hero from '@/app/components/sections/hero';
import About from '@/app/components/sections/about';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Konten Utama */}
      <div className="flex-grow">
        <Hero />
        <About />
        {/* Kamu bisa tambah section lain di sini nanti, contoh: */}
        {/* <NewsSection /> */}
        {/* <GallerySection /> */}
      </div>

      <Footer />
    </main>
  );
}