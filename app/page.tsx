// src/app/page.tsx
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import Hero from '@/app/components/beranda/hero';
import About from '@/app/components/beranda/about';
import Gallery from '@/app/components/beranda/gallery';
import Ekstra from '@/app/components/beranda/ekstra';
import PostSection from '@/app/components/beranda/postingan';

import BetaNotice from "@/components/PopUpNotice";

import { getStructuralPersonnel } from "@/data/data_beranda/data_guru";
import { getLatestPosts } from "@/data/data_beranda/data_postingan";

export default async function Home() {
  const teachers = await getStructuralPersonnel();
  const posts = await getLatestPosts();

  console.log("Data guru yang berhasil ditarik:", teachers.length);
  console.log("Data postingan yang berhasil ditarik:", posts.length);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="grow">
        {/* <BetaNotice /> */}
        <Hero />
        <About />

        <Gallery teachers={teachers} />
        <Ekstra />
        <PostSection posts={posts} />
      </div>

      <Footer />
    </main>
  );
}