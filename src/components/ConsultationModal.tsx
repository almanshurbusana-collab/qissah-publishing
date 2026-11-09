import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { buildWaUrl, PLANS } from '../data/publishingData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose, initialPlan }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Dosen');
  const [bookTitle, setBookTitle] = useState('');
  const [category, setCategory] = useState('Buku Ajar');
  const [pageCount, setPageCount] = useState('150');
  const [selectedPlan, setSelectedPlan] = useState(initialPlan || 'Paket Reguler');
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Halo Admin Qissah Publishing, saya ingin konsultasi penerbitan buku:
- Nama Penulis: ${name || 'Penulis'}
- Kategori/Profesi: ${role}
- Rencana Judul: ${bookTitle || 'Belum ada judul pasti'}
- Bidang/Kategori: ${category}
- Estimasi Halaman: ${pageCount || '100'} hlm
- Minat Paket: ${selectedPlan}
${notes ? `- Catatan: ${notes}\n` : ''}
Mohon arahan langkah selanjutnya dan teknis pengiriman naskahnya. Terima kasih!`;

    window.open(buildWaUrl(msg), '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2A22]/80 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-lg bg-[#F2F7F4] border-2 border-[#0A2A22] shadow-[8px_8px_0_#0A2A22] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          type="button"
          aria-label="Tutup modal"
          className="absolute top-4 right-4 p-2 text-[#0A2A22] hover:bg-slate-200 border border-slate-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#0A7B5B] font-semibold">
            Konsultasi Gratis
          </span>
          <h2 className="font-display text-2xl text-[#0A2A22] mt-1">
            Ceritakan Naskah Anda
          </h2>
          <p className="text-xs text-[#46605A] mt-1">
            Isi formulir ringkas di bawah. Tim Qissah Publishing akan menghubungkan Anda langsung via WhatsApp dengan pesan yang sudah terformat rapi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-mono uppercase tracking-wider text-[#46605A] font-semibold mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Dr. Budi Santoso, M.Si."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-white border-2 border-[#0A2A22] text-[#0A2A22] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0A7B5B]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono uppercase tracking-wider text-[#46605A] font-semibold mb-1">
                Latar Belakang / Profesi
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 bg-white border-2 border-[#0A2A22] text-[#0A2A22]"
              >
                <option value="Dosen">Dosen / Peneliti</option>
                <option value="Mahasiswa">Mahasiswa S1/S2/S3</option>
                <option value="Guru">Guru / Tenaga Pendidik</option>
                <option value="Penulis">Penulis Independen</option>
                <option value="Masyarakat Umum">Masyarakat Umum</option>
              </select>
            </div>

            <div>
              <label className="block font-mono uppercase tracking-wider text-[#46605A] font-semibold mb-1">
                Kategori Naskah
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-white border-2 border-[#0A2A22] text-[#0A2A22]"
              >
                <option value="Buku Ajar / Monograf">Buku Ajar / Monograf</option>
                <option value="Skripsi/Tesis Jadi Buku">Skripsi / Tesis Jadi Buku</option>
                <option value="Kumpulan Cerpen/Puisi">Kumpulan Cerpen / Puisi</option>
                <option value="Novel / Fiksi">Novel / Fiksi</option>
                <option value="Nonfiksi / Memoar">Nonfiksi / Memoar</option>
                <option value="Modul Pembelajaran">Modul Pembelajaran</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase tracking-wider text-[#46605A] font-semibold mb-1">
              Rencana Judul Buku
            </label>
            <input
              type="text"
              placeholder="Contoh: Pengantar Ilmu Komunikasi Kontemporer"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className="w-full p-2.5 bg-white border-2 border-[#0A2A22] text-[#0A2A22] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0A7B5B]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono uppercase tracking-wider text-[#46605A] font-semibold mb-1">
                Estimasi Halaman Word
              </label>
              <input
                type="number"
                min={30}
                max={900}
                value={pageCount}
                onChange={(e) => setPageCount(e.target.value)}
                className="w-full p-2.5 bg-white border-2 border-[#0A2A22] text-[#0A2A22]"
              />
            </div>

            <div>
              <label className="block font-mono uppercase tracking-wider text-[#46605A] font-semibold mb-1">
                Pilihan Paket
              </label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full p-2.5 bg-white border-2 border-[#0A2A22] text-[#0A2A22]"
              >
                {PLANS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.price ? `Rp ${p.price.toLocaleString('id-ID')}` : ''})
                  </option>
                ))}
                <option value="Belum Tahu / Minta Saran">Belum Tahu / Minta Saran</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase tracking-wider text-[#46605A] font-semibold mb-1">
              Catatan / Pertanyaan Tambahan (Opsional)
            </label>
            <textarea
              rows={3}
              placeholder="Misal: Apakah ada bantuan editing? Berapa lama ISBN terbit?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 bg-white border-2 border-[#0A2A22] text-[#0A2A22] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0A7B5B]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="btn-press w-full py-3 px-4 bg-[#0A7B5B] text-white hover:bg-[#07553F] text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Buka Chat Konsultasi WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
