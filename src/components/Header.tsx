import React, { useState } from 'react';
import { ShoppingBag, MessageSquare, Menu, X, BookOpen, Calculator, Info, Home } from 'lucide-react';
import { COMPANY } from '../data/publishingData';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, bookId?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenConsultation,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F2F7F4]/95 backdrop-blur-md border-b-2 border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center justify-center focus:outline-hidden group cursor-pointer shrink-0"
          aria-label="PT Qissah Global Nusantara, ke Beranda"
        >
          <img
            src={COMPANY.logoUrl}
            alt="Logo PT Qissah Global Nusantara"
            className="h-10 sm:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-semibold text-emerald-950">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'home'
                ? 'border-b-2 border-emerald-800 text-emerald-900 font-bold bg-emerald-100/50'
                : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-100/40'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => handleNavClick('toko-buku')}
            className={`px-3 py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'toko-buku' || currentTab === 'buku'
                ? 'border-b-2 border-emerald-800 text-emerald-900 font-bold bg-emerald-100/50'
                : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-100/40'
            }`}
          >
            Toko Buku
          </button>
          <button
            onClick={() => handleNavClick('kalkulator')}
            className={`px-3 py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'kalkulator'
                ? 'border-b-2 border-emerald-800 text-emerald-900 font-bold bg-emerald-100/50'
                : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-100/40'
            }`}
          >
            Kalkulator Biaya
          </button>
          <button
            onClick={() => handleNavClick('tentang-kami')}
            className={`px-3 py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'tentang-kami'
                ? 'border-b-2 border-emerald-800 text-emerald-900 font-bold bg-emerald-100/50'
                : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-100/40'
            }`}
          >
            Tentang Kami &amp; Legalitas
          </button>
        </nav>

        {/* Actions Group (Cart, Consultation, Mobile Menu Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            type="button"
            className="relative p-2 border-2 border-emerald-950 bg-white hover:bg-emerald-100 text-emerald-950 transition-colors cursor-pointer shadow-[2px_2px_0_#0A2A22]"
            aria-label={`Keranjang belanja, ${cartCount} item`}
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-400 border border-emerald-950 text-emerald-950 font-mono text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenConsultation}
            type="button"
            className="btn-press py-2 px-3 sm:px-4 bg-emerald-900 text-white hover:bg-emerald-800 text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 hidden sm:inline" />
            <span>Konsultasi</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 border-2 border-emerald-950 bg-white hover:bg-emerald-100 text-emerald-950 transition-colors cursor-pointer shadow-[2px_2px_0_#0A2A22]"
            aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu navigasi'}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b-2 border-emerald-950 p-4 space-y-2 animate-in slide-in-from-top duration-200">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono font-bold text-left border ${
              currentTab === 'home'
                ? 'bg-emerald-900 text-white border-emerald-950'
                : 'bg-emerald-50/60 text-emerald-950 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Beranda &amp; Paket Penerbitan</span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('toko-buku')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono font-bold text-left border ${
              currentTab === 'toko-buku' || currentTab === 'buku'
                ? 'bg-emerald-900 text-white border-emerald-950'
                : 'bg-emerald-50/60 text-emerald-950 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Toko Buku (Katalog Lengkap)</span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('kalkulator')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono font-bold text-left border ${
              currentTab === 'kalkulator'
                ? 'bg-emerald-900 text-white border-emerald-950'
                : 'bg-emerald-50/60 text-emerald-950 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Kalkulator Estimasi Biaya</span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('tentang-kami')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono font-bold text-left border ${
              currentTab === 'tentang-kami'
                ? 'bg-emerald-900 text-white border-emerald-950'
                : 'bg-emerald-50/60 text-emerald-950 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Profil Penerbit &amp; Legalitas KBLI 58110</span>
          </button>
        </div>
      )}
    </header>
  );
};
