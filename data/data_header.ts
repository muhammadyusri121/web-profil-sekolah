export interface NavChild {
  label: string;
  href: string;
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
      { label: "Sambutan Kepala Sekolah", href: "/profil" },
      { label: "Mars Sekolah", href: "/profil/mars" },
      { label: "Visi & Misi", href: "/profil/visi-misi" },
      { label: "Struktural GTK", href: "/profil/struktur" },
    ],
  },
  {
    label: "Akademik",
    children: [
      { label: "Kurikulum", href: "/akademik/kurikulum" },
      { label: "Kalender Akademik", href: "/akademik/kalender" },
      { label: "Jadwal Sekolah", href: "/akademik/ekskul" },
      { label: "Perangkat Pembelajaran", href: "/akademik/ekskul" },
      { label: "Karya Siswa/Siswi", href: "/akademik/ekskul" },
    ],
  },
  {
    label: "Asesmen",
    children: [
      { label: "ASAS", href: "/akademik/kurikulum" },
      { label: "ASJ", href: "/akademik/jurusan" },
      { label: "TKA", href: "/akademik/ekskul" },
      { label: "Supervisi Guru", href: "/akademik/ekskul" },
    ],
  },
  {
    label: "Kesiswaan",
    children: [
      { label: "Struktural", href: "/akademik/kurikulum" },
      { label: "Osis/MPK", href: "/akademik/jurusan" },
      { label: "Ekstrakurikuler", href: "/akademik/ekskul" },
      { label: "Double Track", href: "/akademik/ekskul" },
    ],
  },
  {
    label: "Informasi",
    children: [
      { label: "Humas & Komite", href: "/akademik/kurikulum" },
      { label: "Kemitraan", href: "/akademik/jurusan" },
      { label: "Galeri Prestasi", href: "/akademik/ekskul" },
      { label: "Kegiatan", href: "/akademik/ekskul" },
    ],
  },
  { label: "Fasilitas", href: "/fasilitas" },
];