import { Metadata } from 'next';
import TemplatSlugHalaman from "@/components/template/templat_slug_halaman";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    
    try {
        const res = await fetch(`${baseUrl}/api/post?slug=${slug}`);
        const post = await res.json();
        
        if (!post) return { title: "Karya Tidak Ditemukan" };

        const summary = post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) : "Karya siswa SMAN 1 Ketapang";

        return {
            title: `${post.title} | Karya Siswa SMAN 1 Ketapang`,
            description: summary,
            openGraph: {
                title: post.title,
                description: summary,
                images: post.thumbnail ? [post.thumbnail] : ["/login-logo.png"],
            },
        };
    } catch (e) {
        return { title: "Karya Siswa | SMAN 1 Ketapang" };
    }
}

export default async function DetailKaryaPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?slug=${slug}`;

    return <TemplatSlugHalaman title="Karya Siswa" basePath="/akademik/karya" apiUrl={apiUrl} />;
}