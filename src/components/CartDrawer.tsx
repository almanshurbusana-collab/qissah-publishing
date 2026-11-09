import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Book, formatRp, buildWaUrl } from '../data/publishingData';
import { BookCover } from './BookCover';

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (bookId: string, delta: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearCart?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
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

  const totalAmount = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const listText = items
      .map((item, idx) => `${idx + 1}. ${item.book.title} (x${item.quantity}) = ${formatRp(item.book.price * item.quantity)}`)
      .join('\n');

    const msg = `Halo Qissah Publishing, saya ingin memesan buku berikut melalui Toko Buku:

${listText}

*Total Biaya:* ${formatRp(totalAmount)} (belum termasuk ongkos kirim)
Mohon informasi ketersediaan stok, alamat tujuan pengiriman, dan nomor rekening pembayaran. Terima kasih!`;

    window.open(buildWaUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end"
    >
      <div className="w-full max-w-md bg-[#F2F7F4] border-l-2 border-[#0A2A22] h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#0A2A22]/20 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2 text-[#0A2A22]">
            <ShoppingBag className="w-5 h-5 text-[#0A7B5B]" />
            <h2 className="font-display text-xl">Keranjang Buku ({totalQuantity})</h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-slate-500 hover:text-black border border-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-[#46605A]">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-200 border-2 border-[#0A2A22] flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg text-[#0A2A22]">Keranjang Masih Kosong</h3>
              <p className="text-xs mt-1 max-w-xs mx-auto">
                Pilih buku terbitan Qissah Publishing di katalog Toko Buku untuk menambahkannya ke pesanan Anda.
              </p>
            </div>
          ) : (
            items.map(({ book, quantity }) => (
              <div
                key={book.id}
                className="bg-white border-2 border-[#0A2A22] p-3.5 flex gap-3 shadow-[3px_3px_0_#0A2A22]"
              >
                <div className="w-16 flex-shrink-0">
                  <BookCover book={book} showShadow={false} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#0A7B5B] font-semibold">
                      {book.cat}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0A2A22] line-clamp-2 leading-snug">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-[#46605A] mt-0.5 truncate">{book.author}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                    <span className="font-mono text-xs font-bold text-[#0A7B5B]">
                      {formatRp(book.price * quantity)}
                    </span>
                    <div className="flex items-center gap-1.5 border border-[#0A2A22] bg-white">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(book.id, -1)}
                        className="p-1 hover:bg-slate-100 text-slate-700"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono text-xs font-semibold">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(book.id, 1)}
                        className="p-1 hover:bg-slate-100 text-slate-700"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveItem(book.id)}
                  className="text-slate-400 hover:text-red-600 p-1 self-start"
                  title="Hapus buku"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t-2 border-[#0A2A22] space-y-3">
            <div className="flex justify-between items-baseline text-xs text-[#46605A]">
              <span>Subtotal Buku:</span>
              <span className="font-mono text-lg font-bold text-[#0A2A22]">
                {formatRp(totalAmount)}
              </span>
            </div>
            <p className="text-[10px] text-[#46605A] font-mono leading-tight">
              *Harga belum termasuk ongkos kirim. Ongkir dihitung berdasarkan kota tujuan pengiriman.
            </p>
            <button
              onClick={handleCheckout}
              type="button"
              className="btn-press w-full py-3 bg-[#0A7B5B] text-white hover:bg-[#07553F] text-xs sm:text-sm font-semibold"
            >
              <span>Checkout via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClearCart}
              type="button"
              className="w-full text-center text-xs text-slate-400 hover:text-red-600 font-mono"
            >
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
