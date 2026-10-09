(function () {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const modal = $('#contentModal');
  const modalContent = $('#modalContent');
  const toast = $('#toast');
  const backTop = $('#backTop');
  const menuToggle = $('.menu-toggle');
  const navMenu = $('#main-menu');
  const currentYear = $('#currentYear')
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  const modalData = {
    'facility-koperasi': {
      title: 'Koperasi',
      badge: 'Fasilitas',
      text: 'Koperasi sekolah dapat menjadi ruang layanan sederhana untuk memenuhi kebutuhan warga sekolah sekaligus mengenalkan nilai kemandirian, tanggung jawab, dan ekonomi praktis.'
    },
    'facility-perpustakaan': {
      title: 'Perpustakaan',
      badge: 'Fasilitas',
      text: 'Perpustakaan mendukung budaya membaca, pencarian informasi, pembelajaran mandiri, serta kegiatan literasi yang terintegrasi dengan proses belajar.'
    },
    'facility-mushola': {
      title: 'Mushola',
      badge: 'Fasilitas',
      text: 'Mushola menjadi fasilitas untuk kegiatan ibadah dan pembiasaan karakter, termasuk kegiatan keagamaan yang diselenggarakan sekolah sesuai program yang berlaku.'
    },
    'facility-kantin': {
      title: 'Kantin',
      badge: 'Fasilitas',
      text: 'Kantin mendukung kebutuhan konsumsi warga sekolah selama aktivitas belajar. Informasi tentang kebijakan makanan sehat dapat ditambahkan sesuai standar dan pengelolaan sekolah.'
    },
    'facility-uks': {
      title: 'UKS',
      badge: 'Fasilitas',
      text: 'UKS mendukung penanganan kesehatan dasar, pertolongan pertama, kebersihan diri, serta pembiasaan hidup sehat bagi siswa dan warga sekolah.'
    },
    'news-1': {
      title: 'Semangat Pagi melalui Upacara Bendera',
      badge: 'Kegiatan • 12 Sep 2026',
      text: 'Upacara menjadi bagian dari pembiasaan positif untuk menumbuhkan kedisiplinan, rasa hormat, tanggung jawab, dan semangat kebersamaan.'
    },
    'news-2': {
      title: 'Program Literasi untuk Menumbuhkan Budaya Membaca',
      badge: 'Akademik • 03 Sep 2026',
      text: 'Program literasi dirancang untuk membuat membaca menjadi kebiasaan yang menyenangkan melalui kegiatan rutin, pojok baca, kunjungan perpustakaan, dan aktivitas tindak lanjut.'
    },
    'news-3': {
      title: 'Apresiasi untuk Siswa Berprestasi',
      badge: 'Prestasi • 28 Agu 2026',
      text: 'Sekolah memberikan ruang apresiasi bagi siswa yang menunjukkan capaian akademik maupun nonakademik sebagai bagian dari budaya positif dan motivasi untuk terus belajar.'
    },
    'news-4': {
      title: 'Informasi Awal Penerimaan Peserta Didik Baru',
      badge: 'PPDB • 10 Agu 2026',
      text: 'Halaman PPDB berfungsi sebagai pusat informasi awal. Jadwal resmi, jalur pendaftaran, syarat, kuota, dan dokumen wajib diperbarui sesuai keputusan sekolah dan dinas pendidikan.'
    },
    'activity-1': {
      title: 'Kegiatan Belajar', badge: 'Kegiatan Sekolah', imageKey: 'activities.01', text: 'Pembelajaran aktif, kolaboratif, dan ramah anak menjadi contoh pendekatan yang dapat ditampilkan melalui dokumentasi kelas asli.'
    },
    'activity-2': {
      title: 'Kegiatan Olahraga', badge: 'Kegiatan Sekolah', imageKey: 'activities.02', text: 'Kegiatan olahraga mendukung kebugaran, sportivitas, kerja sama, serta pembentukan kebiasaan hidup sehat.'
    },
    'activity-3': {
      title: 'Kegiatan Seni', badge: 'Kegiatan Sekolah', imageKey: 'activities.03', text: 'Kegiatan seni memberi ruang bagi siswa untuk mengeksplorasi kreativitas, keberanian tampil, dan apresiasi terhadap karya.'
    },
    'activity-4': {
      title: 'Upacara', badge: 'Kegiatan Sekolah', imageKey: 'news.01', text: 'Upacara mendukung pembiasaan disiplin, tanggung jawab, dan rasa kebersamaan di lingkungan sekolah.'
    },
    'activity-5': {
      title: 'Kegiatan Keagamaan', badge: 'Kegiatan Sekolah', imageKey: 'activities.05', text: 'Kegiatan keagamaan dapat didokumentasikan sebagai bagian dari pembentukan karakter dan pembiasaan positif.'
    },
    'achievement-1': {
      title: 'Juara Lomba Cerdas Cermat', badge: 'Akademik • 2026 • Tingkat Kecamatan', imageKey: 'news.03', text: 'Nama tim, nama peserta, kategori lomba, penyelenggara, dan dokumen penghargaan dapat ditambahkan pada versi produksi.'
    },
    'achievement-2': {
      title: 'Juara Turnamen Futsal', badge: 'Olahraga • 2026 • Tingkat Kecamatan', imageKey: 'activities.02', text: 'Dokumentasi tim, nama anggota, skor pertandingan, dan sertifikat dapat ditambahkan sesuai data prestasi resmi.'
    },
    'achievement-3': {
      title: 'Finalis Festival Seni Pelajar', badge: 'Seni • 2026 • Tingkat Kota', imageKey: 'activities.03', text: 'Dokumentasi penampilan, nama peserta, kategori, dan hasil akhir dapat diisi menggunakan data resmi sekolah.'
    }
  };

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function openModal(key, imagePath) {
    const data = modalData[key];
    if (!data || !modal || !modalContent) return;
    modalContent.innerHTML = `
      <div class="modal-meta"><span>${escapeHtml(data.badge)}</span></div>
      <h2 id="modalTitle">${escapeHtml(data.title)}</h2>
      <img src="${escapeAttr(imagePath || "")}" alt="${escapeAttr(data.title)} - foto dummy" data-fallback-label="${escapeAttr(data.title)}" />
      <p>${escapeHtml(data.text)}</p>
      <span class="data-badge">Kegiatan Sekolah</span>
    `;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    const close = $('.modal-close', modal);
    if (close) close.focus();
    attachImageFallbacks($('.modal-dialog'));
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  }
  function escapeAttr(value) { return escapeHtml(value); }

  function attachImageFallbacks(root = document) {
    $$('img[data-fallback-label]', root).forEach(img => {
      if (img.dataset.fallbackAttached === '1') return;
      img.dataset.fallbackAttached = '1';
      img.addEventListener('error', () => {
        const label = img.getAttribute('data-fallback-label') || img.getAttribute('alt') || 'Foto Sekolah';
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b2139"/><stop offset="1" stop-color="#1e5a8a"/></linearGradient></defs><rect width="1200" height="700" fill="url(#g)"/><circle cx="1030" cy="125" r="70" fill="#f0bd4a" opacity=".95"/><path d="M120 470 L360 265 L540 400 L760 205 L1080 470 Z" fill="#fff" opacity=".12"/><text x="600" y="560" fill="#fff" font-family="Arial" font-size="52" font-weight="700" text-anchor="middle">${label.replace(/[<>&"']/g,'')}</text><text x="600" y="610" fill="#dbe8f2" font-family="Arial" font-size="22" text-anchor="middle">SDN LENGKONG WETAN 1</text></svg>`;
        img.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
      }, { once: true });
    });
  }

  attachImageFallbacks();

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    $$('.nav-menu a').forEach(link => link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  $$('[data-modal]').forEach(button => {
    button.addEventListener('click', () => openModal(button.dataset.modal, button.dataset.modalImage));
  });
  $$('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal && !modal.hidden) closeModal(); });

  const newsCards = $$('#newsGrid .news-card');
  const newsSearch = $('#newsSearch');
  const newsFilter = $('#newsFilter');
  const newsEmpty = $('#newsEmpty');
  function filterNews() {
    const q = (newsSearch?.value || '').trim().toLowerCase();
    const cat = newsFilter?.value || 'all';
    let count = 0;
    newsCards.forEach(card => {
      const text = (card.dataset.search || '').toLowerCase();
      const category = card.dataset.category || '';
      const show = (!q || text.includes(q)) && (cat === 'all' || category === cat);
      card.hidden = !show;
      if (show) count++;
    });
    if (newsEmpty) newsEmpty.hidden = count !== 0;
  }
  newsSearch?.addEventListener('input', filterNews);
  newsFilter?.addEventListener('change', filterNews);

  const facilityEmpty = $('#facilityEmpty');
  const facilityCards = $$('#facilityGrid .facility-card');
  function filterFacilities(query) {
    const q = (query || '').trim().toLowerCase();
    let count = 0;
    facilityCards.forEach(card => {
      const show = !q || (card.dataset.search || '').toLowerCase().includes(q);
      card.hidden = !show;
      if (show) count++;
    });
    if (facilityEmpty) facilityEmpty.hidden = count !== 0;
  }

  const globalSearchForm = $('#globalSearchForm');
  const globalSearch = $('#globalSearch');
  const globalSearchFeedback = $('#globalSearchFeedback');
  globalSearchForm?.addEventListener('submit', e => {
    e.preventDefault();
    const q = (globalSearch?.value || '').trim().toLowerCase();
    if (!q) {
      if (globalSearchFeedback) globalSearchFeedback.textContent = 'Ketik kata kunci, misalnya: PPDB, fasilitas, berita, perpustakaan.';
      return;
    }
    const sectionMap = [
      ['ppdb',['ppdb','pendaftaran','siswa baru']],
      ['fasilitas',['fasilitas','koperasi','perpustakaan','mushola','kantin']],
      ['berita',['berita','kabar','informasi']],
      ['prestasi',['prestasi','juara','lomba']],
      ['kegiatan',['kegiatan','upacara','olahraga','seni']],
      ['profil',['profil','sejarah','visi','misi','kepala sekolah','guru']],
      ['kontak',['kontak','alamat','telepon','email']]
    ];
    const target = sectionMap.find(([_, terms]) => terms.some(term => q.includes(term)));
    if (target) {
      if (globalSearchFeedback) globalSearchFeedback.textContent = `Menampilkan bagian: ${target[0].replace(/^./, c => c.toUpperCase())}.`;
      document.getElementById(target[0])?.scrollIntoView({behavior:'smooth', block:'start'});
      if (target[0] === 'berita' && newsSearch) { newsSearch.value = q; filterNews(); }
      if (target[0] === 'fasilitas') filterFacilities(q);
      return;
    }
    if (globalSearchFeedback) globalSearchFeedback.textContent = `Tidak ada bagian khusus untuk “${globalSearch.value.trim()}”. Coba kata kunci lain.`;
    document.getElementById('profil')?.scrollIntoView({behavior:'smooth', block:'start'});
  });

  const contactForm = $('#contactForm');
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const formStatus = $('#formStatus');
    let valid = true;
    const fields = ['name','email','topic','message'];
    fields.forEach(id => {
      const input = document.getElementById(id);
      const wrapper = input?.closest('.field');
      const error = $(`[data-error-for="${id}"]`);
      let message = '';
      if (!input || !input.value.trim()) message = 'Wajib diisi.';
      else if (id === 'name' && input.value.trim().length < 3) message = 'Minimal 3 karakter.';
      else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) message = 'Format email belum valid.';
      else if (id === 'message' && input.value.trim().length < 10) message = 'Minimal 10 karakter.';
      if (wrapper) wrapper.classList.toggle('invalid', Boolean(message));
      if (error) error.textContent = message;
      if (message) valid = false;
    });
    if (!valid) {
      if (formStatus) { formStatus.className = 'form-status error'; formStatus.textContent = 'Periksa kembali field yang masih kosong atau belum valid.'; }
      return;
    }
    if (formStatus) { formStatus.className = 'form-status success'; formStatus.textContent = 'Pesan berhasil diproses. Terima kasih telah menghubungi SDN LENGKONG WETAN 1.'; }
    showToast('Pesan berhasil diproses.');
    contactForm.reset();
  });

  $$('input,select,textarea').forEach(input => {
    input.addEventListener('input', () => input.closest('.field')?.classList.remove('invalid'));
  });

  const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .08 }) : null;
  $$('.facility-card,.news-card,.announcement-item,.achievement-card,.ppdb-card,.person-card,.profile-block,.contact-cards article').forEach(el => revealObserver?.observe(el));

  function updateBackTop() {
    if (!backTop) return;
    backTop.classList.toggle('visible', window.scrollY > 700);
  }
  window.addEventListener('scroll', updateBackTop, {passive:true});
  updateBackTop();
  backTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  window.addEventListener('load', () => {
      attachImageFallbacks();
    filterNews();
  });
})();
