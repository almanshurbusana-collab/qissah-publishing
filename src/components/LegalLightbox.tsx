import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { COMPANY } from '../data/publishingData';

interface LegalLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
}

export const LegalLightbox: React.FC<LegalLightboxProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Legalitas Penerbit Qissah Publishing"
      className="fixed inset-0 z-50 flex flex-col bg-[#05140F]/95 p-4 sm:p-6 backdrop-blur-md"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white pb-3 border-b border-white/20">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#F5CB45]">
            Dokumen Legalitas Resmi
          </span>
          <h2 className="font-display text-lg sm:text-xl text-white">
            Sertifikat Standar Perizinan Berusaha Berbasis Risiko (KBLI 58110)
          </h2>
          <p className="text-xs text-slate-300 font-mono">
            Atas Nama: {COMPANY.legalName} · Kementerian Investasi / BKPM RI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={COMPANY.legalImgUrl}
            download="Sertifikat_Legalitas_PT_Qissah_Global_Nusantara.webp"
            className="btn-press btn-press-band py-2 px-3 bg-white text-[#0A2A22] text-xs hidden sm:inline-flex"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh</span>
          </a>
          <button
            onClick={onClose}
            type="button"
            className="btn-press btn-press-band py-2 px-4 bg-[#F5CB45] text-[#0A2A22] text-xs font-bold"
          >
            <X className="w-4 h-4 mr-1" />
            <span>Tutup</span>
          </button>
        </div>
      </div>

      {/* Image container with scrolling */}
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="flex-1 min-h-0 overflow-auto flex items-center justify-center p-4 cursor-pointer"
      >
        <img
          src={COMPANY.legalImgUrl}
          alt="Sertifikat Standar Perizinan Berusaha Berbasis Risiko PT Qissah Global Nusantara"
          className="max-w-[950px] w-full h-auto bg-white border-2 border-white shadow-2xl rounded-xs object-contain cursor-default"
        />
      </div>

      <div className="pt-2 text-center text-xs text-slate-400 font-mono">
        Klik di luar gambar atau tekan tombol <kbd className="bg-slate-800 px-1 py-0.5 rounded text-white">Esc</kbd> untuk menutup
      </div>
    </div>
  );
};
