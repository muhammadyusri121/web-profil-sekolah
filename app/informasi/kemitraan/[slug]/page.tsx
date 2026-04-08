import { Metadata } from 'next';
import TemplatSlugHalaman from "@/components/template/templat_slug_halaman";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    
    try {
        const res = await fetch(`${baseUrl}/api/post?slug=${slug}`);
        const post = await res.json();
        
        if (!post) return { title: "Halaman Tidak Ditemukan" };

        const summary = post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) : "Detail kemitraan SMAN 1 Ketapang";

        return {
            title: `${post.title} | Kemitraan SMAN 1 Ketapang`,
            description: summary,
            openGraph: {
                title: post.title,
                description: summary,
                images: post.thumbnail ? [post.thumbnail] : ["/login-logo.png"],
            },
        };
    } catch (e) {
        return { title: "Detail Kemitraan | SMAN 1 Ketapang" };
    }
}

export default async function DetailKemitraanPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/post?slug=${slug}`;

    return <TemplatSlugHalaman title="Kemitraan & Kerja Sama" basePath="/informasi/kemitraan" apiUrl={apiUrl} />;
}
