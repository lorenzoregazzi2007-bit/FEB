/**
 * BARBER FEB - Mobile First Logic
 * Minerbio (BO) - Mattia Fabbri
 */

document.addEventListener('DOMContentLoaded', () => {
  initIntroScreen();
  initHeroSlideshow();
  initBarberSidePanel();
  initReviewsFader();
  initScheduleStatus();
  initNavigation();
  setupModalEvents();
  initMapConsent();
});

/* ============================================================
   MAPPA GOOGLE CARICATA SOLO SU RICHIESTA (PRIVACY)
============================================================ */
function initMapConsent() {
  const btn = document.getElementById('map-consent-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = btn.dataset.src;
    iframe.title = 'Mappa Barber FEB, Via Canaletto 1, Minerbio';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    btn.replaceWith(iframe);
  });
}

/* ============================================================
   1. INTRO SCREEN (Forbice che taglia e apre il sito)
============================================================ */
function initIntroScreen() {
  const intro = document.getElementById('intro-screen');
  const skipBtn = document.getElementById('intro-skip-btn');
  if (!intro) return;

  const dismissIntro = () => {
    intro.classList.add('opening');
    setTimeout(() => {
      intro.classList.add('hide');
    }, 450);
  };

  // Se l'utente clicca sul pulsante Salta / Entra
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissIntro();
    });
  }

  // Cliccare ovunque sull'intro per entrare subito
  intro.addEventListener('click', dismissIntro);

  // Apertura automatica dopo che la forbice ha tagliato il logo
  setTimeout(() => {
    if (!intro.classList.contains('hide')) {
      dismissIntro();
    }
  }, 2500);
}

/* ============================================================
   2. HERO SLIDESHOW (Immagini del salone e tagli che scorrono da sole)
============================================================ */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (slides.length <= 1) return;

  let currentIndex = 0;
  let timer = null;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % slides.length;
    showSlide(next);
  };

  const startTimer = () => {
    stopTimer();
    timer = setInterval(nextSlide, 3500);
  };

  const stopTimer = () => {
    if (timer) clearInterval(timer);
  };

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const slideIdx = parseInt(dot.getAttribute('data-slide'), 10);
      showSlide(slideIdx);
      startTimer();
    });
  });

  const frame = document.getElementById('hero-slideshow');
  if (frame) {
    frame.addEventListener('mouseenter', stopTimer);
    frame.addEventListener('mouseleave', startTimer);
    
    // Supporto swipe touch leggero
    let startX = 0;
    frame.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stopTimer();
    }, { passive: true });

    frame.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) nextSlide();
        else showSlide((currentIndex - 1 + slides.length) % slides.length);
      }
      startTimer();
    }, { passive: true });
  }

  startTimer();
}

/* ============================================================
   3. SCHEDA PARRUCCHIERE SIDE-PANEL (Stile DominvsBjj)
============================================================ */
function initBarberSidePanel() {
  const trigger = document.getElementById('barber-card-trigger');
  const panel = document.getElementById('side-panel');
  const overlay = document.getElementById('side-panel-overlay');
  const closeBtn = document.getElementById('side-panel-close');

  if (!panel || !overlay) return;

  const openPanel = () => {
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closePanel = () => {
    panel.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (trigger) trigger.addEventListener('click', openPanel);
  if (closeBtn) closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      closePanel();
    }
  });
}

/* ============================================================
   4. RECENSIONI GOOGLE A DISSOLVENZA AUTOMATICA (FADE IN/OUT)
============================================================ */
// Recensioni reali dal profilo Google Maps di Barber FEB
const GOOGLE_REVIEWS = [
  {
    quote: "“Ottima esperienza: ambiente pulito e accogliente. Il barbiere è molto professionale e attento alle richieste. Taglio preciso e curato nei dettagli, con ottimi prodotti.”",
    author: "PAZZ P. • GOOGLE"
  },
  {
    quote: "“Taglio fatto benissimo, ragazzo gentile e simpatico. Qualità prezzo uno dei migliori in zona. Lo consiglio assolutamente.”",
    author: "MATTEO P. • GOOGLE"
  },
  {
    quote: "“Ottimo barbiere, lo consiglio vivamente perché merita: posto ben curato, ottimi prodotti, e lui molto gentile e socievole.”",
    author: "MATTIA • GOOGLE"
  },
  {
    quote: "“Barbiere molto bravo, rapporto qualità prezzo ottimo. Consigliatissimo.”",
    author: "LUCA P. • GOOGLE"
  },
  {
    quote: "“Sono stato per la prima volta, mi ha fatto un bel taglio e sono rimasto contentissimo.”",
    author: "GABRIELE M. • GOOGLE"
  }
];

function initReviewsFader() {
  const quoteEl = document.getElementById('fade-review-quote');
  const authorEl = document.getElementById('fade-review-author');
  const wrapper = document.querySelector('.review-fade-wrapper');
  const dots = document.querySelectorAll('.review-dot');

  if (!quoteEl || !authorEl || !wrapper) return;

  let currentIdx = 0;
  let timer = null;

  const setReview = (index) => {
    wrapper.classList.add('fade-out');

    setTimeout(() => {
      currentIdx = index;
      quoteEl.textContent = GOOGLE_REVIEWS[currentIdx].quote;
      authorEl.textContent = GOOGLE_REVIEWS[currentIdx].author;
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIdx);
      });

      wrapper.classList.remove('fade-out');
    }, 450);
  };

  const nextReview = () => {
    const next = (currentIdx + 1) % GOOGLE_REVIEWS.length;
    setReview(next);
  };

  const startTimer = () => {
    stopTimer();
    timer = setInterval(nextReview, 4500);
  };

  const stopTimer = () => {
    if (timer) clearInterval(timer);
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      setReview(idx);
      startTimer();
    });
  });

  const card = document.getElementById('google-reviews-fader');
  if (card) {
    card.addEventListener('mouseenter', stopTimer);
    card.addEventListener('mouseleave', startTimer);
  }

  startTimer();
}

/* ============================================================
   5. STATO ORARIO DINAMICO IN TEMPO REALE
============================================================ */
function initScheduleStatus() {
  const statusPill = document.getElementById('live-status-pill');
  const quickBadge = document.getElementById('schedule-quick-badge');

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHours + (currentMinutes / 60);
  const dayOfWeek = now.getDay(); // 0 = Dom, 1 = Lun, 2 = Mar, 3 = Mer, 4 = Gio, 5 = Ven, 6 = Sab

  const dayRowMapping = {
    1: 'row-lun',
    2: 'row-mar',
    3: 'row-mer',
    4: 'row-gio',
    5: 'row-ven',
    6: 'row-sab',
    0: 'row-dom'
  };

  const todayRowId = dayRowMapping[dayOfWeek];
  if (todayRowId) {
    const row = document.getElementById(todayRowId);
    if (row) row.classList.add('today');
  }

  // Orari ufficiali (uguali a Google Maps): [apertura, chiusura] in ore decimali
  const SCHEDULE = {
    0: [],                         // Domenica chiuso
    1: [[13, 21]],                 // Lunedì
    2: [[10, 13], [14, 21]],       // Martedì
    3: [[10, 13], [14, 21]],       // Mercoledì
    4: [[10, 13], [14, 21]],       // Giovedì
    5: [[10, 12.5], [13, 21]],     // Venerdì
    6: []                          // Sabato chiuso
  };
  const DAY_NAMES = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  const fmt = (h) => `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`;

  const todaySlots = SCHEDULE[dayOfWeek];
  const currentSlot = todaySlots.find(([open, close]) => currentTime >= open && currentTime < close);
  const isOpen = Boolean(currentSlot);
  let statusDetail = '';

  if (isOpen) {
    const nextSlot = todaySlots.find(([open]) => open >= currentSlot[1]);
    statusDetail = `Aperto fino alle ${fmt(currentSlot[1])}` + (nextSlot ? ` (riapre ${fmt(nextSlot[0])})` : '');
  } else {
    const laterToday = todaySlots.find(([open]) => open > currentTime);
    if (laterToday) {
      statusDetail = `Apre oggi alle ${fmt(laterToday[0])}`;
    } else {
      for (let i = 1; i <= 7; i++) {
        const d = (dayOfWeek + i) % 7;
        if (SCHEDULE[d].length) {
          const when = i === 1 ? 'domani' : DAY_NAMES[d];
          statusDetail = `Chiuso • Riapre ${when} alle ${fmt(SCHEDULE[d][0][0])}`;
          break;
        }
      }
    }
  }

  if (statusPill) {
    statusPill.innerHTML = `
      <span class="status-indicator ${isOpen ? 'open' : 'closed'}"></span>
      <span class="status-label">${isOpen ? 'APERTO ORA' : 'CHIUSO ORA'}</span>
      <span class="status-sub">• ${statusDetail}</span>
    `;
  }

  if (quickBadge) {
    quickBadge.textContent = isOpen ? 'Aperto ora' : 'Chiuso ora';
    quickBadge.style.color = isOpen ? '#ffffff' : '#888888';
  }
}

/* ============================================================
   6. MENU MOBILE
============================================================ */
function initNavigation() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-links');

  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
      const isOpen = menu.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
      }
    });
  }
}

/* ============================================================
   7. MODALE DETTAGLIO FOTO (LIGHTBOX)
============================================================ */
function openPhotoModal(title, category, imgSrc, desc) {
  const modal = document.getElementById('photo-modal');
  if (!modal) return;

  const titleEl = document.getElementById('modal-photo-title');
  const catEl = document.getElementById('modal-photo-cat');
  const imgEl = document.getElementById('modal-photo-img');
  const descEl = document.getElementById('modal-photo-desc');

  if (titleEl) titleEl.textContent = title;
  if (catEl) catEl.textContent = category.toUpperCase();
  if (imgEl) {
    imgEl.src = imgSrc;
    imgEl.alt = title;
  }
  if (descEl) descEl.textContent = desc;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
  const modal = document.getElementById('photo-modal');
  if (!modal) return;

  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function setupModalEvents() {
  const modal = document.getElementById('photo-modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePhotoModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closePhotoModal();
    }
  });
}

window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;
