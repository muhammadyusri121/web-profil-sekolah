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
    <footer className="bg-yellow-700 text-white border-t border-yellow-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12">
                  <Image src="/login-logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-white font-black text-xl md:text-2xl leading-none uppercase tracking-tight">
                    SMAN 1 KETAPANG
                  </h3>
                  <p className="text-yellow-400 text-[11px] font-bold tracking-[0.2em] uppercase mt-1">
                    Sampang
                  </p>
                </div>
              </div>
              <p className="text-sm text-white max-w-md">
                Sekolah penggerak yang berfokus pada pengembangan bakat, minat, dan karakter siswa untuk menghadapi tantangan masa depan.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <Phone size={16} className="text-yellow-400" />
                Hubungi Kami
              </h4>
              <div className="text-sm text-white space-y-2">
                <p className="flex items-center gap-2 hover:text-yellow-400 transition-colors cursor-pointer">
                  <span className="font-semibold text-white">Telp:</span> (0721) 123456
                </p>
                <p className="flex items-center gap-2 hover:text-yellow-400 transition-colors cursor-pointer">
                  <span className="font-semibold text-white">Email:</span> info@sman1ketapang.sch.id
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white">Ikuti Kami</p>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, href: "#" },
                  { Icon: Facebook, href: "#" },
                  { Icon: Youtube, href: "#" },
                  { Icon: Twitter, href: "#" },
                ].map((social, i) => (
                  <Link 
                    key={i} 
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-white/50 border border-white flex items-center justify-center hover:bg-yellow-400 hover:text-white transition-all active:scale-90"
                  >
                    <social.Icon size={18} />
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
                Jl. Raya Ketapang No. 123, <br />
                Kec. Ketapang, Kab. Lampung Selatan, <br />
                Lampung 35592.
              </p>
            </div>

            <div className="w-full h-64 rounded-xl overflow-hidden border border-white bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15888.6672322421!2d105.7831!3d-5.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNDgnMDAuMCJTIDEwNcKwNDcnMDAuMCJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
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

        <div className="mt-16 pt-8 border-t border-white text-center">
          <p className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.2em]">
            © {currentYear} SMAN 1 KETAPANG. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}