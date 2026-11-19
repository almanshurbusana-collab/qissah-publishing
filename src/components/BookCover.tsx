import React from 'react';
import { Book, calculateEan13 } from '../data/publishingData';

export interface BookCoverProps {
  book: Book;
  className?: string;
  showShadow?: boolean;
  width?: number;
  height?: number;
  side?: 'front' | 'back';
}

export const BookCover: React.FC<BookCoverProps> = ({
  book,
  className = '',
  showShadow = true,
  width,
  height,
  side = 'front',
}) => {
  const ean = calculateEan13(book.isbn12);

  const renderCoverArt = () => {
    switch (book.id) {
      case 'keajaiban-istighfar':
        return (
          <g>
            <rect width="300" height="420" fill="#062E23" />
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(245,203,69,0.85)">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="28" y="62" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" letterSpacing="2" fill="rgba(255,255,255,0.85)">
              KISAH SAHIH
            </text>
            <text fontFamily="Gloock, Georgia, serif" fontSize="30" fill="#FFFFFF">
              <tspan x="28" y="98">Keajaiban</tspan>
              <tspan x="28" y="134" fill="#F5CB45">Istighfar</tspan>
            </text>
            <text x="150" y="180" fontFamily="Amiri, serif" fontSize="24" textAnchor="middle" fill="#F5CB45">
              أَسْتَغْفِرُ اللَّهَ
            </text>
            <text x="28" y="214" fontFamily="Hanken Grotesk, sans-serif" fontSize="12" fill="rgba(255,255,255,0.85)">
              {book.author}
            </text>
            <g transform="translate(150, 330)" stroke="#F5CB45" strokeWidth="1.5" fill="none" opacity="0.4">
              <circle r="70" />
              <polygon points="0,-70 70,0 0,70 -70,0" />
            </g>
          </g>
        );

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
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(255,255,255,0.75)">
              PT. QISSAH GLOBAL NUSANTARA
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
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(10,42,34,0.7)">
              PT. QISSAH GLOBAL NUSANTARA
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
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(234,245,239,0.7)">
              PT. QISSAH GLOBAL NUSANTARA
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
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(10,42,34,0.7)">
              PT. QISSAH GLOBAL NUSANTARA
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
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(245,203,69,0.85)">
              PT. QISSAH GLOBAL NUSANTARA
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
            <text x="28" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(234,245,239,0.7)">
              PT. QISSAH GLOBAL NUSANTARA
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

  const renderBackCoverArt = () => {
    switch (book.id) {
      case 'keajaiban-istighfar':
        return (
          <g>
            <rect width="300" height="420" fill="#062E23" />
            <text x="24" y="34" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(245,203,69,0.85)">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="24" y="58" fontFamily="Gloock, Georgia, serif" fontSize="16" fill="#F5CB45">
              Jalan Pulang Bernama Istighfar
            </text>
            <text x="24" y="76" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" fontWeight="600" fill="#FFFFFF">
              {book.author}
            </text>
            <line x1="24" y1="88" x2="276" y2="88" stroke="#F5CB45" strokeWidth="1.5" />
            <foreignObject x="22" y="98" width="254" height="240">
              <div xmlns="http://www.w3.org/1999/xhtml" className="text-emerald-100 text-[10.5px] leading-relaxed font-sans pr-2">
                <p className="mb-2 text-white/95">
                  Di dalam perut ikan besar, Nabi Yunus berdoa seraya mengakui kesalahannya. Ketika kekeringan melanda, Umar bin Khattab memperbanyak istighfar saat memohon hujan.
                </p>
                <p className="mb-2.5 text-white/80">
                  Kisah Sahih Keajaiban Istighfar mengajak pembaca menyelami kisah-kisah tentang memohon ampun, memperbaiki diri, dan berharap kepada Allah di tengah kesulitan.
                </p>
                <div className="border-t border-emerald-600/50 pt-2 text-[9.5px] text-amber-300 font-mono">
                  ★ Penelusuran Riwayat Shahih &amp; Renungan Kehidupan
                </div>
              </div>
            </foreignObject>
            <rect x="22" y="348" width="254" height="52" fill="#031C15" rx="2" stroke="rgba(245,203,69,0.2)" />
            <text x="32" y="367" fontFamily="Hanken Grotesk, sans-serif" fontSize="9" fontWeight="700" fill="#FFFFFF">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="32" y="380" fontFamily="Hanken Grotesk, sans-serif" fontSize="8" fill="rgba(255,255,255,0.75)">
              Penerbitan Buku Berkualitas · Bogor Barat, Jawa Barat
            </text>
            <text x="32" y="392" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fill="#F5CB45">
              publishing.qissahgn.com
            </text>
          </g>
        );

      case 'metodologi':
        return (
          <g>
            <rect width="300" height="420" fill="#0A7B5B" />
            <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
              {[0, 40, 80, 120, 160, 200, 240, 280].map((x, i) => (
                <line key={`bv-${i}`} x1={x} y1="0" x2={x} y2="420" />
              ))}
              {[50, 100, 150, 200, 250, 300, 350, 400].map((y, i) => (
                <line key={`bh-${i}`} x1="0" y1={y} x2="300" y2={y} />
              ))}
            </g>
            <text x="24" y="34" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(255,255,255,0.75)">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="24" y="58" fontFamily="Gloock, Georgia, serif" fontSize="16" fill="#FFFFFF">
              Metodologi Penelitian Kuantitatif
            </text>
            <text x="24" y="76" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" fontWeight="600" fill="#F5CB45">
              {book.author}
            </text>
            <line x1="24" y1="88" x2="276" y2="88" stroke="#F5CB45" strokeWidth="1.5" strokeOpacity="0.8" />

            <foreignObject x="22" y="98" width="254" height="240">
              <div xmlns="http://www.w3.org/1999/xhtml" className="text-white text-[10.5px] leading-relaxed font-sans pr-2">
                <p className="mb-2 text-white/95">
                  Buku ini dirancang khusus untuk mematahkan mitos bahwa penelitian kuantitatif itu rumit dan menakutkan bagi pemula. Disertai penjelasan terstruktur dan sistematis.
                </p>
                <p className="mb-2.5 text-white/85">
                  Mulai dari perumusan hipotesis, teknik sampling representatif, penyusunan kuesioner berskala Likert, hingga interpretasi output regresi statistik SPSS.
                </p>
                <div className="border-t border-emerald-400/30 pt-2 text-[9.5px] text-amber-300 font-mono">
                  ★ Referensi Standar Kuliah &amp; Riset Akademik
                </div>
              </div>
            </foreignObject>

            <rect x="22" y="348" width="254" height="52" fill="#07553F" rx="2" stroke="rgba(255,255,255,0.15)" />
            <text x="32" y="367" fontFamily="Hanken Grotesk, sans-serif" fontSize="9" fontWeight="700" fill="#FFFFFF">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="32" y="380" fontFamily="Hanken Grotesk, sans-serif" fontSize="8" fill="rgba(255,255,255,0.75)">
              Penerbitan Buku Berkualitas · Bogor Barat, Jawa Barat
            </text>
            <text x="32" y="392" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fill="#F5CB45">
              publishing.qissahgn.com
            </text>
          </g>
        );

      case 'guru':
        return (
          <g>
            <rect width="300" height="420" fill="#F5CB45" />
            <path d="M0 0 L300 0 L300 90 L0 140 Z" fill="#E8B82B" opacity="0.35" />
            <text x="24" y="34" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(10,42,34,0.7)">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="24" y="58" fontFamily="Gloock, Georgia, serif" fontSize="16" fill="#0A2A22">
              Guru Penggerak di Ruang Kelas
            </text>
            <text x="24" y="76" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" fontWeight="600" fill="#0A7B5B">
              {book.author}
            </text>
            <line x1="24" y1="88" x2="276" y2="88" stroke="#0A2A22" strokeWidth="1.5" />

            <foreignObject x="22" y="98" width="254" height="240">
              <div xmlns="http://www.w3.org/1999/xhtml" className="text-emerald-950 text-[10.5px] leading-relaxed font-sans pr-2">
                <p className="mb-2 font-medium">
                  Mengajar bukan sekadar menuntaskan kurikulum, melainkan menyalakan rasa ingin tahu siswa. Pengalaman nyata lebih dari satu dekade di ruang-ruang kelas Indonesia.
                </p>
                <p className="mb-2.5 text-emerald-900/90">
                  Memuat lembar kerja refleksi guru, contoh rubrik asesmen autentik, serta kiat mengelola kelas heterogen secara berdiferensiasi dan bermakna.
                </p>
                <div className="border-t border-emerald-950/20 pt-2 text-[9.5px] text-emerald-950 font-mono font-bold">
                  ★ Panduan Praktis Pendidik &amp; Kepala Sekolah
                </div>
              </div>
            </foreignObject>

            <rect x="22" y="348" width="254" height="52" fill="#0A2A22" rx="2" />
            <text x="32" y="367" fontFamily="Hanken Grotesk, sans-serif" fontSize="9" fontWeight="700" fill="#FFFFFF">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="32" y="380" fontFamily="Hanken Grotesk, sans-serif" fontSize="8" fill="rgba(255,255,255,0.8)">
              Penerbitan Buku Berkualitas · Bogor Barat, Jawa Barat
            </text>
            <text x="32" y="392" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fill="#F5CB45">
              publishing.qissahgn.com
            </text>
          </g>
        );

      case 'ciliwung':
        return (
          <g>
            <rect width="300" height="420" fill="#0A2A22" />
            {[40, 80, 120, 160].map((wy, idx) => (
              <path
                key={idx}
                d={`M0 ${wy} q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0`}
                fill="none"
                stroke="#1B4D3E"
                strokeWidth="1.5"
                opacity="0.3"
              />
            ))}
            <text x="24" y="34" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(234,245,239,0.7)">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="24" y="58" fontFamily="Gloock, Georgia, serif" fontSize="16" fill="#E8F4EE">
              Kisah dari Tepi Ciliwung
            </text>
            <text x="24" y="76" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" fontWeight="600" fill="#3FD6A0">
              {book.author}
            </text>
            <line x1="24" y1="88" x2="276" y2="88" stroke="#3FD6A0" strokeWidth="1.5" />

            <foreignObject x="22" y="98" width="254" height="240">
              <div xmlns="http://www.w3.org/1999/xhtml" className="text-emerald-100 text-[10.5px] leading-relaxed font-sans pr-2">
                <p className="mb-2 text-emerald-50">
                  Ciliwung menyimpan riwayat yang tak pernah habis dialirkan. Di tangan Salma Aulia, suara-suara lirih di sepanjang aliran sungai diangkat menjadi prosa yang memikat dan mengharukan.
                </p>
                <p className="mb-2.5 text-emerald-200/90">
                  Setiap cerita merajut kehangatan persaudaraan, ketabahan bertahan hidup, dan aroma tanah basah seusai hujan lebat mengguyur hulu.
                </p>
                <div className="border-t border-emerald-700/60 pt-2 text-[9.5px] text-amber-300 font-mono">
                  ★ Antologi Cerpen Sastra Nusantara
                </div>
              </div>
            </foreignObject>

            <rect x="22" y="348" width="254" height="52" fill="#061B16" rx="2" stroke="rgba(255,255,255,0.12)" />
            <text x="32" y="367" fontFamily="Hanken Grotesk, sans-serif" fontSize="9" fontWeight="700" fill="#FFFFFF">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="32" y="380" fontFamily="Hanken Grotesk, sans-serif" fontSize="8" fill="rgba(255,255,255,0.75)">
              Penerbitan Buku Berkualitas · Bogor Barat, Jawa Barat
            </text>
            <text x="32" y="392" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fill="#3FD6A0">
              publishing.qissahgn.com
            </text>
          </g>
        );

      case 'menulis':
        return (
          <g>
            <rect width="300" height="420" fill="#E3F1EA" />
            <text x="24" y="34" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(10,42,34,0.7)">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="24" y="58" fontFamily="Gloock, Georgia, serif" fontSize="15" fill="#0A2A22">
              Menulis Buku Pertama untuk Orang Sibuk
            </text>
            <text x="24" y="76" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" fontWeight="600" fill="#0A7B5B">
              {book.author}
            </text>
            <line x1="24" y1="88" x2="276" y2="88" stroke="#0A7B5B" strokeWidth="1.5" />

            <foreignObject x="22" y="98" width="254" height="240">
              <div xmlns="http://www.w3.org/1999/xhtml" className="text-emerald-950 text-[10.5px] leading-relaxed font-sans pr-2">
                <p className="mb-2 font-medium">
                  Alasan nomor satu mengapa naskah tak pernah selesai bukanlah ketiadaan bakat, melainkan ketiadaan sistem yang selaras dengan kesibukan sehari-hari.
                </p>
                <p className="mb-2.5 text-emerald-900/90">
                  Panduan taktis bagaimana menghasilkan 300 kata bermutu setiap pagi, mengorganisasi materi riset tanpa tersesat, dan menyunting mandiri hingga siap diterbitkan.
                </p>
                <div className="border-t border-emerald-950/20 pt-2 text-[9.5px] text-emerald-800 font-mono font-bold">
                  ★ Panduan Produktivitas Penulis Pemula &amp; Karyawan
                </div>
              </div>
            </foreignObject>

            <rect x="22" y="348" width="254" height="52" fill="#0A2A22" rx="2" />
            <text x="32" y="367" fontFamily="Hanken Grotesk, sans-serif" fontSize="9" fontWeight="700" fill="#FFFFFF">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="32" y="380" fontFamily="Hanken Grotesk, sans-serif" fontSize="8" fill="rgba(255,255,255,0.8)">
              Penerbitan Buku Berkualitas · Bogor Barat, Jawa Barat
            </text>
            <text x="32" y="392" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fill="#F5CB45">
              publishing.qissahgn.com
            </text>
          </g>
        );

      case 'fiqih-digital':
        return (
          <g>
            <rect width="300" height="420" fill="#063E32" />
            <text x="24" y="34" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(245,203,69,0.85)">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="24" y="58" fontFamily="Gloock, Georgia, serif" fontSize="15" fill="#FFFFFF">
              Fiqih Muamalah Digital &amp; Ekonomi Islam
            </text>
            <text x="24" y="76" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" fontWeight="600" fill="#F5CB45">
              {book.author}
            </text>
            <line x1="24" y1="88" x2="276" y2="88" stroke="#F5CB45" strokeWidth="1.5" />

            <foreignObject x="22" y="98" width="254" height="240">
              <div xmlns="http://www.w3.org/1999/xhtml" className="text-emerald-100 text-[10.5px] leading-relaxed font-sans pr-2">
                <p className="mb-2 text-white/95">
                  Perkembangan teknologi finansial menuntut pemahaman fiqih yang adaptif tanpa meninggalkan prinsip dasar syariah. Mengurai akad modern dengan diagram alir jernih.
                </p>
                <p className="mb-2.5 text-white/80">
                  Membedah transaksi e-wallet, paylater, peer-to-peer lending syariah, dan cryptocurrency menurut fatwa DSN-MUI terkini beserta studi kasus perbankan syariah.
                </p>
                <div className="border-t border-emerald-600/50 pt-2 text-[9.5px] text-amber-300 font-mono">
                  ★ Referensi Utama Mahasiswa &amp; Praktisi Fintech Syariah
                </div>
              </div>
            </foreignObject>

            <rect x="22" y="348" width="254" height="52" fill="#042720" rx="2" stroke="rgba(245,203,69,0.2)" />
            <text x="32" y="367" fontFamily="Hanken Grotesk, sans-serif" fontSize="9" fontWeight="700" fill="#FFFFFF">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="32" y="380" fontFamily="Hanken Grotesk, sans-serif" fontSize="8" fill="rgba(255,255,255,0.75)">
              Penerbitan Buku Berkualitas · Bogor Barat, Jawa Barat
            </text>
            <text x="32" y="392" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fill="#F5CB45">
              publishing.qissahgn.com
            </text>
          </g>
        );

      case 'antologi-bogor':
      default:
        return (
          <g>
            <rect width="300" height="420" fill="#14362E" />
            <text x="24" y="34" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" letterSpacing="1" fill="rgba(234,245,239,0.7)">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="24" y="58" fontFamily="Gloock, Georgia, serif" fontSize="16" fill="#E8F4EE">
              {book.title}
            </text>
            <text x="24" y="76" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" fontWeight="600" fill="#F5CB45">
              {book.author}
            </text>
            <line x1="24" y1="88" x2="276" y2="88" stroke="#3FD6A0" strokeWidth="1.5" />

            <foreignObject x="22" y="98" width="254" height="240">
              <div xmlns="http://www.w3.org/1999/xhtml" className="text-emerald-100 text-[10.5px] leading-relaxed font-sans pr-2">
                <p className="mb-2 text-white/95">
                  {book.synopsis}
                </p>
                <p className="mb-2.5 text-white/80">
                  {book.desc || 'Karya literasi berstandar mutu perwajahan dan percetakan profesional dari redaksi PT. Qissah Global Nusantara.'}
                </p>
                <div className="border-t border-emerald-600/50 pt-2 text-[9.5px] text-amber-300 font-mono">
                  ★ {book.category} · Edisi Cetak Perdana
                </div>
              </div>
            </foreignObject>

            <rect x="22" y="348" width="254" height="52" fill="#0D241E" rx="2" stroke="rgba(255,255,255,0.12)" />
            <text x="32" y="367" fontFamily="Hanken Grotesk, sans-serif" fontSize="9" fontWeight="700" fill="#FFFFFF">
              PT. QISSAH GLOBAL NUSANTARA
            </text>
            <text x="32" y="380" fontFamily="Hanken Grotesk, sans-serif" fontSize="8" fill="rgba(255,255,255,0.75)">
              Penerbitan Buku Berkualitas · Bogor Barat, Jawa Barat
            </text>
            <text x="32" y="392" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fill="#3FD6A0">
              publishing.qissahgn.com
            </text>
          </g>
        );
    }
  };

  // If a custom image was uploaded/configured for this side, display it
  if (side === 'front' && book.coverFront) {
    return (
      <div
        className={`relative select-none overflow-hidden transition-transform duration-200 group-hover:-translate-y-1 ${className}`}
        style={{
          aspectRatio: '300 / 420',
          ...(showShadow ? { filter: 'drop-shadow(6px 8px 0px rgba(10, 42, 34, 0.22))' } : {}),
          ...(width ? { width: `${width}px` } : {}),
          ...(height ? { height: `${height}px` } : {}),
        }}
      >
        <img
          src={book.coverFront}
          alt={`Sampul depan ${book.title}`}
          className="w-full h-full object-cover rounded-[2px]"
          loading="lazy"
        />
        {/* Book spine crease shadow for realistic book-sheet feel on the left */}
        <div className="absolute inset-y-0 left-0 w-[4%] bg-gradient-to-r from-black/30 via-white/10 to-transparent pointer-events-none" />
      </div>
    );
  }

  if (side === 'back' && book.coverBack) {
    return (
      <div
        className={`relative select-none overflow-hidden transition-transform duration-200 group-hover:-translate-y-1 ${className}`}
        style={{
          aspectRatio: '300 / 420',
          ...(showShadow ? { filter: 'drop-shadow(6px 8px 0px rgba(10, 42, 34, 0.22))' } : {}),
          ...(width ? { width: `${width}px` } : {}),
          ...(height ? { height: `${height}px` } : {}),
        }}
      >
        <img
          src={book.coverBack}
          alt={`Sampul belakang ${book.title}`}
          className="w-full h-full object-cover rounded-[2px]"
          loading="lazy"
        />
        {/* Book spine crease shadow on the right for back cover */}
        <div className="absolute inset-y-0 right-0 w-[4%] bg-gradient-to-l from-black/30 via-white/10 to-transparent pointer-events-none" />
      </div>
    );
  }

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
        aria-label={`Sampul ${side === 'front' ? 'depan' : 'belakang'} buku ${book.title}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {side === 'back' ? renderBackCoverArt() : renderCoverArt()}

        {/* Realistic book spine crease shadow */}
        {side === 'front' ? (
          <>
            <rect width="9" height="420" fill="rgba(0,0,0,0.24)" />
            <path d="M10 0 V420" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
            <path d="M12 0 V420" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
          </>
        ) : (
          <>
            <rect x="291" width="9" height="420" fill="rgba(0,0,0,0.24)" />
            <path d="M290 0 V420" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
            <path d="M288 0 V420" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
          </>
        )}
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
      aria-label={`Kode Buku ${f}`}
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
            aria-label="Contoh sampul buku"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="320" height="440" fill="#0A7B5B" />
            <rect width="22" height="440" fill="#07553F" />
            <path d="M22 0V440" stroke="rgba(255,255,255,.35)" />
            <g fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="16">
              <circle cx="236" cy="152" r="78" />
              <path d="M266 206l40 52" />
            </g>
            <text x="46" y="48" fontFamily="IBM Plex Mono, monospace" fontSize="8" letterSpacing="1.2" fill="rgba(255,255,255,.8)">
              PT. QISSAH GLOBAL NUSANTARA
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
          </svg>
        </div>

        {/* Floating price badge sticker */}
        <div className="sticker absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-400 text-emerald-950 border-2 border-emerald-950 flex flex-col items-center justify-center text-center shadow-[3px_3px_0_#0A2A22] -rotate-12 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105">
          <small className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-emerald-900 block leading-tight">Mulai</small>
          <b className="font-serif text-base sm:text-lg font-bold leading-none mt-0.5 text-emerald-950">Rp{Math.round(minPrice / 1000)}rb</b>
        </div>
      </div>
      <figcaption className="text-center font-mono text-xs text-emerald-300/80 mt-3 tracking-wider flex items-center justify-center gap-1.5">
        <span>Pratinjau Cetak: Buku Standar Percetakan</span>
        <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
      </figcaption>
    </figure>
  );
};

