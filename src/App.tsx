import React, { useState, useEffect, useMemo } from 'react';
import {
  COMPANY,
  PLANS,
  BOOKS,
  ADVANTAGES,
  STEPS,
  TESTIMONIALS,
  FAQS,
  Book,
  calculateEan13,
  formatIsbn,
} from './data/publishingData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookCover, HeroBookPlate, BarcodeSvg } from './components/BookCover';
import { CostCalculator } from './components/CostCalculator';
import { ConsultationModal } from './components/ConsultationModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { LegalLightbox } from './components/LegalLightbox';
import {
  CheckCircle2,
  ArrowRight,
  Search,
  BookOpen,
  ShoppingBag,
  Sparkles,
  FileCheck,
  ChevronDown,
  ChevronUp,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Building2,
  BookmarkCheck,
  Users,
  Feather,
  Plus,
  Minus,
  Check,
  X,
  Clock,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'toko-buku' | 'kalkulator' | 'tentang-kami' | 'buku'>('home');
  const [selectedBookId, setSelectedBookId] = useState<string>('metodologi');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isLegalLightboxOpen, setIsLegalLightboxOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Store filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'title'>('popular');

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Book detail purchase quantity
  const [detailQty, setDetailQty] = useState(1);

  // Handle Hash routing for shareable links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('buku-')) {
        const bId = hash.replace('buku-', '');
        if (BOOKS.some((b) => b.id === bId)) {
          setSelectedBookId(bId);
          setActiveTab('buku');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      if (['home', 'toko-buku', 'kalkulator', 'tentang-kami'].includes(hash)) {
        setActiveTab(hash as any);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (tab: string, bookId?: string) => {
    if (tab === 'buku' && bookId) {
      setSelectedBookId(bookId);
      window.location.hash = `buku-${bookId}`;
      setDetailQty(1);
    } else {
      window.location.hash = tab;
    }
    if (['home', 'toko-buku', 'kalkulator', 'tentang-kami', 'buku'].includes(tab)) {
      setActiveTab(tab as any);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart operations
  const handleAddToCart = (book: Book, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity }];
    });
    showToast(`"${book.title}" (${quantity} eks) berhasil ditambahkan ke keranjang.`);
  };

  const handleUpdateCartQuantity = (bookId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.book.id === bookId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (bookId: string) => {
    setCartItems((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Selected book for detail view
  const currentBook = useMemo(() => {
    return BOOKS.find((b) => b.id === selectedBookId) || BOOKS[0];
  }, [selectedBookId]);

  // Categories list for store
  const categories = useMemo(() => {
    const set = new Set(BOOKS.map((b) => b.category));
    return ['Semua', ...Array.from(set)];
  }, []);

  // Filtered & sorted books for store
  const filteredBooks = useMemo(() => {
    return BOOKS.filter((b) => {
      const matchCat = selectedCategory === 'Semua' || b.category === selectedCategory;
      const matchSearch =
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.isbn.includes(searchQuery);
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, sortBy]);

  // Direct WhatsApp purchase for detail view
  const handleDirectBuyWA = (book: Book, qty: number) => {
    const total = book.price * qty;
    const msg = `Halo Redaksi Qissah Publishing, saya ingin memesan buku berikut:\n\n*Judul:* ${book.title}\n*Penulis:* ${book.author}\n*ISBN:* ${formatIsbn(book.isbn)}\n*Jumlah:* ${qty} eksemplar\n*Total Harga Buku:* Rp ${total.toLocaleString('id-ID')}\n\nMohon info ketersediaan stok fisik dan estimasi ongkir ke alamat saya. Terima kasih!`;
    const url = `https://wa.me/${COMPANY.waNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#F2F7F4] text-emerald-950 flex flex-col font-sans antialiased selection:bg-amber-300 selection:text-emerald-950">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3 border-2 border-emerald-950 shadow-[4px_4px_0_#0A2A22] flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-emerald-300 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <Header
        currentTab={activeTab}
        cartCount={totalCartCount}
        onNavigate={navigateTo}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <div>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 to-emerald-950 text-white py-16 lg:py-24 border-b-4 border-emerald-900">
              {/* Background ambient texture */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #F5CB45 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
                }}
              />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Left Column: Headline & Actions */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 border border-emerald-700 text-amber-300 text-xs font-mono font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Penerbit Berizin Resmi</span>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-white font-bold leading-[1.15] tracking-tight">
                      Terbitkan Karya Anda dengan{' '}
                      <span className="text-amber-300 underline decoration-amber-400/50 decoration-wavy underline-offset-4">
                        ISBN Resmi
                      </span>{' '}
                      dan Biaya{' '}
                      <span className="text-amber-300 underline decoration-amber-400/50 decoration-wavy underline-offset-4">
                        Murah
                      </span>.
                    </h1>

                    <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl font-light">
                      Qissah Publishing mendampingi dosen, peneliti, sastrawan, dan penulis komunitas dari naskah mentah hingga menjadi buku fisik ber-ISBN Perpustakaan Nasional dengan cetakan presisi tinggi.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsConsultationOpen(true)}
                        className="btn-press px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm tracking-wide inline-flex items-center justify-center gap-2 border-2 border-emerald-950 cursor-pointer"
                      >
                        <FileCheck className="w-4 h-4 text-emerald-950" />
                        Konsultasi Naskah Gratis
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById('paket-penerbitan');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-6 py-3.5 bg-emerald-800/90 hover:bg-emerald-800 text-white font-medium text-sm border border-emerald-600 inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        Lihat Pilihan Paket
                        <ArrowRight className="w-4 h-4 text-emerald-300" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateTo('kalkulator')}
                        className="px-4 py-3.5 text-xs font-mono text-emerald-200 hover:text-white underline underline-offset-4 inline-flex items-center justify-center cursor-pointer"
                      >
                        Kalkulator Biaya Cetak →
                      </button>
                    </div>

                    {/* Stats strip */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-800/80">
                      <div>
                        <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                          25+
                        </div>
                        <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider mt-0.5">
                          Draft Judul Buku
                        </div>
                      </div>
                      <div>
                        <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                          100%
                        </div>
                        <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider mt-0.5">
                          ISBN Resmi Perpusnas
                        </div>
                      </div>
                      <div>
                        <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                          5-7 Hari
                        </div>
                        <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider mt-0.5">
                          Waktu Proses Cepat
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Hero Book Print Plate */}
                  <div className="lg:col-span-5 flex justify-center">
                    <HeroBookPlate onInspect={() => navigateTo('buku', 'metodologi')} />
                  </div>
                </div>
              </div>
            </section>

            {/* KEUNGGULAN / 6 BENEFIT CARDS */}
            <section className="py-20 bg-[#F2F7F4] border-b-2 border-emerald-900/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-800">
                    Standar Redaksi & Percetakan
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-emerald-950 font-bold mt-2">
                    Mengapa Memilih Menerbitkan di Qissah?
                  </h2>
                  <p className="mt-3 text-emerald-800 text-sm sm:text-base">
                    Kami menjaga kemurnian ide penulis dengan sentuhan artistik penataan aksara yang rapi, legalitas resmi, dan kebebasan hak cipta penuh.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ADVANTAGES.map((adv) => (
                    <div
                      key={adv.id}
                      className="bg-white p-7 border-2 border-emerald-950 shadow-[4px_4px_0_#0A2A22] flex flex-col justify-between hover:-translate-y-0.5 transition-transform"
                    >
                      <div>
                        <div className="w-10 h-10 bg-emerald-100 border border-emerald-900 flex items-center justify-center font-mono font-bold text-emerald-900 text-xs mb-4">
                          {adv.badge}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-emerald-950 mb-2">
                          {adv.title}
                        </h3>
                        <p className="text-sm text-emerald-800/90 leading-relaxed">
                          {adv.description}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center text-xs font-mono text-emerald-700">
                        <Check className="w-4 h-4 text-emerald-600 mr-1.5" />
                        <span>Jaminan Standar Mutu Redaksi</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ALUR PENERBITAN (5 STEPS) */}
            <section className="py-20 bg-white border-b-2 border-emerald-900/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-14">
                  <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-800">
                    Transparan & Terstruktur
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-emerald-950 font-bold mt-2">
                    5 Langkah Mudah Menerbitkan Buku
                  </h2>
                  <p className="mt-3 text-emerald-800 text-sm">
                    Dari naskah di laptop Anda hingga menjadi buku cetak ber-ISBN yang siap diedarkan ke pembaca.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {STEPS.map((step) => (
                    <div
                      key={step.step}
                      className="bg-[#F2F7F4] p-5 border-2 border-emerald-950 shadow-[3px_3px_0_#0A2A22] flex flex-col justify-between relative"
                    >
                      <div>
                        <span className="font-mono text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 border border-amber-300 inline-block mb-3">
                          Langkah {step.step}
                        </span>
                        <h3 className="font-serif text-base font-bold text-emerald-950 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-xs text-emerald-800 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-emerald-200/60 font-mono text-[11px] text-emerald-700 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>Alur resmi Perpustakaan Nasional</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <button
                    type="button"
                    onClick={() => setIsConsultationOpen(true)}
                    className="btn-press px-6 py-3 bg-emerald-900 text-white font-bold text-sm border-2 border-emerald-950 inline-flex items-center gap-2 cursor-pointer"
                  >
                    Kirim Draf Naskah untuk Ditinjau Redaksi
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                </div>
              </div>
            </section>

            {/* PAKET PENERBITAN */}
            <section id="paket-penerbitan" className="py-20 bg-[#F2F7F4] border-b-2 border-emerald-900/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-800">
                    Investasi Transparan
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-emerald-950 font-bold mt-2">
                    Pilihan Paket Penerbitan Ber-ISBN
                  </h2>
                  <p className="mt-3 text-emerald-800 text-sm sm:text-base">
                    Pilih paket yang paling sesuai dengan kesiapan naskah dan kebutuhan cetak Anda. Biaya cetak tambahan dapat dihitung terpisah secara fleksibel.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                  {PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative bg-white border-2 border-emerald-950 flex flex-col justify-between p-8 transition-transform ${
                        plan.popular
                          ? 'shadow-[6px_6px_0_#0A2A22] ring-2 ring-emerald-800 -translate-y-1'
                          : 'shadow-[4px_4px_0_#0A2A22]'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-emerald-950 font-mono text-xs font-bold px-3 py-1 border border-emerald-950 shadow-sm uppercase tracking-wider">
                          Paling Banyak Dipilih
                        </div>
                      )}

                      <div>
                        <div className="border-b border-emerald-100 pb-5 mb-5">
                          <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                            {plan.name}
                          </span>
                          <div className="flex items-baseline gap-1 mt-2">
                            <span className="font-mono text-sm text-emerald-800">Rp</span>
                            <span className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
                              {plan.price.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-emerald-700 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>

                        {/* Features list */}
                        <div className="space-y-3 mb-8">
                          <span className="text-xs font-mono uppercase tracking-wider text-emerald-900 font-bold block mb-2">
                            Layanan yang Didapat:
                          </span>
                          {plan.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-emerald-900">
                              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-emerald-100">
                        <a
                          href={plan.waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`btn-press w-full py-3 font-bold text-sm text-center border-2 border-emerald-950 flex items-center justify-center gap-2 cursor-pointer ${
                            plan.popular
                              ? 'bg-amber-400 hover:bg-amber-300 text-emerald-950'
                              : 'bg-emerald-900 hover:bg-emerald-800 text-white'
                          }`}
                        >
                          Pilih {plan.name} via WhatsApp
                          <ArrowRight className="w-4 h-4" />
                        </a>
                        <p className="text-[11px] font-mono text-center text-emerald-700">
                          Termasuk 100% Royalti & Hak Cipta Penulis
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom print calculator callout */}
                <div className="mt-12 bg-emerald-900 text-white p-6 sm:p-8 border-2 border-emerald-950 shadow-[4px_4px_0_#0A2A22] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      Butuh Cetak Banyak (50, 100, hingga 1.000+ Eksemplar)?
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                      Gunakan kalkulator biaya interaktif kami untuk simulasi harga kertas Bookpaper, HVS, doff/glossy, dan ukuran cetak secara akurat.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('kalkulator')}
                    className="btn-press px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs uppercase tracking-wider font-mono border-2 border-emerald-950 shrink-0 cursor-pointer"
                  >
                    Buka Kalkulator Biaya →
                  </button>
                </div>
              </div>
            </section>

            {/* BUKU POPULER / SHELF */}
            <section className="py-20 bg-white border-b-2 border-emerald-900/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                  <div>
                    <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-800">
                      Koleksi Terbitan Pilihan
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-emerald-950 font-bold mt-2">
                      Buku Terbaru dari Penulis Kami
                    </h2>
                    <p className="mt-2 text-emerald-800 text-sm">
                      Semua buku telah memiliki ISBN resmi dan disimpan di Perpustakaan Nasional RI & Dinas Arsip.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('toko-buku')}
                    className="text-xs font-mono font-bold text-emerald-900 hover:text-emerald-700 underline underline-offset-4 flex items-center gap-1 cursor-pointer self-start md:self-auto"
                  >
                    Lihat Semua di Toko Buku ({BOOKS.length} Judul) →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {BOOKS.slice(0, 4).map((book) => (
                    <div
                      key={book.id}
                      className="bg-[#F2F7F4] border-2 border-emerald-950 shadow-[4px_4px_0_#0A2A22] flex flex-col justify-between overflow-hidden group"
                    >
                      <div className="p-4 bg-emerald-900/5 flex justify-center border-b border-emerald-900/10">
                        <div
                          onClick={() => navigateTo('buku', book.id)}
                          className="cursor-pointer transition-transform group-hover:scale-102"
                        >
                          <BookCover book={book} width={170} height={240} />
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-700 mb-1">
                            <span>{book.category}</span>
                            <span>{book.year}</span>
                          </div>
                          <h3
                            onClick={() => navigateTo('buku', book.id)}
                            className="font-serif text-base font-bold text-emerald-950 hover:text-emerald-700 line-clamp-2 cursor-pointer leading-snug"
                          >
                            {book.title}
                          </h3>
                          <p className="text-xs text-emerald-800 mt-1">
                            Oleh: <span className="font-medium">{book.author}</span>
                          </p>
                          <p className="text-[11px] font-mono text-emerald-600 mt-1">
                            ISBN: {formatIsbn(book.isbn)}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-emerald-200">
                          <div className="flex items-baseline justify-between mb-3">
                            <span className="text-[11px] font-mono text-emerald-700">Harga Buku:</span>
                            <span className="font-serif text-lg font-bold text-emerald-950">
                              Rp {book.price.toLocaleString('id-ID')}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => navigateTo('buku', book.id)}
                              className="px-2 py-2 bg-white hover:bg-emerald-50 text-emerald-950 text-xs font-mono font-medium border border-emerald-950 text-center cursor-pointer"
                            >
                              Rincian
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddToCart(book, 1)}
                              className="btn-press px-2 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-mono font-bold border border-emerald-950 text-center flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              Beli
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TESTIMONI PENULIS */}
            <section className="py-20 bg-[#F2F7F4] border-b-2 border-emerald-900/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-14">
                  <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-800">
                    Kata Mereka
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-emerald-950 font-bold mt-2">
                    Pengalaman Para Penulis & Akademisi
                  </h2>
                  <p className="mt-3 text-emerald-800 text-sm">
                    Kepercayaan para dosen perguruan tinggi, peneliti, dan pegiat literasi komunitas dalam mewujudkan buku impian mereka.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS.map((testi) => (
                    <div
                      key={testi.id}
                      className="bg-white p-7 border-2 border-emerald-950 shadow-[4px_4px_0_#0A2A22] flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="font-serif text-3xl text-amber-500 font-bold">“</div>
                        <p className="text-sm text-emerald-900 leading-relaxed italic">
                          {testi.quote}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-emerald-100">
                        <h4 className="font-serif text-base font-bold text-emerald-950">
                          {testi.author}
                        </h4>
                        <p className="text-xs text-emerald-700 font-medium">
                          {testi.role}
                        </p>
                        <span className="inline-block mt-2 font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                          Buku: {testi.bookTitle}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ SECTION */}
            <section id="faq-section" className="py-20 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-800">
                    Pusat Informasi
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-emerald-950 font-bold mt-2">
                    Pertanyaan Seputar Penerbitan Buku
                  </h2>
                  <p className="mt-2 text-emerald-800 text-sm">
                    Pertanyaan umum mengenai ISBN resmi, royalti, hak cipta, dan proses percetakan.
                  </p>
                </div>

                <div className="space-y-3">
                  {FAQS.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div
                        key={index}
                        className="border-2 border-emerald-950 bg-[#F2F7F4] transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-emerald-950 cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-emerald-700 shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-emerald-700 shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-5 pt-1 text-sm text-emerald-900 border-t border-emerald-900/10 leading-relaxed font-sans">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 text-center p-6 bg-emerald-50 border border-emerald-200">
                  <p className="text-sm text-emerald-900 font-medium">
                    Punya pertanyaan lain yang belum tercantum di atas?
                  </p>
                  <a
                    href={COMPANY.waConsultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-xs font-mono font-bold text-emerald-900 hover:text-emerald-700 underline"
                  >
                    Tanyakan langsung ke Redaksi via WhatsApp: {COMPANY.phone} →
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW: TOKO BUKU (CATALOG) */}
        {activeTab === 'toko-buku' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header bar */}
              <div className="border-b-2 border-emerald-950 pb-8 mb-8">
                <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-800">
                  Katalog Terbitan Resmi
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-emerald-950 font-bold mt-2">
                  Toko Buku Qissah Publishing
                </h1>
                <p className="mt-2 text-emerald-800 text-sm max-w-2xl">
                  Buku karya sastra, monograf akademik, kajian sains, dan antologi ber-ISBN resmi Perpustakaan Nasional. Siap dikirim ke seluruh Indonesia.
                </p>

                {/* Search & Sort Filters */}
                <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  {/* Search box */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari judul buku, nama penulis, atau ISBN..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-emerald-950 text-sm font-sans placeholder:text-emerald-600/60 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-emerald-600 hover:text-emerald-950"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  {/* Sort select */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-800 uppercase">Urutkan:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-white border-2 border-emerald-950 px-3 py-2 text-xs font-mono text-emerald-950 focus:outline-none"
                    >
                      <option value="popular">Buku Pilihan / Terpopuler</option>
                      <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                      <option value="price-desc">Harga: Tertinggi ke Terendah</option>
                      <option value="title">Judul Buku (A - Z)</option>
                    </select>
                  </div>
                </div>

                {/* Category tab buttons */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 text-xs font-mono border border-emerald-950 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-900 text-white font-bold'
                            : 'bg-white hover:bg-emerald-100 text-emerald-950'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Book Grid */}
              {filteredBooks.length === 0 ? (
                <div className="text-center py-20 bg-white border-2 border-emerald-950 p-8">
                  <BookOpen className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold text-emerald-950">
                    Tidak ada buku yang cocok dengan pencarian
                  </h3>
                  <p className="text-sm text-emerald-700 mt-1">
                    Coba kata kunci lain atau pilih kategori "Semua".
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Semua');
                    }}
                    className="mt-4 px-4 py-2 bg-emerald-900 text-white text-xs font-mono font-bold cursor-pointer"
                  >
                    Reset Pencarian
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredBooks.map((book) => (
                    <div
                      key={book.id}
                      className="bg-white border-2 border-emerald-950 shadow-[4px_4px_0_#0A2A22] flex flex-col justify-between overflow-hidden group hover:-translate-y-0.5 transition-transform"
                    >
                      {/* Cover container */}
                      <div className="p-4 bg-emerald-50/50 flex justify-center border-b border-emerald-900/10 relative">
                        {book.featured && (
                          <span className="absolute top-2 left-2 bg-amber-400 text-emerald-950 text-[10px] font-mono font-bold px-2 py-0.5 border border-emerald-950">
                            PILIHAN
                          </span>
                        )}
                        <div
                          onClick={() => navigateTo('buku', book.id)}
                          className="cursor-pointer transition-transform group-hover:scale-102"
                        >
                          <BookCover book={book} width={180} height={250} />
                        </div>
                      </div>

                      {/* Info & Buy module */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-700 mb-1">
                            <span>{book.category}</span>
                            <span>{book.year}</span>
                          </div>
                          <h3
                            onClick={() => navigateTo('buku', book.id)}
                            className="font-serif text-base font-bold text-emerald-950 hover:text-emerald-700 cursor-pointer line-clamp-2 leading-snug"
                          >
                            {book.title}
                          </h3>
                          <p className="text-xs text-emerald-800 mt-1">
                            Penulis: <span className="font-medium">{book.author}</span>
                          </p>
                          <p className="text-[11px] font-mono text-emerald-600 mt-1">
                            ISBN: {formatIsbn(book.isbn)}
                          </p>

                          <p className="text-xs text-emerald-800/80 mt-2 line-clamp-2">
                            {book.synopsis}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-emerald-100">
                          <div className="flex items-baseline justify-between mb-3">
                            <span className="text-[11px] font-mono text-emerald-700">Harga:</span>
                            <span className="font-serif text-xl font-bold text-emerald-950">
                              Rp {book.price.toLocaleString('id-ID')}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => navigateTo('buku', book.id)}
                              className="px-2 py-2 bg-white hover:bg-emerald-50 text-emerald-950 text-xs font-mono font-medium border border-emerald-950 text-center cursor-pointer"
                            >
                              Rincian
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddToCart(book, 1)}
                              className="btn-press px-2 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-mono font-bold border border-emerald-950 text-center flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              Beli
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* VIEW: DETAIL BUKU (PDP) */}
        {activeTab === 'buku' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 mb-8">
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="hover:underline cursor-pointer"
                >
                  Beranda
                </button>
                <span>/</span>
                <button
                  type="button"
                  onClick={() => navigateTo('toko-buku')}
                  className="hover:underline cursor-pointer"
                >
                  Toko Buku
                </button>
                <span>/</span>
                <span className="text-emerald-950 font-bold truncate max-w-xs sm:max-w-md">
                  {currentBook.title}
                </span>
              </div>

              {/* Main Product Card */}
              <div className="bg-white border-2 border-emerald-950 shadow-[6px_6px_0_#0A2A22] p-6 sm:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Left Column: Big Cover & Barcode Plate */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    <div className="bg-[#F2F7F4] p-6 border-2 border-emerald-950 shadow-[4px_4px_0_#0A2A22] w-full flex flex-col items-center">
                      <BookCover book={currentBook} width={260} height={370} />

                      {/* Real Barcode plate */}
                      <div className="mt-6 w-full pt-4 border-t border-emerald-900/10 flex flex-col items-center">
                        <BarcodeSvg isbn={currentBook.isbn} width={220} height={70} />
                        <span className="text-[11px] font-mono text-emerald-700 mt-2">
                          Barcode Resmi EAN-13: {calculateEan13(currentBook.isbn).full}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <span className="text-xs font-mono text-emerald-700">
                        Penerbit Resmi: {COMPANY.legalName}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Book Details & Purchase Module */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 border border-emerald-300">
                          {currentBook.category}
                        </span>
                        <span className="font-mono text-xs text-emerald-700">
                          Tahun Terbit: {currentBook.year}
                        </span>
                      </div>

                      <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-950 leading-tight">
                        {currentBook.title}
                      </h1>

                      <p className="text-sm sm:text-base text-emerald-800 mt-2">
                        Penulis:{' '}
                        <span className="font-semibold text-emerald-950">
                          {currentBook.author}
                        </span>
                      </p>
                    </div>

                    {/* Price tag */}
                    <div className="bg-emerald-50 p-4 border border-emerald-200 flex items-baseline gap-3">
                      <span className="text-xs font-mono text-emerald-700 uppercase">
                        Harga Resmi Buku:
                      </span>
                      <span className="font-serif text-3xl font-bold text-emerald-950">
                        Rp {currentBook.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs font-mono text-emerald-600">
                        (Termasuk Royalti Penulis)
                      </span>
                    </div>

                    {/* Synopsis */}
                    <div>
                      <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-emerald-800 mb-2">
                        Sinopsis Buku:
                      </h3>
                      <p className="text-sm text-emerald-900 leading-relaxed font-sans">
                        {currentBook.synopsis}
                      </p>
                    </div>

                    {/* Metadata Specification Table */}
                    <div>
                      <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-emerald-800 mb-2">
                        Spesifikasi Fisik & Bibliografi:
                      </h3>
                      <div className="border border-emerald-950 overflow-hidden text-xs font-mono">
                        <div className="grid grid-cols-2 divide-x divide-emerald-950 border-b border-emerald-950 bg-emerald-100/60 p-2 font-bold">
                          <span>Karakteristik</span>
                          <span>Keterangan Redaksi</span>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-emerald-950 border-b border-emerald-200 p-2">
                          <span className="text-emerald-700">ISBN Resmi</span>
                          <span className="font-bold text-emerald-950">{formatIsbn(currentBook.isbn)}</span>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-emerald-950 border-b border-emerald-200 p-2 bg-emerald-50/40">
                          <span className="text-emerald-700">Jumlah Halaman</span>
                          <span>{currentBook.pages} Halaman (Isi)</span>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-emerald-950 border-b border-emerald-200 p-2">
                          <span className="text-emerald-700">Dimensi / Ukuran</span>
                          <span>{currentBook.dimensions}</span>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-emerald-950 border-b border-emerald-200 p-2 bg-emerald-50/40">
                          <span className="text-emerald-700">Kertas Isi</span>
                          <span>{currentBook.paper}</span>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-emerald-950 border-b border-emerald-200 p-2">
                          <span className="text-emerald-700">Sampul (Cover)</span>
                          <span>{currentBook.cover}</span>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-emerald-950 border-b border-emerald-200 p-2 bg-emerald-50/40">
                          <span className="text-emerald-700">Editor Naskah</span>
                          <span>{currentBook.editor}</span>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-emerald-950 p-2">
                          <span className="text-emerald-700">Penata Letak</span>
                          <span>{currentBook.layout}</span>
                        </div>
                      </div>
                    </div>

                    {/* CONTIGUOUS PURCHASE MODULE */}
                    <div className="bg-[#F2F7F4] p-5 border-2 border-emerald-950 shadow-[3px_3px_0_#0A2A22] space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-emerald-900 font-bold uppercase">
                          Jumlah Eksemplar:
                        </span>
                        <div className="flex items-center border-2 border-emerald-950 bg-white">
                          <button
                            type="button"
                            onClick={() => setDetailQty((prev) => Math.max(1, prev - 1))}
                            className="p-2 hover:bg-emerald-100 text-emerald-950 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-4 py-1 text-sm font-mono font-bold text-emerald-950 min-w-[40px] text-center">
                            {detailQty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setDetailQty((prev) => prev + 1)}
                            className="p-2 hover:bg-emerald-100 text-emerald-950 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs font-mono text-emerald-700">
                          Subtotal: Rp {(currentBook.price * detailQty).toLocaleString('id-ID')}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(currentBook, detailQty)}
                          className="btn-press py-3 bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs uppercase tracking-wider font-mono border-2 border-emerald-950 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4 text-emerald-800" />
                          Masukkan Keranjang
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDirectBuyWA(currentBook, detailQty)}
                          className="btn-press py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs uppercase tracking-wider font-mono border-2 border-emerald-950 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Pesan Langsung via WA
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] font-mono text-emerald-700 text-center">
                        Pengiriman cepat dari Bogor Barat via JNE/J&T/Wahana/SiCepat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Books Shelf */}
              <div className="mt-16">
                <h3 className="font-serif text-2xl font-bold text-emerald-950 mb-6">
                  Buku Pilihan Lainnya
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {BOOKS.filter((b) => b.id !== currentBook.id)
                    .slice(0, 4)
                    .map((otherBook) => (
                      <div
                        key={otherBook.id}
                        className="bg-white border-2 border-emerald-950 shadow-[3px_3px_0_#0A2A22] p-4 flex flex-col justify-between"
                      >
                        <div
                          onClick={() => navigateTo('buku', otherBook.id)}
                          className="cursor-pointer flex justify-center mb-3"
                        >
                          <BookCover book={otherBook} width={140} height={200} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-emerald-700">
                            {otherBook.category}
                          </span>
                          <h4
                            onClick={() => navigateTo('buku', otherBook.id)}
                            className="font-serif text-sm font-bold text-emerald-950 line-clamp-1 hover:underline cursor-pointer"
                          >
                            {otherBook.title}
                          </h4>
                          <p className="text-xs text-emerald-800">
                            {otherBook.author}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-emerald-100 flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-emerald-950">
                            Rp {otherBook.price.toLocaleString('id-ID')}
                          </span>
                          <button
                            type="button"
                            onClick={() => navigateTo('buku', otherBook.id)}
                            className="text-xs font-mono text-emerald-700 hover:text-emerald-950 underline cursor-pointer"
                          >
                            Lihat →
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VIEW: KALKULATOR BIAYA */}
        {activeTab === 'kalkulator' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <CostCalculator onOpenConsultation={() => setIsConsultationOpen(true)} />
            </div>
          </section>
        )}

        {/* VIEW: TENTANG KAMI & LEGALITAS */}
        {activeTab === 'tentang-kami' && (
          <section className="py-12 sm:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              {/* Profile Intro */}
              <div className="bg-white border-2 border-emerald-950 shadow-[6px_6px_0_#0A2A22] p-8 sm:p-12">
                <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-800">
                  Profil Penerbit
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-emerald-950 font-bold mt-2">
                  PT Qissah Global Nusantara
                </h1>
                <p className="font-mono text-xs text-emerald-700 mt-1">
                  Penerbitan Buku Berstandar ISBN Resmi & Layanan Percetakan Modern di Bogor
                </p>

                <div className="mt-6 text-sm sm:text-base text-emerald-900 leading-relaxed space-y-4 font-sans">
                  <p>
                    <strong>Qissah Publishing</strong> lahir dari komitmen mendalam untuk menghidupkan ekosistem perbukuan Indonesia yang bermartabat. Berkedudukan di Bogor Barat, kami melayani penerbitan karya sastra, monograf akademik, buku ajar perguruan tinggi, antologi puisi, memoar inspiratif, hingga buku saku komunitas dengan standar redaksi yang ketat dan estetika perwajahan yang memikat.
                  </p>
                  <p>
                    Sebagai bagian dari <strong>PT Qissah Global Nusantara</strong>, kami terdaftar resmi dalam Klasifikasi Baku Lapangan Usaha Indonesia (KBLI) 58110 untuk Aktivitas Penerbitan Buku. Setiap naskah yang diterbitkan melalui Qissah diproses secara sah melalui Perpustakaan Nasional Republik Indonesia (Perpusnas) dengan kepemilikan barcode EAN-13 berstandar internasional.
                  </p>
                </div>

                {/* Visi & Misi */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t-2 border-emerald-950">
                  <div className="bg-[#F2F7F4] p-6 border-2 border-emerald-950">
                    <h3 className="font-serif text-lg font-bold text-emerald-950 mb-2">
                      Visi Kami
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                      Menjadi rumah penerbitan independen yang terdepan dalam mengangkat karya intelektual dan sastra nusantara menjadi pustaka yang abadi, indah, dan mudah diakses oleh pembaca global.
                    </p>
                  </div>
                  <div className="bg-[#F2F7F4] p-6 border-2 border-emerald-950">
                    <h3 className="font-serif text-lg font-bold text-emerald-950 mb-2">
                      Misi Kami
                    </h3>
                    <ul className="text-xs sm:text-sm text-emerald-900 space-y-2 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>Menyediakan jalur penerbitan ber-ISBN resmi yang cepat, transparan, dan terjangkau bagi semua kalangan.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>Menjaga hak cipta dan royalti penuh bagi penulis tanpa ikatan eksklusif yang membatasi.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>Menerapkan standar tipografi dan tata letak buku bertaraf internasional.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 3 Nilai Utama */}
                <div className="mt-10 pt-8 border-t border-emerald-200">
                  <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-emerald-800 mb-4">
                    3 Prinsip Fundamental Kami:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-emerald-50 border border-emerald-200">
                      <BookmarkCheck className="w-6 h-6 text-emerald-700 mb-2" />
                      <h4 className="font-serif text-sm font-bold text-emerald-950">
                        Integritas Ilmiah & Sastra
                      </h4>
                      <p className="text-xs text-emerald-800 mt-1">
                        Pemeriksaan keaslian, pencegahan plagiarisme, dan pembinaan editorial secara cermat.
                      </p>
                    </div>
                    <div className="p-4 bg-emerald-50 border border-emerald-200">
                      <Feather className="w-6 h-6 text-emerald-700 mb-2" />
                      <h4 className="font-serif text-sm font-bold text-emerald-950">
                        Estetika Perwajahan
                      </h4>
                      <p className="text-xs text-emerald-800 mt-1">
                        Desain sampul unik yang mencerminkan esensi cerita tanpa templat instan yang seragam.
                      </p>
                    </div>
                    <div className="p-4 bg-emerald-50 border border-emerald-200">
                      <Users className="w-6 h-6 text-emerald-700 mb-2" />
                      <h4 className="font-serif text-sm font-bold text-emerald-950">
                        Kemitraan Sejati
                      </h4>
                      <p className="text-xs text-emerald-800 mt-1">
                        Penulis memegang 100% hak cipta atas naskahnya dan bebas mencetak ulang kapan saja.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legalitas Card with Lightbox Button */}
              <div className="bg-white border-2 border-emerald-950 shadow-[6px_6px_0_#0A2A22] p-8 sm:p-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b-2 border-emerald-950">
                  <div>
                    <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-800">
                      Legalitas Perusahaan Resmi
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 mt-1">
                      Sertifikat Standar KBLI 58110
                    </h2>
                    <p className="text-xs font-mono text-emerald-700 mt-1">
                      Aktivitas Penerbitan Buku • Pemerintah Republik Indonesia
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsLegalLightboxOpen(true)}
                    className="btn-press px-5 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs font-mono uppercase border-2 border-emerald-950 inline-flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-950" />
                    Buka Sertifikat Lengkap
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div
                    onClick={() => setIsLegalLightboxOpen(true)}
                    className="md:col-span-5 cursor-pointer group bg-emerald-50 p-3 border-2 border-emerald-950 shadow-[3px_3px_0_#0A2A22]"
                  >
                    <div className="relative overflow-hidden border border-emerald-200">
                      <img
                        src="/images/legal-certificate.webp"
                        alt="Sertifikat Standar KBLI 58110 PT Qissah Global Nusantara"
                        className="w-full h-auto object-cover group-hover:scale-102 transition-transform"
                      />
                      <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 bg-emerald-950 text-white text-xs font-mono font-bold">
                          Klik untuk Perbesar
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-center text-emerald-700 mt-2">
                      Dokumen Resmi OSS Lembaga Pemerintah
                    </p>
                  </div>

                  <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-emerald-900 font-sans">
                    <p>
                      Sertifikat Standar ini diterbitkan oleh Sistem Perizinan Berusaha Terintegrasi Secara Elektronik (Online Single Submission / OSS) berdasarkan ketentuan perundang-undangan Republik Indonesia.
                    </p>
                    <div className="space-y-2 bg-[#F2F7F4] p-4 border border-emerald-200 font-mono text-xs">
                      <div className="flex justify-between border-b border-emerald-200 pb-1.5">
                        <span className="text-emerald-700">Nama Badan Hukum:</span>
                        <span className="font-bold text-emerald-950">PT Qissah Global Nusantara</span>
                      </div>
                      <div className="flex justify-between border-b border-emerald-200 pb-1.5">
                        <span className="text-emerald-700">Kode KBLI:</span>
                        <span className="font-bold text-emerald-950">58110 (Penerbitan Buku)</span>
                      </div>
                      <div className="flex justify-between border-b border-emerald-200 pb-1.5">
                        <span className="text-emerald-700">Wilayah Domisili:</span>
                        <span className="font-bold text-emerald-950">Kota Bogor, Jawa Barat</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-700">Status Legal:</span>
                        <span className="font-bold text-emerald-700">Terverifikasi & Aktif</span>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-700 italic">
                      Dengan izin legal ini, permohonan ISBN buku Anda diproses secara resmi langsung ke sistem ISBN Perpustakaan Nasional tanpa perantara pihak ketiga yang merugikan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Location & Map */}
              <div className="bg-white border-2 border-emerald-950 shadow-[6px_6px_0_#0A2A22] p-8 sm:p-12">
                <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-800">
                  Lokasi Redaksi
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 mt-1">
                  Kunjungi Kantor Kami di Bogor
                </h2>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-amber-600 mt-1 shrink-0" />
                      <div className="text-sm text-emerald-900 leading-relaxed">
                        <strong className="block text-emerald-950 mb-1">
                          Alamat Kantor Redaksi & Percetakan:
                        </strong>
                        {COMPANY.address}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-emerald-900 font-mono">
                      <Building2 className="w-5 h-5 text-emerald-700 shrink-0" />
                      <span>Telepon / WhatsApp: {COMPANY.phone}</span>
                    </div>

                    <div className="pt-4">
                      <a
                        href={COMPANY.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-press px-5 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-mono text-xs uppercase font-bold border-2 border-emerald-950 inline-flex items-center gap-2 cursor-pointer"
                      >
                        Buka Petunjuk Arah di Google Maps
                        <ExternalLink className="w-4 h-4 text-amber-300" />
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-6 bg-[#F2F7F4] p-6 border-2 border-emerald-950 text-xs font-mono text-emerald-800 space-y-3">
                    <h4 className="font-bold text-emerald-950 uppercase tracking-wider">
                      Jam Kerja Layanan Redaksi:
                    </h4>
                    <div className="flex justify-between border-b border-emerald-200 pb-1">
                      <span>Senin - Jumat:</span>
                      <span className="font-bold">08.30 - 17.00 WIB</span>
                    </div>
                    <div className="flex justify-between border-b border-emerald-200 pb-1">
                      <span>Sabtu:</span>
                      <span className="font-bold">09.00 - 15.00 WIB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minggu & Hari Libur:</span>
                      <span className="text-amber-800 font-bold">Konsultasi WhatsApp Aktif</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 pt-2 italic">
                      Silakan hubungi WhatsApp terlebih dahulu sebelum bertamu untuk memastikan tim redaksi berada di tempat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => navigateTo(tab)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenLegal={() => setIsLegalLightboxOpen(true)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
      />

      {/* Free Manuscript Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* High-Res Legal Certificate Lightbox */}
      <LegalLightbox
        isOpen={isLegalLightboxOpen}
        onClose={() => setIsLegalLightboxOpen(false)}
      />
    </div>
  );
}
