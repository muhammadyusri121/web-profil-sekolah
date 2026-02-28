export interface NavChild {
  label: string;
  href: string;
  isExternal?: boolean;
  group?: "Pelajaran" | "Asesmen"; // Pembeda grup di dalam Akademik
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export const navigationData: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    children: [
      { label: "Sambutan Kepala Sekolah", href: "/profil/sambutan" },
      { label: "Mars Sekolah", href: "/profil/mars" },
      { label: "Visi & Misi", href: "/profil/visi-misi" },
      { label: "Struktural GTK", href: "/profil/struktur-gtk" },
    ],
  },
  {
    label: "Akademik",
    children: [
      { label: "Kurikulum", href: "/akademik/kurikulum", group: "Pelajaran" },
      { label: "Kalender Akademik", href: "/akademik/kalender", group: "Pelajaran" },
      { label: "Jadwal Sekolah", href: "/akademik/jadwal", group: "Pelajaran" },
      { label: "Perangkat Pembelajaran", href: "/akademik/perangkat", group: "Pelajaran" },
      { label: "Karya Siswa/Siswi", href: "/akademik/karya", group: "Pelajaran" },
      { label: "ASAS", href: "/asesmen/asas", group: "Asesmen" },
      { label: "ASJ", href: "/asesmen/asj", group: "Asesmen" },
      { label: "TKA", href: "/asesmen/tka", group: "Asesmen" },
      { label: "Supervisi Guru", href: "/asesmen/supervisi", group: "Asesmen" },
    ],
  },
  {
    label: "Kesiswaan",
    children: [
      { label: "Dispo SMANKA", href: "https://dispo.sman1ketapang.sch.id", isExternal: true },
      { label: "Struktural", href: "/kesiswaan/struktural" },
      { label: "Osis/MPK", href: "/osis" },
      { label: "Ekstrakurikuler", href: "/#ekstra" },
      { label: "Double Track", href: "/double-track" },
    ],
  },
  {
    label: "Informasi",
    children: [
      { label: "Humas & Komite", href: "/humas-komite" },
      { label: "Kemitraan", href: "/kemitraan" },
      { label: "Galeri Prestasi", href: "/prestasi" },
      { label: "Kegiatan", href: "/kegiatan" },
    ],
  },
  { label: "Fasilitas", href: "/fasilitas" },
];