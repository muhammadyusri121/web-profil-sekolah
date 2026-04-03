"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  Phone, 
  MapPin 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-yellow-800 text-white border-t border-yellow-200">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 md:w-12 md:h-12">
                  <Image src="/login-logo.png" alt="Logo SMAN 1 Ketapang" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-white font-black text-lg md:text-xl leading-none uppercase tracking-wide">
                    SMAN 1 KETAPANG
                  </h3>
                  <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase mt-1">
                    SAMPANG • JAWA TIMUR
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-[15px] text-white/90 max-w-md leading-relaxed">
                Sekolah penggerak yang berfokus pada pengembangan bakat, minat, dan karakter siswa untuk menghadapi tantangan masa depan dengan semangat inovatif.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <Phone size={15} className="text-yellow-300" />
                Hubungi Kami
              </h4>
              <div className="text-[15px] text-white/90 space-y-1.5">
                <p className="flex items-center gap-2 group cursor-pointer">
                  <span className="font-semibold text-white group-hover:text-yellow-300 transition-colors">Telp:</span> 
                  <span className="group-hover:translate-x-1 transition-transform">(+62) 000-0000-0000</span>
                </p>
                <p className="flex items-center gap-2 group cursor-pointer">
                  <span className="font-semibold text-white group-hover:text-yellow-300 transition-colors">Email:</span> 
                  <span className="group-hover:translate-x-1 transition-transform">admin@sman1ketapang.sch.id</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/50">Ikuti Kami</p>
              <div className="flex gap-2">
                {[
                  { Icon: Instagram, href: "https://instagram.com/sman1_ketapang", label: "Instagram" },
                  { Icon: Facebook, href: "#", label: "Facebook" },
                  { Icon: Youtube, href: "#", label: "Youtube" },
                  { Icon: Twitter, href: "#", label: "X" },
                ].map((social, i) => (
                  <Link 
                    key={i} 
                    href={social.href}
                    title={social.label}
                    className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all active:scale-95"
                  >
                    <social.Icon size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <MapPin size={16} className="text-yellow-400" />
                Alamat Sekolah
              </h4>
              <p className="text-sm text-white">
                Ledik, Rabiyan, Kec. Ketapang, Kabupaten Sampang, Jawa Timur 69261
              </p>
            </div>

            <div className="w-full h-64 rounded-xl overflow-hidden border border-white bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.941374490324!2d113.23827637483517!3d-6.897615593101619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd836e1c9b67e5f%3A0x1b695a2f929ff228!2sSMA%20Negeri%201%20Ketapang!5e0!3m2!1sid!2sid!4v1772950111919!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-100 transition-opacity duration-500"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-[0.25em]">
            © {currentYear} SMAN 1 KETAPANG. SELURUH HAK CIPTA DILINDUNGI.
          </p>
        </div>
      </div>
    </footer>
  );
}