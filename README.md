# 🦷 drg. Andini Putri, Sp.Ort — Modern Orthodontist & Dental Care Portfolio

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Website Status](https://img.shields.io/badge/status-active-success.svg)](#)
[![Performance](https://img.shields.io/badge/Performance-Optimized_WebP-0284c7.svg)](#)
[![Responsive](https://img.shields.io/badge/Design-100%25_Responsive-38bdf8.svg)](#)

> **Website Portofolio Medis & Sistem Booking Konsultasi Interaktif** untuk Dokter Gigi Spesialis Ortodonti (*Orthodontist & Smile Architect*). Dirancang dengan estetika medis modern, performa tinggi, dan pengalaman pengguna (*User Experience*) yang mulus di seluruh perangkat.

---

## 🌟 Cuplikan Tampilan & Fitur Utama

- 🩺 **Desain UI/UX Medis Premium**: Nuansa warna *medical ocean blue*, tipografi modern (*Plus Jakarta Sans* & *Caveat*), aksen *glassmorphism*, dan transisi mikro yang elegan.
- ⚡ **Optimasi WebP Berkecepatan Tinggi**: Kompresi aset gambar hingga **-87.4%** tanpa kehilangan detail visual untuk waktu *render* instan.
- 📱 **Desain Adaptif & Responsif**: Tampilan disesuaikan sempurna untuk Desktop, Tablet, dan Mobile.
- 💬 **Integrasi WhatsApp Langsung**: Generator otomatis pesan konsultasi dan booking janji temu klinik.

---

## 🚀 Fitur Unggulan

### 1. 🏠 Hero Section & Trust Metrics
- Headline persuasif dengan nilai keunggulan klinis.
- Kartu kredensial dokter, pengalaman 10+ tahun, 1.800+ senyum tertransformasi, dan rating kepuasan 4.9/5.0.
- Teaser interaktif perbandingan senyum *Before & After*.

### 2. 👩‍⚕️ Profil Dokter & Kredensial Medis
- Ringkasan profil pendidikan spesialis ortodonti (FKG Unpad) dan sertifikasi internasional (*Invisalign® Platinum Certified*, *Damon™ System Masterclass*, *TADs Korea*, *IKORTI*, *PDGI*, *WFO*, *AAO*).
- **Modal Detail Dokter**: Riwayat lengkap disertai ikon vektor SVG khusus untuk 7 fokus keahlian klinis.
- **Lightbox Zoom Sertifikat**: Pratinjau sertifikat resolusi tinggi dengan verifikasi kredensial.

### 3. 💎 Layanan & Perawatan Ortodonti
- Katalog layanan lengkap: *Behel Self-Ligating Damon System*, *Invisalign® Clear Aligners*, *Behel Keramik Estetis*, *Behel Metal Presisi*, *Retainer Pasca Behel*, dan *Ortodonti Interseptif Anak*.
- Label harga transparan, estimasi durasi perawatan, serta tombol booking instan.

### 4. 🔄 Galeri Hasil Nyata (Before & After)
- Dokumentasi kasus klinis nyata (*Crowded Teeth*, *Diastema/Gigi Renggang*, *Overjet*, dll.).
- Filter kategori interaktif dan status *coming soon placeholder* jika kasus baru sedang dikurasi.

### 5. 💬 Slider Testimoni Pasien (*Customer Say*)
- Testimoni nyata pasien dengan visual foto sebelum/sesudah.
- Slider interaktif dengan tombol *Next/Prev*, indikator slide (*pagination dots*), dan swipe halus di perangkat mobile.

### 6. 📚 Hub Edukasi & Artikel Klinis
- Artikel kesehatan gigi dan panduan behel terpercaya langsung dari dokter spesialis.
- **Pemuatan Bertahap (*Load More Pagination*)**: Memuat 3 artikel awal untuk kecepatan maksimal dengan tombol interaktif **"Muat Lebih Banyak Artikel"** (*3 dari 10*).
- Modal baca artikel lengkap dengan konten ilmiah ramah awam.

### 7. ❓ FAQ Interaktif
- Accordion tanya-jawab seputar estimasi biaya, penanganan rasa ngilu, pantangan makanan, dan kontrol rutin behel.

### 8. 📅 Jadwal Praktik & Sistem Booking Modal
- Jadwal praktik aktif di 3 lokasi klinik:
  - 🏥 **RS Hermina Pasteur Bandung**
  - 🏥 **RSGM Unpad Sekeloa Bandung**
  - 🏥 **Dental Care Dago Bandung**
- Modal pemesanan jadwal terintegrasi yang langsung menghasilkan pesan *pre-filled* WhatsApp ke admin klinik.

---

## 🛠️ Teknologi yang Digunakan

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Struktur** | `HTML5` | Semantic HTML, SEO Best Practices, Accessibility (ARIA) |
| **Styling** | `Vanilla CSS3` | Custom Design System, Flexbox, CSS Grid, Glassmorphism, Zero Framework Dependency |
| **Interaktivitas** | `Vanilla JavaScript (ES6+)` | Modular scripts, slider logic, interactive modals, filter state management |
| **Aset Grafis** | `WebP & SVG` | Format gambar WebP super-ringan & ikon vektor SVG tajam tanpa blur |
| **Tipografi** | `Google Fonts` | *Plus Jakarta Sans* & *Caveat Handwriting* |

---

## 📁 Struktur Direktori

```text
portofolio-dokter-gigi/
├── .gitignore               # Konfigurasi pengabaian file temp/editor
├── index.html               # Halaman utama aplikasi portofolio
├── README.md                # Dokumentasi proyek
└── assets/
    ├── css/
    │   └── style.css        # Stylesheet utama & sistem desain lengkap
    ├── js/
    │   └── main.js          # Logika JavaScript modul, filter, slider, & modal
    └── images/              # Seluruh aset visual WebP & SVG
        ├── about_doctor.webp
        ├── hero_doctor.webp
        ├── tooth_mascot_3d.webp
        ├── cert_*.svg       # Ikon kredensial & sertifikat resmi
        ├── case_*.webp      # Dokumentasi kasus Before/After
        ├── article_*.webp   # Thumbnail artikel edukasi
        └── ...
```

---

## ⚡ Panduan Instalasi & Menjalankan Lokal

### Prasyarat
- Web Browser modern (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
- Web server lokal opsional (Live Server VS Code, XAMPP, Nginx, atau Apache).

### Langkah Menjalankan:
1. **Clone repository ini**:
   ```bash
   git clone https://github.com/hisyamabilkhoir/portofolio-dokter-gigi.git
   ```
2. **Masuk ke folder project**:
   ```bash
   cd portofolio-dokter-gigi
   ```
3. **Jalankan aplikasi**:
   - Jika menggunakan **VS Code Live Server**: Klik kanan pada `index.html` $\rightarrow$ pilih **"Open with Live Server"**.
   - Jika menggunakan **XAMPP**: Pindahkan folder ke `htdocs` lalu akses `http://localhost/portofolio-dokter-gigi/` melalui browser.
   - Atau cukup klik dua kali file `index.html` untuk membuka langsung di browser.

---

## 🌐 Deploy ke GitHub Pages (Opsional)

Project ini siap dipublikasikan secara gratis melalui **GitHub Pages**:
1. Masuk ke tab **Settings** di repository GitHub Anda.
2. Buka menu **Pages** di bilah navigasi kiri.
3. Pada bagian **Branch**, pilih `main` dan folder `/(root)`.
4. Klik **Save**. Dalam hitungan detik website Anda akan aktif di:
   `https://hisyamabilkhoir.github.io/portofolio-dokter-gigi/`

---

## 👨‍💻 Kontributor & Lisensi

- **Dokter Spesialis**: drg. Andini Putri, Sp.Ort
- **Pengembang**: [Hisyam Abil Khoir](https://github.com/hisyamabilkhoir)
- **Lisensi**: Proyek ini dilisensikan di bawah lisensi [MIT License](LICENSE).

---

<div align="center">
  <sub>Dibuat dengan ❤️ untuk senyum sehat dan percaya diri.</sub>
</div>
