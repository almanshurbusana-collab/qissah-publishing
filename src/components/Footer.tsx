import React from 'react';
import { COMPANY } from '../data/publishingData';
import { MessageCircle, Phone, Mail, MapPin, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'toko-buku' | 'kalkulator' | 'tentang-kami') => void;
  onOpenConsultation: () => void;
  onOpenLegal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenLegal,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t-4 border-emerald-900 mt-20">
      {/* Top CTA Banner */}
      <div className="bg-emerald-900/60 border-b border-emerald-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-2xl">
              <span className="inline-block text-xs uppercase font-mono tracking-wider text-amber-300 font-semibold mb-2">
                Konsultasi Naskah Tanpa Biaya
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-bold leading-tight">
                Punya draf naskah yang siap diterbitkan?
              </h2>
              <p className="mt-2 text-sm text-emerald-200">
                Diskusikan format, estimasi biaya cetak, dan alur perolehan ISBN resmi Perpustakaan Nasional bersama tim editorial Qissah.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm transition-transform active:translate-y-0.5 inline-flex items-center justify-center gap-2 border border-amber-300 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Mulai Konsultasi Gratis
              </button>
              <a
                href={COMPANY.waConsultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-sm transition-colors border border-emerald-700 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                Chat WhatsApp Langsung
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={COMPANY.logoUrl}
                alt="Logo Qissah Publishing"
                className="h-10 w-auto bg-white/95 p-1 rounded-sm border border-emerald-700"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  Qissah Publishing
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block">
                  {COMPANY.legalName}
                </span>
              </div>
            </div>

            <p className="text-sm text-emerald-300/90 leading-relaxed max-w-md">
              Penerbit buku ber-ISBN resmi di Kota Bogor. Melayani penerbitan karya sastra, buku ajar, monograf akademik, memoar, antologi, dan buku saku komunitas dengan standar perwajahan profesional.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenLegal}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 border border-emerald-700 text-xs font-mono transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Legalitas Terdaftar: KBLI 58110 (Aktivitas Penerbitan Buku)</span>
              </button>
            </div>
          </div>

          {/* Navigasi Menu */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-amber-300">
              Navigasi Halaman
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-emerald-200 hover:text-white transition-colors cursor-pointer"
                >
                  Beranda & Paket
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('toko-buku')}
                  className="text-emerald-200 hover:text-white transition-colors cursor-pointer"
                >
                  Katalog Toko Buku
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('kalkulator')}
                  className="text-emerald-200 hover:text-white transition-colors cursor-pointer"
                >
                  Kalkulator Biaya Cetak
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tentang-kami')}
                  className="text-emerald-200 hover:text-white transition-colors cursor-pointer"
                >
                  Profil & Legalitas Penerbit
                </button>
              </li>
              <li>
                <a
                  href="#faq-section"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-emerald-200 hover:text-white transition-colors cursor-pointer"
                >
                  Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak & Kantor */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-amber-300">
              Kantor Redaksi & Percetakan
            </h3>
            <div className="space-y-2.5 text-sm text-emerald-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <p className="leading-relaxed">
                  {COMPANY.address}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="hover:text-white transition-colors font-mono"
                >
                  {COMPANY.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={COMPANY.waConsultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-mono"
                >
                  WhatsApp: {COMPANY.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-white transition-colors font-mono"
                >
                  {COMPANY.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={COMPANY.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white underline font-mono"
              >
                <span>Buka di Google Maps (Bogor Barat)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="mt-12 pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-emerald-400">
          <p>
            © {currentYear} {COMPANY.legalName}. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-500">Bogor, Jawa Barat, Indonesia</span>
            <span>•</span>
            <button
              type="button"
              onClick={onOpenLegal}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Sertifikat KBLI 58110
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
