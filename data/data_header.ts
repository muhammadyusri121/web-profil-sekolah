export interface NavChild {
  label: string;
  href: string;
  isExternal?: boolean;
  group?: "Pelajaran" | "Asesmen";
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
      { label: "Sambutan Kepala Sekolah", href: "/components/profil/sambutan" },
      { label: "Mars Sekolah", href: "/components/profil/mars" },
      { label: "Visi & Misi", href: "/components/profil/visi-misi" },
      { label: "Struktural GTK", href: "/components/profil/struktur-gtk" },
    ],
  },
  {
    label: "Akademik",
    children: [
      { label: "Kurikulum", href: "/components/akademik/kurikulum", group: "Pelajaran" },
      { label: "Kalender Akademik", href: "/components/akademik/kalender", group: "Pelajaran" },
      { label: "Jadwal Sekolah", href: "/components/akademik/jadwal", group: "Pelajaran" },
      { label: "Perangkat Pembelajaran", href: "/components/akademik/perangkat", group: "Pelajaran" },
      { label: "Karya Siswa/Siswi", href: "/components/akademik/karya", group: "Pelajaran" },
      { label: "ASAS", href: "/components/asesmen/asas", group: "Asesmen" },
      { label: "ASJ", href: "/components/asesmen/asj", group: "Asesmen" },
      { label: "TKA", href: "/components/asesmen/tka", group: "Asesmen" },
      { label: "Supervisi Guru", href: "/components/asesmen/supervisi", group: "Asesmen" },
    ],
  },
  {
    label: "Kesiswaan",
    children: [
      { label: "Dispo SMANKA", href: "https://dispo.sman1ketapang.sch.id", isExternal: true },
      { label: "Struktural", href: "/components/kesiswaan/struktural" },
      { label: "Osis/MPK", href: "/components/kesiswaan/osis" },
      { label: "Ekstrakurikuler", href: "/components/kesiswaan/ekstrakurikuler" },
      { label: "Double Track", href: "/components/kesiswaan/double-track" },
    ],
  },
  {
    label: "Informasi",
    children: [
      { label: "Humas & Komite", href: "/components/informasi/humas-komite" },
      { label: "Kemitraan", href: "/components/informasi/kemitraan" },
      { label: "Galeri Prestasi", href: "/components/informasi/prestasi" },
      { label: "Kegiatan", href: "/components/informasi/kegiatan" },
    ],
  },
  { label: "Fasilitas", href: "/components/fasilitas" },
];