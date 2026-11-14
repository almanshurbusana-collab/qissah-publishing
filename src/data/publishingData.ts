/**
 * Data and constants for Qissah Publishing
 * Penerbit buku ber-ISBN di Bogor (PT Qissah Global Nusantara)
 */

export interface Plan {
  id: string;
  name: string;
  tag: string;
  price: number;
  popular?: boolean;
  featured?: boolean;
  pagesLimit: number;
  freeCopies: number;
  features: string[];
  description: string;
  waUrl: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  cat: string;
  price: number;
  pages: string;
  editor: string;
  layout: string;
  size: string;
  dimensions: string;
  paper: string;
  cover: string;
  isbn12: string; // 12-digit prefix, e.g. 978623000001
  isbn: string;   // 13-digit calculated full ISBN string
  who: string;
  desc: string;
  synopsis: string;
  synopsisParagraphs: string[];
  year: number;
  publicationYear: number;
  featured?: boolean;
}

export const COMPANY = {
  name: 'Qissah Publishing',
  legalName: 'PT Qissah Global Nusantara',
  tagline: 'Penerbit Buku Ber-ISBN · Bogor',
  shortDesc: 'Penerbitan buku murah, berkualitas, dan legal untuk dosen, mahasiswa, guru, penulis, dan masyarakat umum.',
  address: 'Jl. Raya Cifor, RT.01/RW.07, Kelurahan Bubulak, Kecamatan Bogor Barat, Kota Bogor, Jawa Barat 16115',
  phone: '0816-4252-777',
  waNumber: '628164252777',
  waDisplay: '0816-4252-777',
  email: 'qissahpublishing@gmail.com',
  kbli: '58110 (Aktivitas Penerbitan Buku)',
  logoUrl: '/images/logo.png',
  legalImgUrl: '/images/legal-certificate.webp',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Raya+Cifor,+RT.01/RW.07,+Kelurahan+Bubulak,+Kecamatan+Bogor+Barat,+Kota+Bogor,+Jawa+Barat+16115',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Raya+Cifor,+RT.01/RW.07,+Kelurahan+Bubulak,+Kecamatan+Bogor+Barat,+Kota+Bogor,+Jawa+Barat+16115',
  waConsultUrl: 'https://wa.me/628164252777?text=Halo%20Redaksi%20Qissah%20Publishing%2C%20saya%20ingin%20berkonsultasi%20mengenai%20penerbitan%20naskah%20buku%20ber-ISBN.',
};

// Helper for WhatsApp link
export function buildWaUrl(message: string): string {
  return `https://wa.me/${COMPANY.waNumber}?text=${encodeURIComponent(message)}`;
}

export function formatRp(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

// EAN-13 calculation for ISBN barcode
const L_PATTERNS = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
const G_PATTERNS = ['0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'];
const R_PATTERNS = ['1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'];
const PARITY_ENCODINGS = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];

export function calculateEan13(d12: string): { full: string; bits: string } {
  if (!d12 || /x/i.test(d12)) {
    return { full: 'xxxxxxxxxxxx', bits: '101' + '0000000'.repeat(12) + '101' };
  }
  // If given a full 13-digit, take the first 12
  const clean12 = d12.replace(/\D/g, '').slice(0, 12).padEnd(12, '0');
  let s = 0;
  for (let i = 0; i < 12; i++) {
    s += parseInt(clean12[i], 10) * (i % 2 === 0 ? 1 : 3);
  }
  const checkDigit = (10 - (s % 10)) % 10;
  const full = clean12 + checkDigit.toString();

  const firstDigit = parseInt(full[0], 10);
  const parity = PARITY_ENCODINGS[firstDigit];
  let bits = '101'; // start guard

  // left 6 digits
  for (let i = 1; i <= 6; i++) {
    const d = parseInt(full[i], 10);
    const pattern = parity[i - 1] === 'L' ? L_PATTERNS[d] : G_PATTERNS[d];
    bits += pattern;
  }
  bits += '01010'; // center guard

  // right 6 digits
  for (let i = 7; i <= 12; i++) {
    const d = parseInt(full[i], 10);
    bits += R_PATTERNS[d];
  }
  bits += '101'; // end guard

  return { full, bits };
}

export function formatIsbn(val: string): string {
  if (!val || /x/i.test(val)) {
    return 'xxxxxxxxxxxx';
  }
  const digits = val.replace(/\D/g, '');
  if (digits.length >= 13) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}-${digits.slice(10, 12)}-${digits.slice(12, 13)}`;
  }
  const ean = calculateEan13(digits);
  return `${ean.full.slice(0, 3)}-${ean.full.slice(3, 6)}-${ean.full.slice(6, 10)}-${ean.full.slice(10, 12)}-${ean.full.slice(12)}`;
}

export const PLANS: Plan[] = [
  {
    id: 'mandiri',
    name: 'Paket Mandiri',
    tag: 'Untuk naskah yang sudah siap',
    price: 450000,
    popular: false,
    featured: false,
    pagesLimit: 100,
    freeCopies: 0,
    description: 'Cocok bagi Anda yang sudah memiliki naskah rapi dan ingin mengurus legalitas ISBN resmi dengan biaya paling hemat.',
    features: [
      'Pengurusan ISBN resmi Perpustakaan Nasional RI',
      'Barcode EAN-13 standar internasional di sampul',
      'Desain sampul standar profesional',
      'Layout isi buku hingga 100 halaman',
      'File master siap cetak (PDF resolusi tinggi)',
      'Konsultasi intensif via WhatsApp',
      'Sertifikat tanda terbit buku ber-ISBN',
    ],
    waUrl: buildWaUrl('Halo Qissah Publishing, saya tertarik memilih *Paket Mandiri (Rp 450.000)*. Naskah saya sudah siap untuk diproses ISBN resminya.'),
  },
  {
    id: 'reguler',
    name: 'Paket Reguler',
    tag: 'Paling Populer & Direkomendasikan',
    price: 950000,
    popular: true,
    featured: true,
    pagesLimit: 200,
    freeCopies: 10,
    description: 'Pilihan utama para dosen, guru, dan penulis: naskah ditata rapi, sampul disesuaikan konsep Anda, plus cetak 10 eksemplar buku fisik.',
    features: [
      'Semua kelengkapan Paket Mandiri',
      'Pengurusan ISBN resmi Perpustakaan Nasional RI',
      'Layout isi buku hingga 200 halaman',
      'Desain sampul eksklusif sesuai konsep Anda',
      'Proofreading & pemeriksaan naskah dasar',
      'Cetak buku fisik 10 eksemplar (Bookpaper/HVS)',
      'Finishing cover laminasi Doff / Glossy',
      'Revisi desain hingga 2 kali',
      'Dipajang di katalog Toko Buku Qissah',
    ],
    waUrl: buildWaUrl('Halo Qissah Publishing, saya tertarik memilih *Paket Reguler (Rp 950.000)* yang paling populer. Mohon info teknis pengiriman naskahnya.'),
  },
  {
    id: 'lengkap',
    name: 'Paket Lengkap',
    tag: 'Dari naskah sampai buku di tangan',
    price: 1850000,
    popular: false,
    featured: false,
    pagesLimit: 250,
    freeCopies: 50,
    description: 'Layanan menyeluruh dari penyuntingan mendalam, penataan isi, desain sampul premium, hingga cetak 50 eksemplar dan pemasaran di toko kami.',
    features: [
      'Semua fasilitas Paket Reguler',
      'Penyuntingan naskah (Copy Editing menyeluruh)',
      'Layout isi buku hingga 250 halaman',
      'Desain sampul premium dengan mockup 3D',
      'Cetak buku fisik 50 eksemplar',
      'Revisi desain hingga 3 kali',
      'Buku dipajang & dipasarkan di Toko Buku Qissah',
      'Banner & e-flyer promosi buku untuk media sosial',
      'Pendampingan penuh dari naskah mentah sampai terbit',
    ],
    waUrl: buildWaUrl('Halo Qissah Publishing, saya tertarik memilih *Paket Lengkap (Rp 1.850.000)* termasuk cetak 50 eksemplar dan copy-editing menyeluruh.'),
  },
];

export const BOOKS: Book[] = [
  {
    id: 'metodologi',
    title: 'Metodologi Penelitian Kuantitatif untuk Pemula',
    author: 'Dr. Rina Kartika, M.Pd.',
    category: 'Akademik & Sains',
    cat: 'Buku Ajar',
    price: 85000,
    pages: 'vi; 214',
    editor: 'Hendra Wijaya, M.Pd.',
    layout: 'Tim Qissah Publishing',
    size: '15,5 × 23 cm',
    dimensions: '15,5 × 23 cm (UNESCO)',
    paper: 'Bookpaper Premium 72 gsm',
    cover: 'Softcover Art Carton 260 gsm Laminasi Doff',
    isbn12: 'xxxxxxxxxxxx',
    isbn: 'xxxxxxxxxxxx',
    who: 'Mahasiswa S1/S2, dosen pengampu, dan peneliti pemula',
    desc: 'Panduan bertahap merancang penelitian kuantitatif: dari rumusan masalah, penyusunan instrumen, uji validitas dan reliabilitas, hingga membaca hasil uji statistik dasar dengan SPSS. Dilengkapi contoh kasus riil dan latihan mandiri di setiap bab.',
    synopsis: 'Buku ini dirancang khusus untuk mematahkan mitos bahwa penelitian kuantitatif itu rumit dan menakutkan bagi pemula. Penulis menyajikan setiap konsep statistik secara terstruktur dengan bahasa yang mengalir dan mudah dipahami, mulai dari hipotesis, teknik sampling, hingga output regresi.',
    synopsisParagraphs: [
      'Buku ini dirancang khusus untuk mematahkan mitos bahwa penelitian kuantitatif itu rumit dan menakutkan bagi pemula. Penulis menyajikan setiap konsep statistik secara terstruktur dengan bahasa yang mengalir dan mudah dipahami.',
      'Mulai dari perumusan hipotesis, teknik sampling representatif, penyusunan kuesioner berskala Likert, hingga interpretasi output regresi dan korelasi dijelaskan langkah demi langkah.',
      'Sangat direkomendasikan sebagai buku rujukan wajib mata kuliah metodologi penelitian di perguruan tinggi.',
    ],
    year: 2026,
    publicationYear: 2026,
    featured: true,
  },
  {
    id: 'guru',
    title: 'Guru Penggerak di Ruang Kelas',
    author: 'Nanda Prasetyo, S.Pd.',
    category: 'Akademik & Sains',
    cat: 'Pendidikan',
    price: 69000,
    pages: 'vi; 168',
    editor: 'Laila Fitriani, M.Pd.',
    layout: 'Tim Qissah Publishing',
    size: '14 × 21 cm',
    dimensions: '14 × 21 cm (A5 Standar)',
    paper: 'Bookpaper Import 72 gsm',
    cover: 'Softcover Art Carton 260 gsm Spot UV',
    isbn12: 'xxxxxxxxxxxx',
    isbn: 'xxxxxxxxxxxx',
    who: 'Guru sekolah dasar hingga menengah, kepala sekolah, dan calon pendidik',
    desc: 'Catatan dan strategi praktis bagi guru yang ingin menggerakkan kelasnya: menyusun pembelajaran berdiferensiasi, membangun budaya belajar yang inklusif, dan berefleksi kritis setelah mengajar.',
    synopsis: 'Mengajar bukan sekadar menuntaskan kurikulum, melainkan menyalakan rasa ingin tahu siswa. Penulis membagikan pengalaman nyata selama lebih dari satu dekade di ruang-ruang kelas Indonesia, memuat lembar refleksi dan asesmen autentik.',
    synopsisParagraphs: [
      'Mengajar bukan sekadar menuntaskan kurikulum, melainkan menyalakan rasa ingin tahu siswa. Penulis membagikan pengalaman nyata selama lebih dari satu dekade di ruang-ruang kelas Indonesia.',
      'Buku ini memuat lembar kerja refleksi, contoh rubrik asesmen autentik, serta kiat mengelola kelas yang heterogen tanpa membuat guru merasa kewalahan.',
      'Bahan bacaan segar yang memadukan teori pedagogi terkini dengan praktik lapangan yang membumi.',
    ],
    year: 2026,
    publicationYear: 2026,
    featured: true,
  },
  {
    id: 'ciliwung',
    title: 'Kisah dari Tepi Ciliwung',
    author: 'Salma Aulia',
    category: 'Sastra & Puisi',
    cat: 'Kumpulan Cerpen',
    price: 59000,
    pages: 'vi; 132',
    editor: 'Rizky Ramadhan, S.S.',
    layout: 'Tim Qissah Publishing',
    size: '13 × 19 cm',
    dimensions: '13 × 19 cm (Saku Prosa)',
    paper: 'Bookpaper 72 gsm Lembut di Mata',
    cover: 'Softcover Matte Doff 260 gsm',
    isbn12: 'xxxxxxxxxxxx',
    isbn: 'xxxxxxxxxxxx',
    who: 'Pencinta fiksi, penikmat sastra kontemporer, dan pembaca umum',
    desc: 'Sembilan cerita pendek tentang denyut kehidupan orang-orang di sepanjang aliran sungai Ciliwung, dari penarik rakit bambu, pedagang pasar basah, hingga anak-anak yang memelihara mimpi di antara pemukiman rapat.',
    synopsis: 'Ciliwung menyimpan riwayat yang tak pernah habis dialirkan. Di tangan Salma Aulia, suara-suara lirih yang kerap luput dari perhatian kota diangkat menjadi prosa yang memikat, hangat, dan mengharukan.',
    synopsisParagraphs: [
      'Ciliwung menyimpan riwayat yang tak pernah habis dialirkan. Di tangan Salma Aulia, suara-suara lirih yang kerap luput dari perhatian kota diangkat menjadi prosa yang memikat dan mengharukan.',
      'Setiap cerita merajut kehangatan persaudaraan, pergulatan bertahan hidup, dan aroma tanah basah seusai hujan lebat mengguyur hulu.',
      'Karya sastra yang sarat empati dan mengingatkan kita akan arti rumah dan ketabahan.',
    ],
    year: 2025,
    publicationYear: 2025,
    featured: true,
  },
  {
    id: 'menulis',
    title: 'Menulis Buku Pertama untuk Orang Sibuk',
    author: 'Aulia Rahmawati, S.S.',
    category: 'Memoar & Panduan',
    cat: 'Nonfiksi',
    price: 75000,
    pages: 'vi; 176',
    editor: 'Bagus Setiawan, M.Hum.',
    layout: 'Tim Qissah Publishing',
    size: '14 × 21 cm',
    dimensions: '14 × 21 cm (A5 Standar)',
    paper: 'Bookpaper Premium 72 gsm',
    cover: 'Softcover Art Carton 260 gsm Doff',
    isbn12: 'xxxxxxxxxxxx',
    isbn: 'xxxxxxxxxxxx',
    who: 'Profesional, karyawan, penulis pemula, dan siapapun yang ingin menerbitkan buku',
    desc: 'Panduan taktis menuntaskan naskah buku pertama di tengah rutinitas padat: merumuskan ide sentral, memecah kerangka menjadi target mikro 20 menit sehari, dan menyunting mandiri sebelum diajukan ke penerbit.',
    synopsis: 'Alasan nomor satu mengapa naskah tak pernah selesai bukanlah ketiadaan bakat, melainkan ketiadaan sistem yang selaras dengan kesibukan sehari-hari. Panduan ini membongkar rahasia produktivitas menulis 300 kata bermutu setiap pagi.',
    synopsisParagraphs: [
      'Alasan nomor satu mengapa naskah tak pernah selesai bukanlah ketiadaan bakat, melainkan ketiadaan sistem yang selaras dengan kesibukan sehari-hari.',
      'Aulia Rahmawati membongkar rahasia produktivitas menulis: bagaimana menghasilkan 300 kata bermutu setiap pagi, mengorganisasi riset tanpa tersesat, dan menjaga konsistensi dari halaman judul hingga bab penutup.',
      'Dilengkapi panduan praktis pengurusan ISBN, anatomi buku standar, dan kiat memilih penerbit yang tepat.',
    ],
    year: 2026,
    publicationYear: 2026,
    featured: true,
  },
  {
    id: 'fiqih-digital',
    title: 'Fiqih Muamalah Digital & Ekonomi Islam',
    author: 'Dr. H. Ahmad Fauzi, M.E.I.',
    category: 'Agama & Hikmah',
    cat: 'Buku Ajar',
    price: 88000,
    pages: 'viii; 248',
    editor: 'Tim Akademik Qissah',
    layout: 'Tim Qissah Publishing',
    size: '15,5 × 23 cm',
    dimensions: '15,5 × 23 cm (UNESCO)',
    paper: 'HVS Premium 70 gsm White Clean',
    cover: 'Softcover Laminasi Glossy Emboss Gold',
    isbn12: 'xxxxxxxxxxxx',
    isbn: 'xxxxxxxxxxxx',
    who: 'Mahasiswa ekonomi syariah, praktisi fintech, dan akademisi',
    desc: 'Tinjauan komprehensif kaidah fiqih muamalah klasik dalam merespons transaksi modern: e-wallet, paylater, peer-to-peer lending syariah, dan cryptocurrency menurut fatwa DSN-MUI terkini.',
    synopsis: 'Perkembangan teknologi finansial menuntut pemahaman fiqih yang adaptif tanpa meninggalkan prinsip dasar syariah. Buku ini mengurai akad kontemporer dengan diagram alir yang jernih dan studi kasus nyata perbankan syariah.',
    synopsisParagraphs: [
      'Perkembangan teknologi finansial menuntut pemahaman fiqih yang adaptif tanpa meninggalkan prinsip dasar syariah.',
      'Buku ini mengurai akad-akad kontemporer dengan diagram alir yang jernih, membedah studi kasus nyata perbankan syariah, serta menyajikan perbandingan fatwa internasional.',
      'Sangat relevan untuk bahan ajar perkuliahan maupun pegangan praktisi keuangan digital.',
    ],
    year: 2026,
    publicationYear: 2026,
    featured: false,
  },
  {
    id: 'antologi-bogor',
    title: 'Kidung Hujan di Kota Hujan',
    author: 'Komunitas Penulis Bogor',
    category: 'Sastra & Puisi',
    cat: 'Kumpulan Cerpen',
    price: 52000,
    pages: 'iv; 118',
    editor: 'Rizky Ramadhan, S.S.',
    layout: 'Tim Qissah Publishing',
    size: '13 × 19 cm',
    dimensions: '13 × 19 cm (Saku Prosa)',
    paper: 'Bookpaper Import 72 gsm',
    cover: 'Softcover Matte Doff 260 gsm',
    isbn12: 'xxxxxxxxxxxx',
    isbn: 'xxxxxxxxxxxx',
    who: 'Pencinta puisi, komunitas sastra, dan warga Bogor',
    desc: 'Antologi puisi bertema keindahan, nostalgia, dan romansa Kota Bogor dari sudut pandang puluhan penulis lokal lintas generasi.',
    synopsis: 'Bogor dengan kabut tipis di Kebun Raya, dentang lonceng stasiun tua, dan aroma aspal basah di kala senja terangkum manis dalam larik-larik puisi. Bukti nyata suburnya literasi komunitas lokal Bogor.',
    synopsisParagraphs: [
      'Bogor dengan kabut tipis di Kebun Raya, dentang lonceng stasiun tua, dan aroma aspal basah di kala senja terangkum manis dalam larik-larik puisi.',
      'Buku ini menjadi bukti bahwa semangat berkarya komunitas literasi lokal tetap mekar subur.',
      'Cocok dinikmati sambil ditemani secangkir kopi hangat di sore hari yang gerimis.',
    ],
    year: 2025,
    publicationYear: 2025,
    featured: false,
  },
];

export const ADVANTAGES = [
  {
    id: 'isbn',
    badge: '01',
    icon: 'isbn',
    title: 'Profesional',
    desc: 'Kami mengelola setiap buku dengan Profesional dan standar tinggi untuk memastikan hasil kerja Buku Anda tampil profesional dan akademik.',
    description: 'Kami mengelola setiap buku dengan Profesional dan standar tinggi untuk memastikan hasil kerja Buku Anda tampil profesional dan akademik.',
  },
  {
    id: 'tag',
    badge: '02',
    icon: 'tag',
    title: 'Biaya Transparan & Terjangkau',
    desc: 'Harga paket tertulis jelas tanpa biaya tersembunyi. Naskah Anda dikerjakan profesional dengan harga yang sangat masuk akal bagi civitas akademika dan umum.',
    description: 'Harga paket tertulis jelas tanpa biaya tersembunyi. Naskah Anda dikerjakan profesional dengan harga yang sangat masuk akal bagi civitas akademika dan umum.',
  },
  {
    id: 'box',
    badge: '03',
    icon: 'box',
    title: 'Cetak Sesuai Kebutuhan (POD)',
    desc: 'Tidak ada kewajiban mencetak ratusan eksemplar. Anda bisa mencetak 10, 50, atau 100 eksemplar sesuai kebutuhan mengajar atau komunitas.',
    description: 'Tidak ada kewajiban mencetak ratusan eksemplar. Anda bisa mencetak 10, 50, atau 100 eksemplar sesuai kebutuhan mengajar atau komunitas.',
  },
  {
    id: 'pen',
    badge: '04',
    icon: 'pen',
    title: 'Layout & Desain Sampul Rapi',
    desc: 'Isi buku ditata menurut kaidah tipografi penerbitan buku standar, dan sampul dirancang profesional mengikuti tema serta karakter naskah Anda.',
    description: 'Isi buku ditata menurut kaidah tipografi penerbitan buku standar, dan sampul dirancang profesional mengikuti tema serta karakter naskah Anda.',
  },
  {
    id: 'chat',
    badge: '05',
    icon: 'chat',
    title: 'Pendampingan Ramah via WhatsApp',
    desc: 'Anda bisa berkonsultasi langsung dengan admin dan tim editor kami kapan saja selama proses penerbitan, dari draf mentah hingga buku terbit.',
    description: 'Anda bisa berkonsultasi langsung dengan admin dan tim editor kami kapan saja selama proses penerbitan, dari draf mentah hingga buku terbit.',
  },
  {
    id: 'shop',
    badge: '06',
    icon: 'shop',
    title: 'Bisa Dijual di Toko Buku Qissah',
    desc: 'Karya Anda berkesempatan dipajang di etalase Toko Buku Qissah Publishing sehingga mudah dipesan langsung oleh pembaca di seluruh Indonesia.',
    description: 'Karya Anda berkesempatan dipajang di etalase Toko Buku Qissah Publishing sehingga mudah dipesan langsung oleh pembaca di seluruh Indonesia.',
  },
];

export const STEPS = [
  {
    step: '1',
    num: '1',
    title: 'Konsultasi & Kirim Naskah',
    desc: 'Hubungi admin lewat WhatsApp, ceritakan tema buku Anda, lalu kirim naskah dalam format Microsoft Word (.docx).',
    description: 'Hubungi admin lewat WhatsApp, ceritakan tema buku Anda, lalu kirim naskah dalam format Microsoft Word (.docx).',
  },
  {
    step: '2',
    num: '2',
    title: 'Pilih Paket & Konfirmasi',
    desc: 'Pilih paket penerbitan yang paling cocok. Tim kami mengirim invoice resmi dan jadwal pengerjaan proyek.',
    description: 'Pilih paket penerbitan yang paling cocok. Tim kami mengirim invoice resmi dan jadwal pengerjaan proyek.',
  },
  {
    step: '3',
    num: '3',
    title: 'Layout & Desain Sampul',
    desc: 'Tim desainer dan layouter kami menata naskah dan merancang sampul buku, lalu mengirimkan draf digital untuk Anda periksa.',
    description: 'Tim desainer dan layouter kami menata naskah dan merancang sampul buku, lalu mengirimkan draf digital untuk Anda periksa.',
  },
  {
    step: '4',
    num: '4',
    title: 'Revisi, ISBN, & Persetujuan',
    desc: 'Anda memeriksa draf cetak digital. Kami mengurus pengajuan ISBN ke Perpusnas RI hingga naskah akhir disetujui (final proof).',
    description: 'Anda memeriksa draf cetak digital. Kami mengurus pengajuan ISBN ke Perpusnas RI hingga naskah akhir disetujui (final proof).',
  },
  {
    step: '5',
    num: '5',
    title: 'Cetak & Kirim ke Alamat',
    desc: 'Buku dicetak rapi sesuai jumlah eksemplar paket yang Anda pilih, dipacking aman, dan dikirim langsung ke alamat Anda.',
    description: 'Buku dicetak rapi sesuai jumlah eksemplar paket yang Anda pilih, dipacking aman, dan dikirim langsung ke alamat Anda.',
  },
];

export const TESTIMONIALS = [
  {
    id: 't-rina',
    author: 'Dr. Rina Kartika, M.Pd.',
    name: 'Dr. Rina Kartika, M.Pd.',
    role: 'Dosen Universitas Pakuan Bogor',
    bookTitle: 'Metodologi Penelitian Kuantitatif untuk Pemula',
    quote: 'Proses penerbitan buku ajar saya di Qissah Publishing sangat cepat dan transparan. Pengurusan ISBN lancar, layout rapi, dan admin sangat kooperatif saat revisi.',
  },
  {
    id: 't-nanda',
    author: 'Nanda Prasetyo, S.Pd.',
    name: 'Nanda Prasetyo, S.Pd.',
    role: 'Guru & Penulis Buku Pendidikan',
    bookTitle: 'Guru Penggerak di Ruang Kelas',
    quote: 'Saya sempat ragu karena naskah saya baru draf mentah. Tapi tim Qissah mendampingi dari penataan bab sampai desain sampul yang sesuai dengan visi saya.',
  },
  {
    id: 't-salma',
    author: 'Salma Aulia',
    name: 'Salma Aulia',
    role: 'Penulis Fiksi & Cerpen',
    bookTitle: 'Kisah dari Tepi Ciliwung',
    quote: 'Menerbitkan kumpulan cerpen impian saya jadi kenyataan dengan harga yang sangat ramah kantong. Buku fisik hasil cetaknya berkualitas dan ber-ISBN resmi.',
  },
];

export const FAQS = [
  {
    q: 'Siapa yang memegang hak cipta atas buku yang diterbitkan?',
    a: 'Hak cipta (copyright) naskah sepenuhnya tetap menjadi milik penulis 100%. Qissah Publishing hanya bertindak sebagai penerbit dan pengelola teknis penerbitan.',
  },
  {
    q: 'Berapa lama proses dari kirim naskah sampai buku terbit?',
    a: 'Untuk Paket Mandiri dan Reguler, proses layout dan desain sampul berkisar 5–10 hari kerja. Pengajuan ISBN ke Perpusnas RI bergantung pada antrean sistem Perpusnas (rata-rata 3–7 hari kerja). Proses cetak buku fisik memakan waktu 4–7 hari kerja.',
  },
  {
    q: 'Bolehkah mencetak buku dalam jumlah sedikit (misal 5 atau 10 eksemplar)?',
    a: 'Sangat boleh! Qissah Publishing menggunakan teknologi cetak digital Print-on-Demand (POD) mutakhir, sehingga Anda tidak diwajibkan mencetak ratusan eksemplar seperti di penerbit konvensional.',
  },
  {
    q: 'Apakah buku hasil terbitan bisa dijual ke publik?',
    a: 'Bisa. Buku Anda sudah ber-ISBN dan barcode resmi sehingga sah untuk diedarkan secara komersial. Kami juga menyediakan etalase Toko Buku Qissah di website ini untuk memudahkan calon pembaca Anda.',
  },
];
