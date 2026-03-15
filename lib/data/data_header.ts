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
      { label: "Sambutan Kepala Sekolah", href: "/profil/sambutan" },
      { label: "Mars Sekolah", href: "/profil/mars" },
      { label: "Visi & Misi", href: "/profil/visi-misi" },
      { label: "Struktural GTK", href: "/profil/struktur-gtk" },
    ],
  },
  {
    label: "Akademik",
    children: [
      { label: "Kalender Akademik", href: "/akademik/kalender-akademik", group: "Kurikulum" },
      { label: "Jadwal Pembelajaran", href: "/akademik/jadwal-sekolah", group: "Kurikulum" },
      { label: "Perangkat Pembelajaran", href: "/akademik/perangkat-pembelajaran", group: "Kurikulum" },
      { label: "Karya Siswa/Siswi", href: "/akademik/karya", group: "Kurikulum" },
      { label: "ASAS", href: "/asesmen/asas", group: "Asesmen" },
      { label: "ASAJ", href: "/asesmen/asaj", group: "Asesmen" },
      { label: "TKA", href: "/asesmen/tka", group: "Asesmen" },
      { label: "Supervisi Guru", href: "/asesmen/supervisi", group: "Asesmen" },
      { label: "Double Track", href: "/kesiswaan/double-track", group: "Kurikulum" },
      { label: "ANBK", href: "/beranda/anbk", group: "Asesmen" },
    ],
  },
  {
    label: "Kesiswaan",
    children: [
      { label: "DISPO SMANKA", href: "https://dispo.sman1ketapang.sch.id", isExternal: true },
      { label: "OSIS/MPK", href: "/kesiswaan/osis" },
      { label: "Ekstrakurikuler", href: "/kesiswaan/ekstrakurikuler" },
      { label: "Biosmatika", href: "/kesiswaan/biosmatika" },
    ],
  },
  {
    label: "Informasi",
    children: [
      { label: "Humas", href: "/informasi/humas" },
      { label: "Komite", href: "/informasi/komite" },
      { label: "Kemitraan", href: "/informasi/kemitraan" },
      { label: "Galeri Prestasi", href: "/informasi/prestasi" },
      { label: "Kegiatan", href: "/informasi/kegiatan" },
    ],
  },
  { label: "SARPRAS", href: "/fasilitas" },
];