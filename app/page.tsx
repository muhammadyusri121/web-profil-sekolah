// src/app/page.tsx
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import Hero from '@/app/components/beranda/hero';
import About from '@/app/components/beranda/about';
import Gallery from '@/app/components/beranda/gallery';
import Ekstra from '@/app/components/beranda/ekstra';
import PostSection from '@/app/components/beranda/postingan';
import StatistikPengunjung from '@/app/components/beranda/statistik-pengunjung';
import YouTubeSection from '@/app/components/beranda/youtube';

import BetaNotice from "@/components/PopUpNotice";

import { getStructuralPersonnel } from "@/data/data_beranda/data_guru";
import { getLatestPosts } from "@/data/data_beranda/data_postingan";
import { getLatestYouTubeVideos } from "@/lib/youtube";

export default async function Home() {
  const teachers = await getStructuralPersonnel();
  const posts = await getLatestPosts();

  // Ganti Channel ID ini dengan Channel Resmi Sekolah. 
  // Bisa juga diisi via .env: process.env.YOUTUBE_CHANNEL_ID
  const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCv4o3R-8v9c2qZ9kM5H6mKg';
  const youtubeVideos = await getLatestYouTubeVideos(YOUTUBE_CHANNEL_ID, 4);

  console.log("Data guru yang berhasil ditarik:", teachers.length);
  console.log("Data postingan yang berhasil ditarik:", posts.length);
  console.log("Data video YouTube yang berhasil ditarik:", youtubeVideos.length);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="grow">
        <BetaNotice />
        <Hero />
        <About />

        <Gallery teachers={teachers} />
        <YouTubeSection videos={youtubeVideos} />
        <Ekstra />
        <PostSection posts={posts} />
      </div>

      <StatistikPengunjung />
      <Footer />
    </main>
  );
}