import React from 'react';
import { Book, calculateEan13 } from '../data/publishingData';

export interface BookCoverProps {
  book: Book;
  className?: string;
  showShadow?: boolean;
  width?: number;
  height?: number;
}

export const BookCover: React.FC<BookCoverProps> = ({
  book,
  className = '',
  showShadow = true,
  width,
  height,
}) => {
  const ean = calculateEan13(book.isbn12);

  const renderCoverArt = () => {
    switch (book.id) {
      case 'metodologi':
        return (
          <g>
            <rect width="300" height="420" fill="#0A7B5B" />
            <g stroke="rgba(255,255,255,0.18)" strokeWidth="1">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map((x, i) => (
                <line key={`v-${i}`} x1={x} y1="250" x2={x} y2="400" />
              ))}
              {[250, 280, 310, 340, 370, 400].map((y, i) => (
                <line key={`h-${i}`} x1="0" y1={y} x2="300" y2={y} />
              ))}
            </g>
            {/* Scatter points */}
            {[
              [35, 385], [50, 375], [68, 360], [82, 365], [100, 345],
              [115, 335], [130, 340], [150, 320], [168, 310], [185, 295],
              [205, 300], [220, 280], [240, 275], [260, 260], [280, 255]
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="3.5" fill="#FFFFFF" opacity="0.9" />
            ))}
            {/* Regression trend line */}
            <path d="M24 392 L296 252" stroke="#F5CB45" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="2" fill="rgba(255,255,255,0.75)">
              QISSAH PUBLISHING
            </text>
            <text fontFamily="Gloock, Georgia, serif" fontSize="35" fill="#FFFFFF">
              <tspan x="28" y="84">Metodologi</tspan>
              <tspan x="28" y="124">Penelitian</tspan>
              <tspan x="28" y="164">Kuantitatif</tspan>
            </text>
            <text x="28" y="194" fontFamily="Hanken Grotesk, sans-serif" fontSize="15" fontWeight="600" letterSpacing="0.5" fill="#F5CB45">
              untuk Pemula
            </text>
            <text x="28" y="228" fontFamily="Hanken Grotesk, sans-serif" fontSize="12" fill="rgba(255,255,255,0.85)">
              {book.author}
            </text>
          </g>
        );

      case 'guru':
        return (
          <g>
            <rect width="300" height="420" fill="#F5CB45" />
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="2" fill="rgba(10,42,34,0.7)">
              QISSAH PUBLISHING
            </text>
            <text fontFamily="Gloock, Georgia, serif" fontSize="37" fill="#0A2A22">
              <tspan x="28" y="84">Guru</tspan>
              <tspan x="28" y="124">Penggerak</tspan>
              <tspan x="28" y="164">di Ruang</tspan>
              <tspan x="28" y="204">Kelas</tspan>
            </text>
            <circle cx="246" cy="236" r="22" fill="#0A7B5B" />
            {/* Class arches */}
            <path d="M24 420 V321 a31 31 0 0 1 62 0 V420 Z" fill="#0A2A22" />
            <path d="M94 420 V281 a31 31 0 0 1 62 0 V420 Z" fill="#0A2A22" />
            <path d="M164 420 V346 a31 31 0 0 1 62 0 V420 Z" fill="#D4A017" />
            <path d="M234 420 V301 a31 31 0 0 1 62 0 V420 Z" fill="#0A2A22" />
            <text x="28" y="248" fontFamily="Hanken Grotesk, sans-serif" fontSize="12.5" fontWeight="600" fill="#0A2A22">
              {book.author}
            </text>
          </g>
        );

      case 'ciliwung':
        return (
          <g>
            <rect width="300" height="420" fill="#0A2A22" />
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="2" fill="rgba(234,245,239,0.7)">
              QISSAH PUBLISHING
            </text>
            <text fontFamily="Gloock, Georgia, serif" fontSize="39" fill="#E8F4EE">
              <tspan x="28" y="86">Kisah dari</tspan>
              <tspan x="28" y="128">Tepi</tspan>
              <tspan x="28" y="170">Ciliwung</tspan>
            </text>
            <text x="28" y="198" fontFamily="Hanken Grotesk, sans-serif" fontSize="13" fontWeight="600" letterSpacing="0.8" fill="#3FD6A0">
              Kumpulan Cerpen
            </text>
            <circle cx="236" cy="252" r="27" fill="#F5CB45" />
            {/* River wave strokes */}
            {[286, 305, 324, 343, 362, 381, 400].map((wy, idx) => (
              <path
                key={idx}
                d={`M0 ${wy} q25 -15 50 0 t50 0 t50 0 t50 0 t50 0 t50 0`}
                fill="none"
                stroke={idx % 2 === 0 ? '#3FD6A0' : '#0A7B5B'}
                strokeWidth="3.2"
              />
            ))}
            <text x="28" y="248" fontFamily="Hanken Grotesk, sans-serif" fontSize="12.5" fill="#E8F4EE">
              {book.author}
            </text>
          </g>
        );

      case 'menulis':
        return (
          <g>
            <rect width="300" height="420" fill="#E3F1EA" />
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="2" fill="rgba(10,42,34,0.7)">
              QISSAH PUBLISHING
            </text>
            <text fontFamily="Gloock, Georgia, serif" fontSize="39" fill="#0A2A22">
              <tspan x="28" y="86">Menulis</tspan>
              <tspan x="28" y="128">Buku</tspan>
              <tspan x="28" y="170">Pertama</tspan>
            </text>
            <text x="28" y="198" fontFamily="Hanken Grotesk, sans-serif" fontSize="13" fontWeight="600" letterSpacing="0.8" fill="#0A7B5B">
              Panduan Praktis
            </text>
            <text x="28" y="232" fontFamily="Hanken Grotesk, sans-serif" fontSize="12.5" fill="#0A2A22">
              {book.author}
            </text>
            {/* Stacked books illustration */}
            <rect x="40" y="366" width="224" height="34" rx="2" fill="#0A2A22" />
            <rect x="58" y="332" width="196" height="34" rx="2" fill="#0A7B5B" />
            <rect x="46" y="298" width="176" height="34" rx="2" fill="#F5CB45" />
            <g stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
              <path d="M56 374 v18 M62 374 v18" />
              <path d="M74 340 v18 M80 340 v18" />
              <path d="M62 306 v18 M68 306 v18" />
            </g>
          </g>
        );

      case 'fiqih-digital':
        return (
          <g>
            <rect width="300" height="420" fill="#063E32" />
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="2" fill="rgba(245,203,69,0.85)">
              QISSAH PUBLISHING
            </text>
            <text fontFamily="Gloock, Georgia, serif" fontSize="33" fill="#FFFFFF">
              <tspan x="28" y="84">Fiqih</tspan>
              <tspan x="28" y="120">Muamalah</tspan>
              <tspan x="28" y="156" fill="#F5CB45">Digital</tspan>
            </text>
            <text x="28" y="184" fontFamily="Hanken Grotesk, sans-serif" fontSize="13" fontWeight="600" letterSpacing="0.5" fill="#A7C8BA">
              &amp; Ekonomi Islam
            </text>
            <text x="28" y="214" fontFamily="Hanken Grotesk, sans-serif" fontSize="12" fill="rgba(255,255,255,0.85)">
              {book.author}
            </text>
            {/* Islamic geometric pattern arches */}
            <g transform="translate(150, 330)" stroke="#F5CB45" strokeWidth="1.5" fill="none" opacity="0.4">
              <circle r="70" />
              <circle r="50" />
              <circle r="30" />
              <polygon points="0,-70 70,0 0,70 -70,0" />
              <polygon points="-49,-49 49,-49 49,49 -49,49" />
            </g>
          </g>
        );

      case 'antologi-bogor':
      default:
        return (
          <g>
            <rect width="300" height="420" fill="#14362E" />
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="2" fill="rgba(234,245,239,0.7)">
              QISSAH PUBLISHING
            </text>
            <text fontFamily="Gloock, Georgia, serif" fontSize="35" fill="#E8F4EE">
              <tspan x="28" y="86">Kidung</tspan>
              <tspan x="28" y="124">Hujan di</tspan>
              <tspan x="28" y="162" fill="#F5CB45">Kota Hujan</tspan>
            </text>
            <text x="28" y="190" fontFamily="Hanken Grotesk, sans-serif" fontSize="13" fontWeight="600" letterSpacing="0.8" fill="#3FD6A0">
              Antologi Puisi
            </text>
            <text x="28" y="222" fontFamily="Hanken Grotesk, sans-serif" fontSize="12" fill="#E8F4EE">
              {book.author}
            </text>
            {/* Raindrop motifs */}
            <g stroke="#3FD6A0" strokeWidth="1.8" opacity="0.6">
              {[
                [40, 260], [80, 290], [120, 270], [160, 310], [200, 280], [240, 305],
                [50, 340], [100, 360], [140, 330], [180, 370], [220, 350], [260, 365]
              ].map(([rx, ry], idx) => (
                <line key={idx} x1={rx} y1={ry} x2={rx - 10} y2={ry + 22} strokeLinecap="round" />
              ))}
            </g>
          </g>
        );
    }
  };

  return (
    <div
      className={`relative select-none transition-transform duration-200 group-hover:-translate-y-1 ${className}`}
      style={{
        ...(showShadow ? { filter: 'drop-shadow(6px 8px 0px rgba(10, 42, 34, 0.22))' } : {}),
        ...(width ? { width: `${width}px` } : {}),
        ...(height ? { height: `${height}px` } : {}),
      }}
    >
      <svg
        className="w-full h-auto block rounded-[2px]"
        viewBox="0 0 300 420"
        role="img"
        aria-label={`Sampul buku ${book.title}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderCoverArt()}

        {/* Book spine crease shadow for realistic book-sheet feel */}
        <rect width="9" height="420" fill="rgba(0,0,0,0.24)" />
        <path d="M10 0 V420" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        <path d="M12 0 V420" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      </svg>
    </div>
  );
};

export const BarcodeSvg: React.FC<{
  isbn12?: string;
  isbn?: string;
  width?: number;
  height?: number;
  className?: string;
}> = ({ isbn12, isbn, width = 140, height = 80, className = '' }) => {
  const code = isbn12 || isbn || '978623000001';
  const ean = calculateEan13(code);
  const u = width / 111;
  const bx = 9 * u;
  const bh = height - 20;
  const n = ean.bits.length;

  const rects: { x: number; w: number }[] = [];
  let i = 0;
  while (i < n) {
    if (ean.bits[i] === '1') {
      let j = i;
      while (j < n && ean.bits[j] === '1') j++;
      rects.push({
        x: bx + i * u,
        w: (j - i) * u,
      });
      i = j;
    } else {
      i++;
    }
  }

  const ty = height - 4;
  const f = ean.full;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`bg-white p-1 rounded-sm border border-slate-300 shadow-sm ${className}`}
      aria-label={`Barcode ISBN ${f}`}
    >
      <rect width={width} height={height} fill="#ffffff" />
      <g fill="#111111">
        {rects.map((r, idx) => (
          <rect key={idx} x={r.x.toFixed(2)} y={6} width={r.w.toFixed(2)} height={bh} />
        ))}
      </g>
      <g fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fontWeight="500">
        <text x={(1.5 * u).toFixed(2)} y={ty}>{f[0]}</text>
        <text x={(bx + 3 * u).toFixed(2)} y={ty} textLength={(42 * u).toFixed(2)} lengthAdjust="spacing">
          {f.slice(1, 7)}
        </text>
        <text x={(bx + 50 * u).toFixed(2)} y={ty} textLength={(42 * u).toFixed(2)} lengthAdjust="spacing">
          {f.slice(7)}
        </text>
      </g>
    </svg>
  );
};

export const HeroBookPlate: React.FC<{ minPrice?: number; onInspect?: () => void }> = ({
  minPrice = 450000,
  onInspect,
}) => {
  const ean = calculateEan13('978623000099');
  const u = 104 / 111;
  const bx = 196 + 9 * u;
  const bh = 74 - 18;
  const n = ean.bits.length;

  const rects: { x: number; w: number }[] = [];
  let i = 0;
  while (i < n) {
    if (ean.bits[i] === '1') {
      let j = i;
      while (j < n && ean.bits[j] === '1') j++;
      rects.push({
        x: bx + i * u,
        w: (j - i) * u,
      });
      i = j;
    } else {
      i++;
    }
  }

  const ty = 334 + 74 - 3;
  const f = ean.full;

  return (
    <figure
      className="hero-art relative max-w-[420px] w-full mx-auto cursor-pointer group select-none"
      onClick={onInspect}
      title="Klik untuk melihat detail perwajahan & spesifikasi cetak"
    >
      <div className="plate relative p-8 sm:p-10 bg-emerald-950/60 border-2 border-emerald-700/60 rounded-xs shadow-[8px_8px_0_#061a15] flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0_#061a15]">
        {/* Printer crop registration marks */}
        <i className="crop tl absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-amber-400/70" />
        <i className="crop tr absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-amber-400/70" />
        <i className="crop bl absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-amber-400/70" />
        <i className="crop br absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-amber-400/70" />

        <div className="book-slot w-full max-w-[280px] sm:max-w-[310px]">
          <svg
            className="hero-book w-full h-auto block -rotate-3 transition-transform duration-300 group-hover:rotate-0 drop-shadow-[10px_16px_20px_rgba(0,0,0,0.65)]"
            viewBox="0 0 320 440"
            role="img"
            aria-label="Contoh sampul buku dengan barcode ISBN"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="320" height="440" fill="#0A7B5B" />
            <rect width="22" height="440" fill="#07553F" />
            <path d="M22 0V440" stroke="rgba(255,255,255,.35)" />
            <g fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="16">
              <circle cx="236" cy="152" r="78" />
              <path d="M266 206l40 52" />
            </g>
            <text x="46" y="48" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="2.4" fill="rgba(255,255,255,.8)">
              QISSAH PUBLISHING
            </text>
            <text fontFamily="'Gloock', Georgia, serif" fontSize="62" fill="#fff">
              <tspan x="44" y="136">Naskah</tspan>
              <tspan x="44" y="198">jadi</tspan>
              <tspan x="44" y="260" fill="#F5CB45">buku.</tspan>
            </text>
            <path d="M46 284h60" stroke="#F5CB45" strokeWidth="2" />
            <text x="46" y="308" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="1.6" fill="rgba(255,255,255,.88)">
              NAMA PENULIS
            </text>
            <g>
              <rect x="196" y="334" width="104" height="74" fill="#fff" />
              <g fill="#111">
                {rects.map((r, idx) => (
                  <rect key={idx} x={r.x.toFixed(2)} y={334 + 6} width={r.w.toFixed(2)} height={bh} />
                ))}
              </g>
              <g fill="#111" fontFamily="IBM Plex Mono, monospace" fontSize="8.5">
                <text x={(196 + 1.5 * u).toFixed(2)} y={ty}>{f[0]}</text>
                <text x={(bx + 3 * u).toFixed(2)} y={ty} textLength={(42 * u).toFixed(2)} lengthAdjust="spacing">
                  {f.slice(1, 7)}
                </text>
                <text x={(bx + 50 * u).toFixed(2)} y={ty} textLength={(42 * u).toFixed(2)} lengthAdjust="spacing">
                  {f.slice(7)}
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Floating price badge sticker */}
        <div className="sticker absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-400 text-emerald-950 border-2 border-emerald-950 flex flex-col items-center justify-center text-center shadow-[3px_3px_0_#0A2A22] -rotate-12 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105">
          <small className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-emerald-900 block leading-tight">Mulai</small>
          <b className="font-serif text-base sm:text-lg font-bold leading-none mt-0.5 text-emerald-950">Rp{Math.round(minPrice / 1000)}rb</b>
        </div>
      </div>
      <figcaption className="text-center font-mono text-xs text-emerald-300/80 mt-3 tracking-wider flex items-center justify-center gap-1.5">
        <span>Pratinjau Cetak: Buku Ber-ISBN Resmi &amp; Barcode</span>
        <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
      </figcaption>
    </figure>
  );
};

