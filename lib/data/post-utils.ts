/**
 * Shared Utilities for Post and Extracurricular data.
 * Helps maintain consistency between Homepage and Archive pages.
 */

export interface PostItem {
  id: string;
  title: string;
  slug: string;
  category?: string | null;
  ekskul_name?: string | null;
  source: "post" | "ekskul";
  thumbnail?: string | null;
  createdAt?: string | Date | null;
  authorName?: string | null;
}

export const CATEGORY_HREF: Record<string, string> = {
  KARYA_SISWA: "/akademik/karya",
  DOUBLE_TRACK: "/kesiswaan/double-track",
  OSIS_MPK: "/kesiswaan/osis",
  HUMAS: "/informasi/humas",
  KOMITE: "/informasi/komite",
  KEMITRAAN: "/informasi/kemitraan",
  SUPERVISI_GURU: "/asesmen/supervisi",
  ASAS: "/asesmen/asas",
  ASAJ: "/asesmen/asaj",
  TKA: "/asesmen/tka",
  KEGIATAN: "/informasi/kegiatan",
  PRESTASI: "/informasi/prestasi",
};

export const EKSKUL_HREF: Record<string, string> = {
  Pramuka: "/ekskul/pramuka",
  Paskibraka: "/ekskul/paskibraka",
  Sains_Club: "/ekskul/sains-club",
  Basket: "/ekskul/basket",
  Voli: "/ekskul/voli",
  Seni_Tari: "/ekskul/seni-tari",
  Paduan_Suara: "/ekskul/paduan-suara",
  PMR: "/ekskul/pmr",
  Jurnalistik: "/ekskul/jurnalistik",
};

export function getPostHref(post: PostItem): string {
  if (post.source === "ekskul" && post.ekskul_name) {
    const base = EKSKUL_HREF[post.ekskul_name];
    return base ? `${base}/${post.slug}` : "#";
  }
  if (post.category) {
    const base = CATEGORY_HREF[post.category];
    return base ? `${base}/${post.slug}` : "#";
  }
  return "#";
}

export function getCategoryLabel(post: PostItem): string {
  if (post.ekskul_name) return post.ekskul_name.replace(/_/g, " ");
  if (post.category) return post.category.replace(/_/g, " ");
  return "Artikel";
}

export function formatDate(value?: string | Date | null): string {
  if (!value) return "Baru saja";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Baru saja";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
