/**
 * drg. Andini Putri, Sp.Ort - Portfolio & Clinic Interactive JavaScript
 * Modern Vanilla JS for GitHub Pages
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBeforeAfterSlider();
  initResultFilters();
  initTestimonialCarousel();
  initArticleFilters();
  initFaqAccordion();
  initArticleModal();
  initBookingModal();
  initDoctorModal();
  initCertificateModal();
  initLiveScheduleStatus();
  initScrollTop();
});

/* ==========================================================================
   1. NAVBAR & MOBILE MENU & SCROLL SPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll listener for sticky navbar effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy active indicator
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }
}

/* ==========================================================================
   2. INTERACTIVE BEFORE & AFTER SLIDER
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.querySelector('.before-after-slider-box');
  if (!container) return;

  const afterImageWrapper = container.querySelector('.ba-after');
  const sliderHandle = container.querySelector('.ba-slider-handle');
  if (!sliderHandle) return;

  let isDragging = false;

  function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let position = ((x - rect.left) / rect.width) * 100;
    
    // Bounds check
    if (position < 5) position = 5;
    if (position > 95) position = 95;

    if (afterImageWrapper) {
      afterImageWrapper.style.width = `${position}%`;
    }
    sliderHandle.style.left = `${position}%`;
  }

  function onPointerDown(e) {
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setSliderPosition(clientX);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setSliderPosition(clientX);
  }

  function onPointerUp() {
    isDragging = false;
  }

  container.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  container.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);
}

/* ==========================================================================
   3. RESULT CASE FILTERS & COMING SOON STATE
   ========================================================================== */
function initResultFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const resultCards = document.querySelectorAll('.result-card');
  const emptyState = document.getElementById('resultsEmptyState');
  const emptyCategoryName = document.querySelector('.empty-category-name');
  const resetBtn = document.querySelector('.btn-reset-filter');

  function applyFilter(filterValue, filterLabel) {
    let visibleCount = 0;

    resultCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.transition = 'opacity 0.35s ease';
          card.style.opacity = '1';
        }, 20);
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      if (visibleCount === 0) {
        if (emptyCategoryName) {
          emptyCategoryName.innerText = filterLabel || 'Pilihan Ini';
        }
        emptyState.style.display = 'block';
        emptyState.style.opacity = '0';
        setTimeout(() => {
          emptyState.style.transition = 'opacity 0.35s ease';
          emptyState.style.opacity = '1';
        }, 20);
      } else {
        emptyState.style.display = 'none';
      }
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      const filterLabel = btn.innerText.trim();
      applyFilter(filterValue, filterLabel);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
      if (allBtn) {
        allBtn.click();
      }
    });
  }
}

/* ==========================================================================
   4. FAQ ACCORDION & CATEGORY FILTER & LIVE SEARCH
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-mockup-item, .faq-item');
  const searchInput = document.querySelector('.faq-search-input');
  const catBtns = document.querySelectorAll('.faq-cat-btn');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  // Filter function that handles combined category + search
  function applyFilters() {
    faqItems.forEach(item => {
      const itemCat = item.getAttribute('data-cat') || 'perawatan';
      const questionText = (item.querySelector('.faq-item-title, .faq-question-title')?.innerText || '').toLowerCase();
      const answerText = (item.querySelector('.faq-mockup-text, .faq-answer-content')?.innerText || '').toLowerCase();

      const matchesCat = (currentCategory === 'all') || (itemCat === currentCategory);
      const matchesSearch = !currentSearchQuery || questionText.includes(currentSearchQuery) || answerText.includes(currentSearchQuery);

      if (matchesCat && matchesSearch) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Accordion Toggle
  faqItems.forEach(item => {
    const headerBtn = item.querySelector('.faq-mockup-header, .faq-question-btn');
    const body = item.querySelector('.faq-mockup-body, .faq-answer-wrap');

    if (!headerBtn || !body) return;

    // Set initial maxHeight for pre-active item
    if (item.classList.contains('active')) {
      body.style.maxHeight = body.scrollHeight + 'px';
      headerBtn.setAttribute('aria-expanded', 'true');
    } else {
      body.style.maxHeight = null;
      headerBtn.setAttribute('aria-expanded', 'false');
    }

    headerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherHeader = otherItem.querySelector('.faq-mockup-header, .faq-question-btn');
          const otherBody = otherItem.querySelector('.faq-mockup-body, .faq-answer-wrap');
          if (otherBody) otherBody.style.maxHeight = null;
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        body.style.maxHeight = null;
        headerBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
        headerBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Category Filter Buttons
  catBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.getAttribute('data-cat') || 'all';

      // If already active and not 'all', toggle back to 'all'
      if (btn.classList.contains('active') && cat !== 'all') {
        catBtns.forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('.faq-cat-btn[data-cat="all"]');
        if (allBtn) allBtn.classList.add('active');
        currentCategory = 'all';
      } else {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = cat;
      }

      applyFilters();
    });
  });

  // Live Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

/* ==========================================================================
   5. ARTICLES DATA, DYNAMIC RENDER & MODAL VIEWER
   ========================================================================== */
const articlesData = {
  1: {
    id: 1,
    filterKey: 'behel',
    category: 'Behel',
    tag: 'Panduan Behel',
    date: '12 Sept 2026',
    modalDate: '12 September 2026',
    readTime: '4 menit baca',
    views: '2.4K',
    title: 'Panduan Lengkap Memilih Behel: Metal, Ceramic, atau Invisalign?',
    excerpt: 'Kenali perbedaan material, kelebihan, kekurangan, serta estimasi biaya perawatan untuk menentukan pilihan yang tepat bagi senyum Anda.',
    image: 'assets/images/article_featured_woman.webp?v=6.1',
    annotation: 'Pilihan tepat<br>untuk senyum terbaik',
    hasThumbs: true,
    hasSparkBadge: false,
    content: `
      <p>Memilih jenis behel atau perata gigi adalah keputusan penting yang memengaruhi kenyamanan, estetika, dan anggaran perawatan Anda. Berikut rangkuman perbandingan medis dari sudut pandang spesialis ortodonti:</p>
      
      <h4>1. Behel Konvensional (Metal Braces)</h4>
      <p>Pilihan paling populer, tahan lama, dan sangat efektif menangani kasus maloklusi gigi ringan hingga yang paling kompleks. Menggunakan bracket stainless steel medis berkualitas tinggi yang dipadukan dengan kawat nickel-titanium (NiTi).</p>
      <ul>
        <li><strong>Kelebihan:</strong> Paling ekonomis, sangat kuat, daya cengkeram presisi, serta pasien bebas memilih warna karet (o-ring) setiap kontrol.</li>
        <li><strong>Pertimbangan:</strong> Bracket logam terlihat jelas saat berbicara dan tersenyum, memerlukan adaptasi pipi di awal pemasangan.</li>
      </ul>

      <h4>2. Behel Ceramic (Keramik Estetis)</h4>
      <p>Memiliki mekanisme kerja yang sama persis dengan behel metal, namun bracket dibuat dari kristal polikristalin atau monokristalin safir transparan yang menyatu dengan warna alami email gigi.</p>
      <ul>
        <li><strong>Kelebihan:</strong> Sangat estetis dan hampir tidak kentara dari jarak normal, pilihan favorit profesional muda dan pekerja korporat.</li>
        <li><strong>Pertimbangan:</strong> Material keramik sedikit lebih getas dibanding metal, sehingga pasien perlu lebih hati-hati saat menggigit makanan keras.</li>
      </ul>

      <h4>3. Invisalign (Clear Aligners)</h4>
      <p>Inovasi ortodonti termutakhir menggunakan serangkaian tray plastik bening medis (SmartTrack™) yang dicetak presisi berbasis pemindaian 3D digital iTero intraoral scanner.</p>
      <ul>
        <li><strong>Kelebihan:</strong> Praktis tanpa kawat, nyaris tak terlihat, dapat dilepas saat makan dan menyikat gigi, minim rasa nyeri, dan tidak ada batasan menu makanan.</li>
        <li><strong>Pertimbangan:</strong> Membutuhkan disiplin tinggi (wajib dipakai 20–22 jam sehari) dan investasi biaya yang relatif lebih tinggi.</li>
      </ul>

      <div style="background: var(--primary-50); border-left: 4px solid var(--primary-600); padding: 14px 18px; border-radius: 8px; margin: 20px 0;">
        <strong style="color: var(--primary-800);">Rekomendasi Dokter:</strong>
        <p style="margin: 4px 0 0; color: var(--slate-700); font-size: 0.9rem;">Setiap jenis behel memiliki keunggulannya masing-masing. Langkah pertama terbaik adalah melakukan konsultasi awal dan foto rontgen panoramic untuk memetakan anatomi gigi serta target senyum ideal Anda.</p>
      </div>
    `
  },
  2: {
    id: 2,
    filterKey: 'perawatan',
    category: 'Perawatan',
    tag: 'Perawatan',
    date: '28 Ags 2026',
    modalDate: '28 Agustus 2026',
    readTime: '5 menit baca',
    views: '1.8K',
    title: 'Berapa Lama Sebenarnya Waktu yang Dibutuhkan untuk Merapikan Gigi?',
    excerpt: 'Faktor biologis apa saja yang menentukan cepat lambatnya pergerakan gigi dan bagaimana cara disiplin kontrol mempercepat prosesnya.',
    image: 'assets/images/article_teeth_duration.webp?v=6.1',
    annotation: 'Hasil optimal<br>untuk senyum rapi',
    hasThumbs: false,
    hasSparkBadge: false,
    content: `
      <p>Pertanyaan yang paling sering ditanyakan oleh pasien sebelum memulai perawatan ortodonti adalah: <em>"Dok, berapa lama saya harus pakai behel?"</em></p>
      
      <p>Secara umum, durasi rata-rata pemakaian kawat gigi berkisar antara <strong>12 hingga 24 bulan</strong>. Namun, durasi ini bersifat sangat individual bergantung pada respons biologis dan anatomi masing-masing pasien.</p>

      <h4>4 Faktor Utama yang Menentukan Kecepatan Perawatan:</h4>
      <ul>
        <li><strong>1. Derajat Keparahan Kasus (Maloklusi):</strong> Gigi berjejal (crowding) ringan atau diastema (celah renggang) biasanya tuntas dalam 8–12 bulan. Sebaliknya, kasus crossbite, overjet berat (tonggos), atau gigitan terbalik memerlukan waktu 18–24 bulan untuk rekonsiliasi lengkung rahang.</li>
        <li><strong>2. Respon Remodeling Tulang Alveolar:</strong> Gigi bergerak karena adanya proses resorpsi dan aposisi tulang pendukung di sekitar akar gigi. Usia remaja memiliki metabolisme tulang yang lebih responsif, meski pasien dewasa tetap bergerak stabil.</li>
        <li><strong>3. Kepatuhan Jadwal Kontrol Rutin:</strong> Mengganti kawat archwire, power chain, dan memakai karet intermaksilari (elastics) secara disiplin sesuai instruksi dokter menjaga tekanan biomekanik gigi tetap kontinu.</li>
        <li><strong>4. Kesehatan Jaringan Periodontal:</strong> Gusi yang bebas dari radang/plak memastikan pergerakan gigi berjalan lancar tanpa komplikasi resorpsi akar abnormal.</li>
      </ul>

      <div style="background: var(--primary-50); border-left: 4px solid var(--primary-600); padding: 14px 18px; border-radius: 8px; margin: 20px 0;">
        <strong style="color: var(--primary-800);">Tahapan Alur Perawatan Ortodonti:</strong>
        <p style="margin: 4px 0 0; color: var(--slate-700); font-size: 0.9rem;"><strong>Tahap 1:</strong> Leveling & Alignment (meratakan lengkung) → <strong>Tahap 2:</strong> Space Closure / Bite Correction (menutup ruang & gigitan) → <strong>Tahap 3:</strong> Finishing & Detailing (penyempurnaan oklusi) → <strong>Tahap 4:</strong> Retention (memakai retainer).</p>
      </div>
    `
  },
  3: {
    id: 3,
    filterKey: 'kesehatan',
    category: 'Kesehatan Gigi',
    tag: 'Kesehatan Gigi',
    date: '15 Ags 2026',
    modalDate: '15 Agustus 2026',
    readTime: '3 menit baca',
    views: '1.5K',
    title: 'Kenapa Gigi Terasa Nyeri dan Ngilu Setelah Kontrol Behel?',
    excerpt: 'Penjelasan medis di balik rasa ngilu saat kawat gigi dikencangkan dan 5 cara efektif meredakannya secara alami di rumah.',
    image: 'assets/images/article_toothache_girl.webp?v=6.1',
    annotation: 'Adaptasi nyaman<br>tanpa khawatir',
    hasThumbs: false,
    hasSparkBadge: true,
    content: `
      <p>Banyak pasien baru merasa cemas ketika gigi terasa ngilu, sensitif saat mengunyah, atau sedikit goyang setelah pemasangan atau penggantian kawat behel. Jangan panik, ini adalah tanda fisiologis normal bahwa gigi Anda mulai aktif bergerak menuju posisi ideal!</p>

      <h4>Mekanisme Ilmiah di Balik Rasa Pegal:</h4>
      <p>Ketika kawat archwire diaktifkan, kawat tersebut memberikan tekanan konstan pada bracket. Tekanan ini memicu pelepasan mediator inflamasi alami (prostaglandin) pada ligamen periodontal di sekitar akar gigi. Akibatnya, saraf gigi menjadi lebih sensitif sementara waktu (biasanya berlangsung 2 hingga 4 hari).</p>

      <h4>5 Tips Nyaman Melewati Masa Adaptasi Kontrol:</h4>
      <ul>
        <li><strong>Konsumsi Makanan Bertekstur Lembut:</strong> Pilih oatmeal, bubur ayam, sup krim labu, mashed potato, smoothies buah dingin, atau scramble egg di 3 hari pertama.</li>
        <li><strong>Aplikasikan Orthodontic Relief Wax:</strong> Ambil sedikit lilin ortodonti, bulat-bulatkan dengan jari, lalu tempelkan di bracket atau ujung kawat yang terasa menggesek mukosa pipi.</li>
        <li><strong>Kumur Air Garam Hangat:</strong> Larutkan 1/2 sendok teh garam halus ke dalam 200 ml air hangat. Kumur 3x sehari untuk meredakan inflamasi gusi secara alami.</li>
        <li><strong>Minum Air Dingin / Es:</strong> Suhu dingin membantu menonaktifkan sementara fleksibilitas kawat thermal NiTi dan meredakan rasa panas/pegal di gusi.</li>
        <li><strong>Analgesik Ringan Bila Diperlukan:</strong> Parasetamol dapat diminum sesuai dosis petunjuk dokter jika rasa ngilu mengganggu tidur malam Anda.</li>
      </ul>
    `
  },
  4: {
    id: 4,
    filterKey: 'behel',
    category: 'Behel',
    tag: 'Teknologi Modern',
    date: '08 Ags 2026',
    modalDate: '08 Agustus 2026',
    readTime: '4 menit baca',
    views: '2.1K',
    title: 'Mengenal Self-Ligating Braces (Damon System): Lebih Cepat & Minim Rasa Sakit?',
    excerpt: 'Inovasi bracket berklip geser tanpa karet elastis konvensional yang menghasilkan gaya pergerakan gigi lebih halus dan jadwal kontrol lebih fleksibel.',
    image: 'assets/images/article_damon_system.webp?v=6.1',
    annotation: 'Teknologi klip geser<br>tanpa karet elastis',
    hasThumbs: false,
    hasSparkBadge: false,
    content: `
      <p>Dalam dunia ortodonti modern, sistem <strong>Self-Ligating (seperti Damon System)</strong> menjadi salah satu pilihan favorit karena menawarkan pengalaman perawatan yang jauh lebih nyaman dibandingkan behel konvensional.</p>

      <h4>Perbedaan Utama dengan Behel Konvensional:</h4>
      <p>Pada behel konvensional, kawat ditahan oleh karet elastis warna-warni (o-ring) yang menciptakan gaya gesek (friksi) tinggi. Sedangkan pada Self-Ligating Braces, bracket dilengkapi pintu geser mikroskopis (slide mechanism) yang mengunci kawat secara pasif dengan friksi mendekati nol.</p>

      <h4>Keunggulan Sistem Damon Self-Ligating:</h4>
      <ul>
        <li><strong>Tekanan Lebih Ringan & Minim Rasa Nyeri:</strong> Karena gaya gesek sangat rendah, pergerakan gigi terjadi melalui gaya biologis yang sangat lembut tanpa membebani pembuluh darah periodontal.</li>
        <li><strong>Jadwal Kontrol Lebih Santai (6–8 Minggu Sekali):</strong> Tanpa karet yang kendur setiap bulan, pasien tidak perlu datang terlalu sering ke klinik. Sangat cocok bagi profesional yang sibuk atau berdomisili luar kota.</li>
        <li><strong>Lebih Higienis & Mudah Dibersihkan:</strong> Ketiadaan karet elastis meminimalkan tempat menempelnya plak makanan dan bakteri penyebab bau mulut.</li>
        <li><strong>Perluasan Lengkung Rahang Alami:</strong> Seringkali dapat menghindari tindakan pencabutan gigi karena mampu memperlebar lengkung rahang secara harmonis.</li>
      </ul>

      <div style="background: var(--primary-50); border-left: 4px solid var(--primary-600); padding: 14px 18px; border-radius: 8px; margin: 20px 0;">
        <strong style="color: var(--primary-800);">Tersedia Opsi Metal & Clear:</strong>
        <p style="margin: 4px 0 0; color: var(--slate-700); font-size: 0.9rem;">Damon System hadir dalam varian Damon Q (metal presisi) dan Damon Clear (bracket keramik transparan anti noda).</p>
      </div>
    `
  },
  5: {
    id: 5,
    filterKey: 'tips',
    category: 'Tips Harian',
    tag: 'Tips Harian',
    date: '01 Ags 2026',
    modalDate: '01 Agustus 2026',
    readTime: '4 menit baca',
    views: '3.2K',
    title: 'Panduan Makanan Pasang Behel: Menu Aman & Pantangan Wajib Dihindari',
    excerpt: 'Daftar makanan lezat yang ramah untuk kawat gigi baru dan jenis makanan renyah/lengket yang berisiko membuat bracket lepas atau kawat bengkok.',
    image: 'assets/images/article_food_rules.webp?v=6.1',
    annotation: 'Nutrisi sehat &<br>bracket tetap aman',
    hasThumbs: false,
    hasSparkBadge: false,
    content: `
      <p>Mengubah pola makan adalah salah satu kunci kesuksesan memakai behel. Memilih makanan yang tepat tidak hanya melindungi bracket agar tidak lepas, tapi juga menjaga kawat tetap pada posisi presisinya.</p>

      <h4>Daftar Menu Ramah Behel (Sangat Dianjurkan):</h4>
      <ul>
        <li><strong>Karbohidrat Lembut:</strong> Nasi tim, bubur gurih, pasta lunak (macaroni/spaghetti), mashed potato, pancake lembut, dan roti sobek tanpa pinggiran keras.</li>
        <li><strong>Sumber Protein Sehat:</strong> Ikan fillet kukus/panggang, ayam suwir halus, tahu, tempe bacem lembut, telur dadar lembut, dan daging cincang.</li>
        <li><strong>Buah & Sayur Lunak:</strong> Pisang matang, alpukat, pepaya, mangga manis, sup wortel brokoli rebus empuk, atau aneka jus buah segar dan smoothies.</li>
        <li><strong>Produk Olahan Susu:</strong> Yoghurt dingin, keju lembut, puding, dan es krim rendah gula untuk meredakan ngilu.</li>
      </ul>

      <h4>Pantangan Makanan yang Wajib Dihindari (Zona Merah):</h4>
      <ul>
        <li><strong>Makanan Keras & Renyah:</strong> Keripik singkong, kacang goreng, es batu (jangan dikunyah!), kerak nasi liwet, dan popcorn (kulit biji sering menyangkut di bawah gusi).</li>
        <li><strong>Makanan Lengket & Kenyal:</strong> Permen karamel, permen karet, gulali, dodol, dan mochi kenyal yang dapat menarik lepas bracket dan merusak kawat.</li>
        <li><strong>Cara Makan Apel/Jagung:</strong> Jangan menggigit langsung apel utuh, pir, atau jagung bakar dengan gigi depan. Potong buah menjadi irisan tipis-tipis dan serut jagung dari tongkolnya sebelum dimakan.</li>
      </ul>
    `
  },
  6: {
    id: 6,
    filterKey: 'tips',
    category: 'Tips Harian',
    tag: 'Tips Harian',
    date: '24 Jul 2026',
    modalDate: '24 Juli 2026',
    readTime: '5 menit baca',
    views: '1.9K',
    title: 'Cara Menyikat Gigi & Flossing yang Benar Saat Memakai Behel',
    excerpt: 'Langkah demi langkah membersihkan sela bracket menggunakan sikat interdental, floss threader, dan water flosser agar bebas plak putih (white spot).',
    image: 'assets/images/article_brush_floss.webp?v=6.1',
    annotation: 'Bebas plak putih &<br>gusi tetap sehat',
    hasThumbs: false,
    hasSparkBadge: false,
    content: `
      <p>Kawat dan bracket behel merupakan tempat yang sangat ideal bagi sisa makanan dan plak untuk bersarang. Jika kebersihan gigi kurang terjaga, risiko timbulnya <em>white spot lesions</em> (bercak putih demineralisasi email), karang gigi, dan radang gusi (gingivitis) akan meningkat drastis.</p>

      <h4>Protokol Menyikat Gigi 4 Langkah bagi Pengguna Behel:</h4>
      <ul>
        <li><strong>1. Gunakan Sikat Gigi Khusus Ortodonti (V-Trim):</strong> Sikat gigi berlekuk "V" memiliki bulu tengah lebih pendek untuk membersihkan permukaan bracket, sedangkan bulu pinggir membersihkan email gigi di atas dan bawah kawat.</li>
        <li><strong>2. Teknik Sudut 45 Derajat:</strong> Sikat dengan gerakan memutar perlahan, pertama dengan sudut 45° menghadap ke bawah untuk membersihkan area atas bracket, lalu 45° menghadap ke atas untuk membersihkan area bawah bracket.</li>
        <li><strong>3. Bersihkan Sela dengan Interdental Brush:</strong> Masukkan sikat interdental mini di bawah kawat utama dan sela-sela antar bracket untuk mengeluarkan sisa serat makanan yang terperangkap.</li>
        <li><strong>4. Flossing Rutin dengan Dental Floss / Water Flosser:</strong> Gunakan bantuan <em>floss threader</em> (jarum benang plastik) untuk memasukkan benang gigi ke sela gusi, atau gunakan <em>oral irrigator (water flosser)</em> dengan semprotan air bertekanan untuk hasil instan yang bersih maksimal.</li>
      </ul>

      <div style="background: var(--primary-50); border-left: 4px solid var(--primary-600); padding: 14px 18px; border-radius: 8px; margin: 20px 0;">
        <strong style="color: var(--primary-800);">Tips Tambahan:</strong>
        <p style="margin: 4px 0 0; color: var(--slate-700); font-size: 0.9rem;">Gunakan pasta gigi berfluoride dan lengkapi dengan obat kumur bebas alkohol (non-alcohol mouthwash) sebelum tidur agar kebersihan mulut terjaga optimal sepanjang malam.</p>
      </div>
    `
  },
  7: {
    id: 7,
    filterKey: 'perawatan',
    category: 'Perawatan',
    tag: 'Perawatan',
    date: '18 Jul 2026',
    modalDate: '18 Juli 2026',
    readTime: '4 menit baca',
    views: '2.7K',
    title: 'Kenapa Wajib Pakai Retainer Setelah Lepas Behel? Ini Faktanya!',
    excerpt: 'Gigi memiliki memori elastis untuk kembali ke posisi semula (relapse). Pahami pentingnya fase retensi dan cara merawat retainer agar tahan lama.',
    image: 'assets/images/article_retainer_smile.webp?v=6.1',
    annotation: 'Kunci senyum rapi<br>tahan selamanya',
    hasThumbs: false,
    hasSparkBadge: false,
    content: `
      <p>Selamat bagi Anda yang baru saja melepas behel! Namun perlu diingat: <strong>Perjalanan ortodonti belum selesai begitu saja</strong>. Fase Retensi adalah langkah krusial penentu apakah senyum rapi Anda bertahan seumur hidup atau justru kembali berantakan.</p>

      <h4>Mengapa Gigi Bisa Mengalami Relaps (Bergeser Kembali)?</h4>
      <p>Serat kolagen pada ligamen periodontal di sekitar akar gigi memiliki sifat seperti karet gelang (memori elastis). Dibutuhkan waktu minimal 9–12 bulan bagi tulang rahang untuk memadat sempurna dan mengunci posisi gigi baru. Tanpa penahan (retainer), tekanan alami dari otot bibir, lidah, dan pengunyahan akan mendorong gigi bergeser ke posisi asalnya.</p>

      <h4>3 Jenis Retainer Populer:</h4>
      <ul>
        <li><strong>1. Clear Plastic Retainer (Essix / Vivera):</strong> Terbuat dari plat polimer bening transparan yang presisi mencetak gigi. Sangat estetik, tidak tampak saat dipakai, dan nyaman untuk aktivitas sehari-hari.</li>
        <li><strong>2. Hawley Retainer:</strong> Retainer klasik dari kombinasi akrilik dan kawat stainless steel busur labial. Sangat kokoh, awet bertahun-tahun, dan dapat disetel ulang bila ada sedikit pergeseran mikro.</li>
        <li><strong>3. Fixed / Permanent Retainer:</strong> Kawat tipis khusus yang dilekatkan permanen di permukaan belakang gigi depan (canine-to-canine). Tidak terlihat dari depan dan bekerja 24/7 tanpa risiko lupa pakai.</li>
      </ul>

      <h4>Jadwal Pemakaian Retainer:</h4>
      <p>Pada 6 bulan pertama, retainer lepasan wajib dipakai <strong>sepanjang hari (20–22 jam)</strong>, hanya dilepas saat makan dan sikat gigi. Setelah tulang stabil, dokter akan menganjurkan pemakaian hanya pada <strong>malam hari saat tidur</strong>.</p>
    `
  },
  8: {
    id: 8,
    filterKey: 'tanya',
    category: 'Tanya Dokter',
    tag: 'Tanya Dokter',
    date: '10 Jul 2026',
    modalDate: '10 Juli 2026',
    readTime: '4 menit baca',
    views: '1.4K',
    title: 'Apa Saja yang Dilakukan Saat Konsultasi Pertama Kali dengan Dokter Ortodonti?',
    excerpt: 'Mulai dari pemeriksaan klinis, rontgen panoramic, foto profil wajah, hingga 3D digital intraoral scan untuk menyusun rencana perawatan presisi.',
    image: 'assets/images/article_consult_doctor.webp?v=6.1',
    annotation: '3D Digital Scan &<br>rencana perawatan',
    hasThumbs: false,
    hasSparkBadge: false,
    content: `
      <p>Bagi Anda yang baru pertama kali merencanakan perawatan behel, wajar jika merasa penasaran atau sedikit tegang. Sesi konsultasi ortodonti pertama adalah sesi diskusi santai dan komprehensif tanpa ada tindakan pemasangan langsung yang menyakitkan.</p>

      <h4>Tahapan Pemeriksaan Diagnostik Lengkap:</h4>
      <ul>
        <li><strong>1. Wawancara Keluhan & Ekspektasi (Anamnesis):</strong> Dokter akan menanyakan apa yang ingin Anda perbaiki (misalnya gigi bertumpuk, gigi maju, rahang miring, atau kesulitan mengunyah) serta riwayat kesehatan umum.</li>
        <li><strong>2. Pemeriksaan Klinis Intraoral & Sendi Rahang (TMJ):</strong> Memeriksa kesehatan gusi, kebersihan email gigi, simetris wajah, pola gigitan (oklusi), serta fungsi sendi temporomandibular saat membuka/menutup mulut.</li>
        <li><strong>3. Rontgen Gigi (Panoramic & Cephalometric):</strong> Foto rontgen panoramic memperlihatkan seluruh akar gigi, gigi bungsu (impaksi), dan kepadatan tulang. Foto sefalometri mengukur proporsi sudut rahang terhadap tulang tengkorak kepala.</li>
        <li><strong>4. 3D Digital Intraoral Scan (iTero):</strong> Pengambilan model gigi digital secara instan dengan kamera 3D tanpa perlu mencetak manual dengan adonan pasta yang sering memicu rasa mual.</li>
        <li><strong>5. Simulasi Hasil & Diskusi Biaya:</strong> Dokter mempresentasikan simulasi pergerakan gigi sebelum vs sesudah, estimasi durasi waktu, opsi jenis behel yang paling tepat, serta rincian rencana biaya secara transparan.</li>
      </ul>
    `
  },
  9: {
    id: 9,
    filterKey: 'kesehatan',
    category: 'Kesehatan Gigi',
    tag: 'Kesehatan Gigi',
    date: '02 Jul 2026',
    modalDate: '02 Juli 2026',
    readTime: '5 menit baca',
    views: '2.9K',
    title: 'Apakah Pasang Behel Harus Cabut Gigi Terlebih Dahulu? Mitos vs Fakta',
    excerpt: 'Tidak semua kasus behel memerlukan pencabutan gigi. Simak bagaimana dokter ortodonti menganalisis profil rahang dan ruang lengkung gigi.',
    image: 'assets/images/article_extraction_xray.webp?v=6.1',
    annotation: 'Analisis sefalometri &<br>ruang rahang digital',
    hasThumbs: false,
    hasSparkBadge: false,
    content: `
      <p>Salah satu ketakutan terbesar calon pasien behel adalah anggapan bahwa gigi pasti harus dicabut 4 buah sebelum behel dipasang. <strong>Faktanya: Tidak semua kasus behel memerlukan pencabutan gigi!</strong></p>

      <h4>Kapan Pencabutan Gigi (Ekstraksi) Diperlukan?</h4>
      <p>Pencabutan gigi (biasanya gigi premolar/geraham kecil) hanya dilakukan jika terdapat <em>discrepancy</em> atau kekurangan ruang lengkung rahang yang signifikan:</p>
      <ul>
        <li><strong>Gigi Berjejal Ekstrem (Severe Crowding):</strong> Gigi saling bertumpuk parah dan ukuran lengkung rahang terlalu sempit untuk menampung seluruh gigi.</li>
        <li><strong>Profil Wajah Maju (Bimaxillary Protrusion):</strong> Gigi atas dan bawah terlalu maju sehingga bibir sulit menutup rapat secara rileks (incompetent lips). Pencabutan memberi ruang untuk memundurkan gigi ke belakang sehingga profil wajah samping menjadi lebih proporsional dan estetik.</li>
      </ul>

      <h4>Kapan Behel Bisa Dilakukan TANPA Cabut Gigi?</h4>
      <ul>
        <li><strong>Kasus Gigi Renggang (Diastema):</strong> Ruang sudah tersedia dan hanya perlu dirapatkan.</li>
        <li><strong>Gigi Berjejal Ringan hingga Sedang:</strong> Ruang bisa didapat melalui metode <em>Interproximal Reduction (IPR)</em> yaitu pengasahan mikro (0.2–0.5 mm) pada lapisan terluar email gigi yang aman dan tidak sakit, atau melalui ekspansi lengkung rahang.</li>
        <li><strong>Penggunaan Sistem Self-Ligating (Damon) atau Clear Aligners:</strong> Teknologi ini mampu mengoptimalkan lebar lengkung gigi alami sehingga seringkali menghindari ekstraksi gigi permanen.</li>
      </ul>
    `
  },
  10: {
    id: 10,
    filterKey: 'tanya',
    category: 'Tanya Dokter',
    tag: 'Tanya Dokter',
    date: '25 Jun 2026',
    modalDate: '25 Juni 2026',
    readTime: '4 menit baca',
    views: '3.5K',
    title: 'Pasang Behel di Usia Dewasa: Apakah Masih Efektif atau Sudah Terlambat?',
    excerpt: 'Banyak pasien usia 25 hingga 40+ tahun ragu memakai behel. Temukan fakta medis mengapa pergerakan gigi pada orang dewasa tetap aman dan sukses.',
    image: 'assets/images/article_adult_ortho.webp?v=6.1',
    annotation: 'Tidak ada kata terlambat<br>untuk senyum percaya diri',
    hasThumbs: false,
    hasSparkBadge: false,
    content: `
      <p>Apakah Anda sering berpikir: <em>"Saya sudah berusia 28 / 35 tahun, apakah sudah terlambat untuk pasang behel?"</em> Jawabannya tegas: <strong>Sama sekali tidak terlambat!</strong></p>

      <p>Data dari American Association of Orthodontists menunjukkan bahwa 1 dari 4 pasien ortodonti saat ini adalah orang dewasa. Secara fisiologis, mekanisme biologis pergerakan gigi pada usia dewasa sama persis dengan remaja, asalkan jaringan penyangga gigi (tulang alveolar dan gusi) dalam kondisi sehat.</p>

      <h4>Manfaat Merapikan Gigi di Usia Dewasa:</h4>
      <ul>
        <li><strong>Meningkatkan Kepercayaan Diri & Karir:</strong> Senyum yang rapi dan proporsional memberikan impresi profesional yang kuat dalam presentasi kerja, wawancara, maupun interaksi sosial.</li>
        <li><strong>Mencegah Kerusakan Gigi Jangka Panjang:</strong> Gigi yang bertumpuk sangat sulit dibersihkan dengan sikat gigi biasa, memicu penumpukan karang gigi dan gigi berlubang di usia 40 tahun ke atas.</li>
        <li><strong>Memperbaiki Fungsi Gigitan & Sendi Rahang:</strong> Mengatasi masalah ngilu pada sendi rahang (TMJ disorder) dan kesulitan mengunyah akibat kontak gigitan yang tidak seimbang.</li>
      </ul>

      <h4>Pilihan Behel Ramah Dewasa:</h4>
      <p>Jika Anda khawatir penampilan terganggu di lingkungan profesional, tersedia opsi <strong>Behel Keramik Estetis</strong> yang warnanya menyatu dengan gigi, serta <strong>Invisalign (Clear Aligners)</strong> yang transparan dan dapat dilepas kapan saja saat menghadiri meeting penting.</p>
    `
  }
};

let currentArticleCategory = 'all';
let currentArticleLimit = 3;
const ARTICLE_STEP = 3;

function renderArticles(filterCategory = 'all', limit = 3) {
  const container = document.querySelector('.articles-mockup-grid');
  const loadMoreWrap = document.getElementById('articlesLoadMoreWrap');
  const countBadge = document.getElementById('articlesCountBadge');
  if (!container) return;

  currentArticleCategory = filterCategory;
  currentArticleLimit = limit;

  const allFilteredArticles = Object.values(articlesData).filter(item => {
    if (filterCategory === 'all') return true;
    return item.filterKey === filterCategory;
  });

  const totalFiltered = allFilteredArticles.length;

  if (!totalFiltered) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--slate-500); font-weight: 600;">Belum ada artikel untuk kategori ini.</div>`;
    if (loadMoreWrap) loadMoreWrap.style.display = 'none';
    return;
  }

  // Slice to current limit
  const visibleArticles = allFilteredArticles.slice(0, limit);

  container.classList.remove('single-item', 'two-items', 'three-items');
  if (visibleArticles.length === 1) {
    container.classList.add('single-item');
  } else if (visibleArticles.length === 2) {
    container.classList.add('two-items');
  } else if (visibleArticles.length === 3) {
    container.classList.add('three-items');
  }

  let html = '';

  visibleArticles.forEach((article, index) => {
    // POSISI PERTAMA: Selalu dirender sebagai FEATURED CARD LEBAR
    if (index === 0) {
      let thumbsHtml = '';
      if (article.hasThumbs) {
        thumbsHtml = `
          <div class="featured-braces-types">
            <div class="braces-thumb-box">
              <img src="assets/images/service_metal.webp?v=5.9" alt="Metal">
              <span class="thumb-label">Metal</span>
            </div>
            <div class="braces-thumb-box">
              <img src="assets/images/service_ceramic.webp?v=5.9" alt="Ceramic">
              <span class="thumb-label">Ceramic</span>
            </div>
            <div class="braces-thumb-box">
              <img src="assets/images/service_invisalign.webp?v=5.9" alt="Invisalign">
              <span class="thumb-label">Invisalign</span>
            </div>
          </div>
        `;
      }

      html += `
        <article class="article-card-featured" data-category="${article.filterKey}">
          <div class="featured-card-content">
            <div>
              <span class="article-pill-tag">${article.tag || article.category}</span>
              <h3 class="featured-article-title">${article.title}</h3>
              <p class="featured-article-excerpt">${article.excerpt}</p>
              
              <div class="featured-cta-wrap">
                <a href="#" class="btn-featured-read btn-read-article" data-id="${article.id}">
                  <span>Baca Selengkapnya</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </div>
            </div>

            <div class="article-meta-row">
              <div class="article-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span>${article.date}</span>
              </div>
              <div class="article-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>${article.readTime}</span>
              </div>
              <div class="article-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <span>${article.views}</span>
              </div>
            </div>
          </div>

          <div class="featured-card-media">
            <img src="${article.image}" alt="${article.title}" class="featured-main-img">
            
            ${article.annotation ? `
              <div class="featured-media-annotation">
                <span class="annotation-text">${article.annotation}</span>
                <svg class="annotation-arrow" width="36" height="36" viewBox="0 0 40 40" fill="none">
                  <path d="M30 6 C 20 16, 12 20, 8 28" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none"/>
                  <path d="M4 22 L 8 29 L 14 27" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                </svg>
              </div>
            ` : ''}

            ${thumbsHtml}
          </div>
        </article>
      `;
    } else {
      // POSISI BERIKUTNYA: Dirender sebagai STANDARD CARD
      let badgeHtml = '';
      if (article.hasSparkBadge) {
        badgeHtml = `
          <div class="floating-bracket-circle">
            <img src="assets/images/service_metal.webp?v=5.9" alt="Bracket Behel">
            <div class="bracket-spark-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.8" stroke-linecap="round">
                <line x1="4" y1="4" x2="7" y2="7"></line>
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="20" y1="4" x2="17" y2="7"></line>
              </svg>
            </div>
          </div>
        `;
      }

      html += `
        <article class="article-card-standard" data-category="${article.filterKey}">
          <div class="standard-card-media">
            <img src="${article.image}" alt="${article.title}" class="standard-main-img">
            <span class="article-pill-tag tag-overlay">${article.tag || article.category}</span>
            ${badgeHtml}
          </div>

          <div class="standard-card-body">
            <h3 class="standard-article-title">${article.title}</h3>
            <p class="standard-article-excerpt">${article.excerpt}</p>

            <div class="article-meta-row">
              <div class="article-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span>${article.date}</span>
              </div>
              <div class="article-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>${article.readTime}</span>
              </div>
            </div>

            <a href="#" class="standard-read-link btn-read-article" data-id="${article.id}">
              <span>Baca Selengkapnya</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
          </div>
        </article>
      `;
    }
  });

  container.style.opacity = '0';
  container.innerHTML = html;
  setTimeout(() => {
    container.style.transition = 'opacity 0.25s ease';
    container.style.opacity = '1';
  }, 20);

  attachArticleModalEvents();

  // Update Load More Button visibility & badge
  if (loadMoreWrap) {
    if (totalFiltered <= 3 || visibleArticles.length >= totalFiltered) {
      loadMoreWrap.style.display = 'none';
    } else {
      loadMoreWrap.style.display = 'flex';
      if (countBadge) {
        countBadge.innerText = `${visibleArticles.length} dari ${totalFiltered}`;
      }
    }
  }
}

function initArticleFilters() {
  const filterBtns = document.querySelectorAll('.article-filter-btn');
  const loadMoreBtn = document.getElementById('btnArticlesLoadMore');
  if (!filterBtns.length) return;

  // Render all articles on initial load (limit = 3)
  renderArticles('all', 3);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCat = btn.getAttribute('data-category');
      renderArticles(selectedCat, 3);
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextLimit = currentArticleLimit + ARTICLE_STEP;
      renderArticles(currentArticleCategory, nextLimit);
    });
  }
}

function attachArticleModalEvents() {
  const modal = document.getElementById('articleModal');
  const readButtons = document.querySelectorAll('.btn-read-article');
  if (!modal) return;

  const modalTitle = modal.querySelector('#articleModalTitle');
  const modalCategory = modal.querySelector('#articleModalCategory');
  const modalDate = modal.querySelector('#articleModalDate');
  const modalImg = modal.querySelector('#articleModalImg');
  const modalBody = modal.querySelector('#articleModalContent');
  const closeBtn = modal.querySelector('.modal-close-btn');

  readButtons.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const articleId = btn.getAttribute('data-id');
      const article = articlesData[articleId];

      if (article) {
        modalTitle.innerText = article.title;
        modalCategory.innerText = article.category;
        modalDate.innerText = `${article.modalDate || article.date} • ${article.readTime}`;
        modalImg.src = article.image;
        modalBody.innerHTML = article.content;
        openModal(modal);
      }
    };
  });

  if (closeBtn) {
    closeBtn.onclick = () => closeModal(modal);
  }
}

function initArticleModal() {
  attachArticleModalEvents();
}

/* ==========================================================================
   6. BOOKING CONSULTATION MODAL & WHATSAPP GENERATOR
   ========================================================================== */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const openButtons = document.querySelectorAll('.btn-trigger-booking');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const form = modal.querySelector('#appointmentForm');
  const hospitalSelect = modal.querySelector('#selectLocation');
  const serviceSelect = modal.querySelector('#selectService');

  // Open booking modal
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselectedHospital = btn.getAttribute('data-location');
      const preselectedService = btn.getAttribute('data-service');

      if (preselectedHospital && hospitalSelect) {
        hospitalSelect.value = preselectedHospital;
      }
      if (preselectedService && serviceSelect) {
        serviceSelect.value = preselectedService;
      }

      openModal(modal);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }

  // Handle Form Submission -> WhatsApp Link Direct Generator
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#patientName').value.trim();
      const phone = form.querySelector('#patientPhone').value.trim();
      const location = form.querySelector('#selectLocation').value;
      const service = form.querySelector('#selectService').value;
      const date = form.querySelector('#appointmentDate').value;
      const notes = form.querySelector('#patientNotes').value.trim();

      const messageText = `Halo drg. Andini Putri, Sp.Ort & Tim Dental Care,%0A%0ASaya ingin booking jadwal konsultasi ortodonti:%0A• Nama: ${encodeURIComponent(name)}%0A• No. WhatsApp: ${encodeURIComponent(phone)}%0A• Lokasi Praktik: ${encodeURIComponent(location)}%0A• Layanan: ${encodeURIComponent(service)}%0A• Pilihan Tanggal: ${encodeURIComponent(date)}%0A• Keluhan/Catatan: ${encodeURIComponent(notes || 'Konsultasi awal / cek behel')}%0A%0AMohon info ketersediaan slot jamnya. Terima kasih!`;

      const whatsappUrl = `https://wa.me/6281234567890?text=${messageText}`;

      // Open WA
      window.open(whatsappUrl, '_blank');
      closeModal(modal);
      form.reset();
    });
  }
}

/* ==========================================================================
   7. DOCTOR PROFILE MODAL
   ========================================================================== */
function initDoctorModal() {
  const modal = document.getElementById('doctorModal');
  const openButtons = document.querySelectorAll('.btn-trigger-doctor');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modal);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }
}

/* ==========================================================================
   8. CERTIFICATE ZOOM LIGHTBOX MODAL
   ========================================================================== */
function initCertificateModal() {
  const modal = document.getElementById('certModal');
  const triggerBtns = document.querySelectorAll('.btn-trigger-cert');
  const cards = document.querySelectorAll('.cert-mockup-card');
  if (!modal) return;

  const certTitle = modal.querySelector('#certModalTitle');
  const certImg = modal.querySelector('#certModalImg');
  const certDesc = modal.querySelector('#certModalDesc');
  const closeBtn = modal.querySelector('.modal-close-btn');

  function showCert(title, issuer, img, desc) {
    if (certTitle) certTitle.innerText = title;
    if (certImg) certImg.src = img;
    if (certDesc) {
      certDesc.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--slate-900); margin: 0;">${title}</h4>
            <span style="font-size: 0.84rem; font-weight: 700; color: var(--primary-600);">${issuer}</span>
          </div>
          <span style="background: var(--success-light); color: #065f46; font-size: 0.76rem; font-weight: 700; padding: 4px 12px; border-radius: 9999px;">✓ Terverifikasi</span>
        </div>
        <p style="color: var(--slate-600); margin: 0; line-height: 1.6;">${desc}</p>
      `;
    }
    openModal(modal);
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const title = btn.getAttribute('data-title');
      const issuer = btn.getAttribute('data-issuer');
      const img = btn.getAttribute('data-img');
      const desc = btn.getAttribute('data-desc');
      showCert(title, issuer, img, desc);
    });
  });

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger twice if button clicked
      if (e.target.closest('.btn-trigger-cert')) return;
      const btn = card.querySelector('.btn-trigger-cert');
      if (btn) {
        const title = btn.getAttribute('data-title');
        const issuer = btn.getAttribute('data-issuer');
        const img = btn.getAttribute('data-img');
        const desc = btn.getAttribute('data-desc');
        showCert(title, issuer, img, desc);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }
}

/* ==========================================================================
   9. LIVE SCHEDULE STATUS (DYNAMIC DAY CALCULATION)
   ========================================================================== */
function initLiveScheduleStatus() {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.

  const locationHerminaBadge = document.getElementById('statusHermina');
  const locationRsgmBadge = document.getElementById('statusRsgm');
  const locationDentalCareBadge = document.getElementById('statusDentalCare');

  // RS Hermina: Senin (1) & Rabu (3)
  if (locationHerminaBadge) {
    if (todayIndex === 1 || todayIndex === 3) {
      locationHerminaBadge.className = 'location-status-badge open';
      locationHerminaBadge.innerHTML = `<span class="status-dot"></span> Buka Hari Ini (14:00 - 18:00)`;
    }
  }

  // RSGM Unpad: Selasa (2) & Kamis (4)
  if (locationRsgmBadge) {
    if (todayIndex === 2 || todayIndex === 4) {
      locationRsgmBadge.className = 'location-status-badge open';
      locationRsgmBadge.innerHTML = `<span class="status-dot"></span> Buka Hari Ini (09:00 - 13:00)`;
    }
  }

  // Klinik Utama: Jumat (5) & Sabtu (6)
  if (locationDentalCareBadge) {
    if (todayIndex === 5 || todayIndex === 6) {
      locationDentalCareBadge.className = 'location-status-badge open';
      locationDentalCareBadge.innerHTML = `<span class="status-dot"></span> Buka Hari Ini (10:00 - 19:00)`;
    }
  }
}

/* ==========================================================================
   10. TESTIMONIALS CAROUSEL & SLIDING TRACK
   ========================================================================== */
function initTestimonialCarousel() {
  const viewport = document.getElementById('testiSliderViewport');
  const track = document.getElementById('testiSliderTrack');
  const cards = document.querySelectorAll('.testi-mockup-card');
  const prevBtn = document.getElementById('testiPrevBtn');
  const nextBtn = document.getElementById('testiNextBtn');
  const dotsContainer = document.getElementById('testiDotsContainer');
  if (!viewport || !track || !cards.length) return;

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let dragDistance = 0;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w > 1024) return 3;
    if (w > 680) return 2;
    return 1;
  }

  function getMaxIndex() {
    const visible = getVisibleCount();
    return Math.max(0, cards.length - visible);
  }

  function getCardStep() {
    if (!cards[0]) return 0;
    const cardRect = cards[0].getBoundingClientRect();
    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.gap) || 24;
    return cardRect.width + gap;
  }

  function renderDots() {
    if (!dotsContainer) return;
    const maxIdx = getMaxIndex();
    const count = maxIdx + 1;
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('span');
      dot.className = `testi-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('data-slide', i);
      dot.setAttribute('aria-label', `Lihat testimoni slide ${i + 1}`);
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateActiveStates() {
    const visible = getVisibleCount();
    // In 3-card view, highlight the center card (index + 1); in 2-card or 1-card view, highlight current visible card
    const activeFeaturedIdx = visible === 3 
      ? Math.min(cards.length - 1, currentIndex + 1)
      : currentIndex;

    cards.forEach((card, idx) => {
      if (idx === activeFeaturedIdx) {
        card.classList.add('card-featured-active');
      } else {
        card.classList.remove('card-featured-active');
      }
    });

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.testi-dot') : [];
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function applyPosition(smooth = true) {
    const step = getCardStep();
    const offset = currentIndex * step;
    prevTranslate = -offset;
    currentTranslate = -offset;

    if (smooth) {
      track.style.transition = 'transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1)';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translateX(${-offset}px)`;
    updateActiveStates();
  }

  function goToSlide(index, smooth = true) {
    const maxIdx = getMaxIndex();
    if (index < 0) {
      currentIndex = maxIdx;
    } else if (index > maxIdx) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    applyPosition(smooth);
  }

  // Next and Prev Button Click Handlers
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const maxIdx = getMaxIndex();
      if (currentIndex >= maxIdx) {
        goToSlide(0);
      } else {
        goToSlide(currentIndex + 1);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const maxIdx = getMaxIndex();
      if (currentIndex <= 0) {
        goToSlide(maxIdx);
      } else {
        goToSlide(currentIndex - 1);
      }
    });
  }

  // Allow clicking on any card to focus/highlight it
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      if (Math.abs(dragDistance) > 10) return; // Ignore if dragged
      cards.forEach(c => c.classList.remove('card-featured-active'));
      card.classList.add('card-featured-active');
    });
  });

  // Touch Swipe & Mouse Drag Support
  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  function touchStart(e) {
    // Only drag on primary mouse button or touch
    if (e.type === 'mousedown' && e.button !== 0) return;
    isDragging = true;
    startX = getPositionX(e);
    dragDistance = 0;
    track.style.transition = 'none';
    animationID = requestAnimationFrame(animation);
  }

  function touchMove(e) {
    if (!isDragging) return;
    const currentX = getPositionX(e);
    dragDistance = currentX - startX;
    currentTranslate = prevTranslate + dragDistance;
  }

  function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);

    const threshold = 50;
    const maxIdx = getMaxIndex();

    if (dragDistance < -threshold) {
      if (currentIndex < maxIdx) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    } else if (dragDistance > threshold) {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIdx;
      }
    }
    applyPosition(true);
    setTimeout(() => { dragDistance = 0; }, 50);
  }

  function animation() {
    if (isDragging) {
      track.style.transform = `translateX(${currentTranslate}px)`;
      requestAnimationFrame(animation);
    }
  }

  // Attach Touch & Mouse Events to Viewport
  viewport.addEventListener('touchstart', touchStart, { passive: true });
  viewport.addEventListener('touchmove', touchMove, { passive: true });
  viewport.addEventListener('touchend', touchEnd);

  viewport.addEventListener('mousedown', touchStart);
  window.addEventListener('mousemove', touchMove);
  window.addEventListener('mouseup', touchEnd);

  // Resize Listener with Debounce
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const maxIdx = getMaxIndex();
      if (currentIndex > maxIdx) {
        currentIndex = maxIdx;
      }
      renderDots();
      applyPosition(false);
    }, 120);
  });

  // Initial Setup
  renderDots();
  applyPosition(false);
}

/* ==========================================================================
   11. SCROLL TO TOP & MODAL UTILITIES
   ========================================================================== */
function initScrollTop() {
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function openModal(modal) {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Close on backdrop click
  modal.onclick = (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  };

  // Close on ESC key
  document.onkeydown = (e) => {
    if (e.key === 'Escape') {
      closeModal(modal);
    }
  };
}

function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
