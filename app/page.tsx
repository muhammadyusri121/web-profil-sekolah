export const dynamic = 'force-dynamic';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import Hero from '@/app/beranda/hero';
import About from '@/app/beranda/about';
import Gallery from '@/app/beranda/gallery';
import Ekstra from '@/app/beranda/ekstra';
import PostSection from '@/app/beranda/post/postingan';
import StatistikPengunjung from '@/app/beranda/statistik-pengunjung';
import YouTubeSection from '@/app/beranda/youtube';

import BetaNotice from "@/components/PopUpNotice";

import { getStructuralPersonnel } from "@/lib/data/data_guru";
import { getLatestPosts } from "@/lib/data/data_postingan";
import { getLatestYouTubeVideos } from "@/lib/youtube";

export default async function Home() {
  const teachers = await getStructuralPersonnel();
  const posts = await getLatestPosts();
  const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCJ2axLq7hE_cMPgeSfQux6Q';
  const youtubeVideos = await getLatestYouTubeVideos(YOUTUBE_CHANNEL_ID, 5);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="grow">
        <BetaNotice />
        <Hero />
        <About />

        <Gallery teachers={teachers} />
        <Ekstra />
        <PostSection posts={posts} />
        <YouTubeSection videos={youtubeVideos} />
      </div>

      <StatistikPengunjung />
      <Footer />
    </main>
  );
}