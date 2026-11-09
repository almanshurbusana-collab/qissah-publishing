import React, { useState } from 'react';
import { PLANS, formatRp, buildWaUrl } from '../data/publishingData';
import { Calculator, MessageSquare } from 'lucide-react';

interface CostCalculatorProps {
  onOpenConsultation?: () => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onOpenConsultation }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('reguler');
  const [pageCount, setPageCount] = useState<number>(160);
  const [printCopies, setPrintCopies] = useState<number>(20);
  const [paperType, setPaperType] = useState<'bookpaper' | 'hvs'>('bookpaper');
  const [bookSize, setBookSize] = useState<'a5' | 'unesco'>('unesco');
  
  // Add-ons
  const [addCopyEditing, setAddCopyEditing] = useState<boolean>(false);
  const [addPromoMockup, setAddPromoMockup] = useState<boolean>(true);
  const [addExpressLayout, setAddExpressLayout] = useState<boolean>(false);

  const activePlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[1];

  // Calculations
  const baseCost = activePlan.price;
  
  // Extra pages beyond plan quota
  const extraPages = Math.max(0, pageCount - activePlan.pagesLimit);
  const extraPageCost = extraPages * 3500; // Rp 3.500 per extra page layout

  // Print copies calculation
  const extraCopies = Math.max(0, printCopies - activePlan.freeCopies);
  // Estimate cost per copy: ~Rp 25.000 for 150-page book + Rp 70 per page
  const costPerCopy = Math.round(15000 + (pageCount * (paperType === 'bookpaper' ? 70 : 65)) * (bookSize === 'unesco' ? 1.15 : 1.0));
  const printCopiesCost = extraCopies * costPerCopy;

  // Addons cost
  const copyEditingCost = addCopyEditing ? pageCount * 2500 : 0;
  const promoMockupCost = addPromoMockup ? 100000 : 0;
  const expressLayoutCost = addExpressLayout ? 200000 : 0;

  const totalEstimatedCost = baseCost + extraPageCost + printCopiesCost + copyEditingCost + promoMockupCost + expressLayoutCost;

  const consultationMessage = `Halo Qissah Publishing, saya telah melakukan simulasi biaya penerbitan:
- Pilihan Paket: ${activePlan.name} (${formatRp(activePlan.price)})
- Estimasi Halaman: ${pageCount} halaman (${extraPages > 0 ? `+${extraPages} hal ekstra: ${formatRp(extraPageCost)}` : 'sesuai paket'})
- Target Cetak: ${printCopies} eksemplar (${extraCopies > 0 ? `+${extraCopies} eks ekstra: ${formatRp(printCopiesCost)}` : 'termasuk paket'})
- Kertas & Ukuran: ${paperType === 'bookpaper' ? 'Bookpaper 72gr' : 'HVS 70gr'}, ${bookSize === 'unesco' ? 'UNESCO 15.5x23 cm' : 'A5 14x21 cm'}
${addCopyEditing ? `- Tambahan Copy Editing: ${formatRp(copyEditingCost)}\n` : ''}${addPromoMockup ? `- Tambahan 3D Mockup & Banner: ${formatRp(promoMockupCost)}\n` : ''}${addExpressLayout ? `- Layanan Express: ${formatRp(expressLayoutCost)}\n` : ''}
*Total Estimasi:* ${formatRp(totalEstimatedCost)}
Mohon konfirmasi dan info tahapan pengiriman naskahnya. Terima kasih!`;

  return (
    <div className="bg-white border-2 border-[#0A2A22] shadow-[6px_6px_0_#0A2A22] p-6 sm:p-10 max-w-4xl mx-auto my-8">
      <div className="flex items-center gap-3 border-b border-[#0A2A22]/20 pb-4 mb-6">
        <div className="w-10 h-10 rounded-none bg-[#F5CB45] border-2 border-[#0A2A22] flex items-center justify-center text-[#0A2A22]">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#0A7B5B] font-semibold">
            Simulasi Biaya Transparan
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-[#0A2A22]">
            Kalkulator Estimasi Penerbitan
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Package Selection */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#46605A] mb-2 font-semibold">
              1. Pilih Paket Dasar
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PLANS.map((p) => {
                const isSelected = selectedPlanId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedPlanId(p.id);
                      if (printCopies < p.freeCopies) {
                        setPrintCopies(p.freeCopies);
                      }
                    }}
                    className={`p-3 text-left border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0A2A22] bg-[#D8EEE3] shadow-[2px_2px_0_#0A2A22]'
                        : 'border-slate-300 bg-white hover:border-slate-400'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-[#0A2A22]">{p.name}</div>
                    <div className="font-mono text-xs font-semibold text-[#0A7B5B] mt-1">
                      {formatRp(p.price)}
                    </div>
                    <div className="text-[11px] text-[#46605A] mt-1 line-clamp-1">
                      Maks. {p.pagesLimit} hal · {p.freeCopies} buku
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Page count */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <label className="text-xs font-mono uppercase tracking-wider text-[#46605A] font-semibold">
                2. Estimasi Jumlah Halaman Isi
              </label>
              <span className="font-mono text-sm font-bold text-[#0A2A22]">
                {pageCount} Halaman
              </span>
            </div>
            <input
              type="range"
              min={40}
              max={400}
              step={10}
              value={pageCount}
              onChange={(e) => setPageCount(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0A7B5B]"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
              <span>40 hlm</span>
              <span>Batas Paket: {activePlan.pagesLimit} hlm</span>
              <span>400 hlm</span>
            </div>
            {extraPages > 0 && (
              <p className="text-xs text-[#0A7B5B] bg-[#D8EEE3] p-2 border border-[#0A7B5B]/30 mt-2">
                Memiliki {extraPages} halaman ekstra di luar kuota paket (+{formatRp(extraPageCost)}).
              </p>
            )}
          </div>

          {/* Step 3: Print copies */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <label className="text-xs font-mono uppercase tracking-wider text-[#46605A] font-semibold">
                3. Jumlah Cetak Buku Fisik
              </label>
              <span className="font-mono text-sm font-bold text-[#0A2A22]">
                {printCopies} Eksemplar
              </span>
            </div>
            <input
              type="range"
              min={activePlan.freeCopies}
              max={200}
              step={5}
              value={printCopies}
              onChange={(e) => setPrintCopies(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0A7B5B]"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
              <span>{activePlan.freeCopies} eks (Paket)</span>
              <span>50 eks</span>
              <span>100 eks</span>
              <span>200 eks</span>
            </div>
            {extraCopies > 0 && (
              <p className="text-xs text-[#46605A] mt-1.5">
                {activePlan.freeCopies} buku sudah termasuk paket + {extraCopies} eksemplar tambahan (~{formatRp(costPerCopy)}/buku).
              </p>
            )}
          </div>

          {/* Step 4: Paper Specs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#46605A] mb-1 font-semibold">
                Jenis Kertas
              </label>
              <select
                value={paperType}
                onChange={(e) => setPaperType(e.target.value as any)}
                className="w-full p-2 border-2 border-[#0A2A22] bg-white text-xs font-medium text-[#0A2A22]"
              >
                <option value="bookpaper">Bookpaper 72gr (Standar Novel/Buku Ajar)</option>
                <option value="hvs">HVS Putih 70gr</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#46605A] mb-1 font-semibold">
                Ukuran Buku
              </label>
              <select
                value={bookSize}
                onChange={(e) => setBookSize(e.target.value as any)}
                className="w-full p-2 border-2 border-[#0A2A22] bg-white text-xs font-medium text-[#0A2A22]"
              >
                <option value="unesco">UNESCO (15,5 × 23 cm) - Buku Ajar</option>
                <option value="a5">A5 (14 × 21 cm) - Novel / Modul</option>
              </select>
            </div>
          </div>

          {/* Step 5: Optional Add-ons */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#46605A] mb-2 font-semibold">
              Layanan Tambahan (Opsional)
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-2.5 border border-slate-200 hover:border-slate-300 cursor-pointer bg-slate-50/50">
                <input
                  type="checkbox"
                  checked={addCopyEditing}
                  onChange={(e) => setAddCopyEditing(e.target.checked)}
                  className="w-4 h-4 accent-[#0A7B5B]"
                />
                <div className="flex-1 text-xs">
                  <span className="font-semibold text-[#0A2A22]">Penyuntingan Naskah (Copy Editing)</span>
                  <p className="text-[#46605A]">Koreksi ejaan, tanda baca, tata bahasa baku (+Rp2.500/hlm)</p>
                </div>
                {addCopyEditing && (
                  <span className="font-mono text-xs font-semibold text-[#0A7B5B]">
                    +{formatRp(copyEditingCost)}
                  </span>
                )}
              </label>

              <label className="flex items-center gap-3 p-2.5 border border-slate-200 hover:border-slate-300 cursor-pointer bg-slate-50/50">
                <input
                  type="checkbox"
                  checked={addPromoMockup}
                  onChange={(e) => setAddPromoMockup(e.target.checked)}
                  className="w-4 h-4 accent-[#0A7B5B]"
                />
                <div className="flex-1 text-xs">
                  <span className="font-semibold text-[#0A2A22]">3D Book Mockup &amp; Promo Banner</span>
                  <p className="text-[#46605A]">Untuk media sosial, website, dan flyer digital (+Rp100.000)</p>
                </div>
                {addPromoMockup && (
                  <span className="font-mono text-xs font-semibold text-[#0A7B5B]">
                    +{formatRp(promoMockupCost)}
                  </span>
                )}
              </label>

              <label className="flex items-center gap-3 p-2.5 border border-slate-200 hover:border-slate-300 cursor-pointer bg-slate-50/50">
                <input
                  type="checkbox"
                  checked={addExpressLayout}
                  onChange={(e) => setAddExpressLayout(e.target.checked)}
                  className="w-4 h-4 accent-[#0A7B5B]"
                />
                <div className="flex-1 text-xs">
                  <span className="font-semibold text-[#0A2A22]">Layanan Express 3 Hari Kerja</span>
                  <p className="text-[#46605A]">Prioritas antrean pengerjaan layout &amp; sampul (+Rp200.000)</p>
                </div>
                {addExpressLayout && (
                  <span className="font-mono text-xs font-semibold text-[#0A7B5B]">
                    +{formatRp(expressLayoutCost)}
                  </span>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Right Cost Summary Card */}
        <div className="lg:col-span-5 bg-[#F2F7F4] border-2 border-[#0A2A22] p-5 sm:p-6 shadow-[4px_4px_0_#0A2A22] sticky top-24">
          <h3 className="font-display text-xl text-[#0A2A22] border-b border-[#0A2A22]/20 pb-2 mb-4">
            Rincian Estimasi Biaya
          </h3>

          <div className="space-y-2.5 text-xs text-[#0A2A22]">
            <div className="flex justify-between items-center py-1 border-b border-[#0A2A22]/10">
              <span className="text-[#46605A]">Biaya Dasar ({activePlan.name})</span>
              <span className="font-mono font-semibold">{formatRp(baseCost)}</span>
            </div>

            {extraPageCost > 0 && (
              <div className="flex justify-between items-center py-1 border-b border-[#0A2A22]/10">
                <span className="text-[#46605A]">Halaman Ekstra ({extraPages} hlm)</span>
                <span className="font-mono font-semibold">+{formatRp(extraPageCost)}</span>
              </div>
            )}

            {printCopiesCost > 0 && (
              <div className="flex justify-between items-center py-1 border-b border-[#0A2A22]/10">
                <span className="text-[#46605A]">Cetak Ekstra ({extraCopies} eks)</span>
                <span className="font-mono font-semibold">+{formatRp(printCopiesCost)}</span>
              </div>
            )}

            {copyEditingCost > 0 && (
              <div className="flex justify-between items-center py-1 border-b border-[#0A2A22]/10">
                <span className="text-[#46605A]">Copy Editing</span>
                <span className="font-mono font-semibold">+{formatRp(copyEditingCost)}</span>
              </div>
            )}

            {promoMockupCost > 0 && (
              <div className="flex justify-between items-center py-1 border-b border-[#0A2A22]/10">
                <span className="text-[#46605A]">Mockup 3D &amp; Banner</span>
                <span className="font-mono font-semibold">+{formatRp(promoMockupCost)}</span>
              </div>
            )}

            {expressLayoutCost > 0 && (
              <div className="flex justify-between items-center py-1 border-b border-[#0A2A22]/10">
                <span className="text-[#46605A]">Layanan Express</span>
                <span className="font-mono font-semibold">+{formatRp(expressLayoutCost)}</span>
              </div>
            )}

            <div className="pt-3 mt-2 border-t-2 border-[#0A2A22]">
              <div className="text-xs uppercase font-mono tracking-wider text-[#46605A]">
                Total Estimasi Investasi
              </div>
              <div className="font-display text-3xl text-[#0A7B5B] mt-1 font-bold">
                {formatRp(totalEstimatedCost)}
              </div>
              <p className="text-[11px] text-[#46605A] mt-1">
                *Sudah termasuk pengurusan ISBN resmi &amp; barcode Perpusnas. Belum termasuk ongkos kirim.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <a
              href={buildWaUrl(consultationMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press w-full py-3 px-4 bg-[#0A7B5B] text-white hover:bg-[#07553F] text-xs sm:text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Konsultasikan via WhatsApp</span>
            </a>
            {onOpenConsultation && (
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full py-2.5 px-4 bg-white hover:bg-[#D8EEE3] text-[#0A2A22] border-2 border-[#0A2A22] text-xs font-mono font-semibold cursor-pointer"
              >
                Isi Formulir Penelaahan Naskah
              </button>
            )}
            <p className="text-center text-[10px] text-[#46605A] font-mono">
              Admin Qissah Publishing siap merespons setiap hari kerja
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
