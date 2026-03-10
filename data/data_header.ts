export interface NavChild {
  label: string;
  href: string;
  isExternal?: boolean;
  group?: "Kurikulum" | "Asesmen";
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
      { label: "Kalender Akademik", href: "/components/akademik/kalender-akademik", group: "Kurikulum" },
      { label: "Jadwal Pembelajaran", href: "/components/akademik/jadwal-sekolah", group: "Kurikulum" },
      { label: "Perangkat Pembelajaran", href: "/components/akademik/perangkat", group: "Kurikulum" },
      { label: "Karya Siswa/Siswi", href: "/components/akademik/karya", group: "Kurikulum" },
      { label: "ASAS", href: "/components/asesmen/asas", group: "Asesmen" },
      { label: "ASAJ", href: "/components/asesmen/asj", group: "Asesmen" },
      { label: "TKA", href: "/components/asesmen/tka", group: "Asesmen" },
      { label: "Supervisi Guru", href: "/components/asesmen/supervisi", group: "Asesmen" },
      { label: "Double Track", href: "/components/kesiswaan/double-track", group: "Kurikulum" },
      { label: "ANBK", href: "/components/beranda/anbk", group: "Asesmen" },
    ],
  },
  {
    label: "Kesiswaan",
    children: [
      { label: "DISPO SMANKA", href: "https://dispo.sman1ketapang.sch.id", isExternal: true },
      { label: "OSIS/MPK", href: "/components/kesiswaan/osis" },
      { label: "Ekstrakurikuler", href: "/components/kesiswaan/ekstrakurikuler" },
      { label: "Biosmatika", href: "/components/kesiswaan/biosmatika" },
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
  { label: "SARPRAS", href: "/components/fasilitas" },
];