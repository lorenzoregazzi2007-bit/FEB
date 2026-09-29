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
});

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

  // Apertura automatica dopo 1.8 secondi (tempo di 2 tagli della forbice)
  setTimeout(() => {
    if (!intro.classList.contains('hide')) {
      dismissIntro();
    }
  }, 1900);
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
const GOOGLE_REVIEWS = [
  {
    quote: "“Son venuto fin da Milano per tagliarmi i capelli qui e mi ha fatto il miglior taglio che potessi desiderare.”",
    author: "LUCA F. • GOOGLE"
  },
  {
    quote: "“Professionalità e cura del dettaglio senza paragoni. Sfumatura a pelle perfetta e barba sagomata con precisione chirurgica.”",
    author: "ALESSANDRO M. • GOOGLE"
  },
  {
    quote: "“Locale moderno, intimo e pulitissimo. Mattia è un vero professionista che ascolta e valorizza ogni capello. Non lo cambierei per nulla al mondo.”",
    author: "FEDERICO G. • GOOGLE"
  },
  {
    quote: "“Il trattamento panno caldo e rasatura tradizionale con lametta è un'esperienza da provare. Puntualità impeccabile e grande simpatia.”",
    author: "DAVIDE T. • GOOGLE"
  },
  {
    quote: "“Skin fade pulitissima e precisa al millimetro. Se cerchi qualità autentica e cura del cliente a Minerbio, Barber FEB è il posto giusto.”",
    author: "RICCARDO B. • GOOGLE"
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

  let isOpen = false;
  let statusDetail = '';

  if (dayOfWeek === 1) { // Lunedì
    isOpen = (currentTime >= 13.5 && currentTime < 20.0);
    statusDetail = isOpen ? 'Aperto fino alle 20:00' : (currentTime < 13.5 ? 'Apre oggi alle 13:30' : 'Chiuso • Riapre domani 09:00');
  } else if (dayOfWeek === 2) { // Martedì
    isOpen = (currentTime >= 9.0 && currentTime < 12.5) || (currentTime >= 13.0 && currentTime < 20.0);
    statusDetail = isOpen ? (currentTime < 12.5 ? 'Aperto fino alle 12:30 (riapre 13:00)' : 'Aperto stasera fino alle 20:00') : (currentTime < 9.0 ? 'Apre oggi alle 09:00' : 'Chiuso • Riapre domani 09:00');
  } else if (dayOfWeek >= 3 && dayOfWeek <= 5) { // Mercoledì, Giovedì, Venerdì
    isOpen = (currentTime >= 9.0 && currentTime < 12.5) || (currentTime >= 13.5 && currentTime < 21.0);
    statusDetail = isOpen ? (currentTime < 12.5 ? 'Aperto fino alle 12:30 (riapre 13:30)' : 'Aperto stasera fino alle 21:00') : (currentTime < 9.0 ? 'Apre oggi alle 09:00' : 'Chiuso • Riapre alle 09:00');
  } else if (dayOfWeek === 6) { // Sabato
    isOpen = (currentTime >= 8.0 && currentTime < 13.5);
    statusDetail = isOpen ? 'Aperto fino alle 13:30' : 'Chiuso • Riapre lunedì 13:30';
  } else { // Domenica
    isOpen = false;
    statusDetail = 'Domenica Chiuso • Riapre lunedì 13:30';
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
