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
   1. INTRO STILE NETFLIX (logo BF → la B va a sinistra, la F a
      destra e in mezzo si compone "BARBER FEB")
============================================================ */

// Posizione di B e F dentro al logo originale (logo-white.png, 458x331)
const LOGO_SIZE = { w: 458, h: 331 };
const LOGO_PARTS = {
  b: { x: 4, y: 4, w: 222 },
  f: { x: 240, y: 5, w: 214 }
};

// Fasci di luce verticali che esplodono dietro al logo (come la sigla Netflix)
function burstIntroRays(container) {
  if (!container) return;
  const spread = Math.min(window.innerWidth * 0.55, 420);
  for (let i = 0; i < 26; i++) {
    const ray = document.createElement('span');
    ray.className = 'nf-ray';
    const width = 1 + Math.random() * (Math.random() < 0.25 ? 14 : 4);
    const start = (Math.random() - 0.5) * 40;
    const end = (Math.random() - 0.5) * spread * 2;
    ray.style.width = `${width}px`;
    ray.style.left = `${start}px`;
    container.appendChild(ray);
    ray.animate([
      { transform: 'translateX(0) scaleY(0.1)', opacity: 0 },
      { transform: `translateX(${end * 0.5}px) scaleY(1)`, opacity: 0.25 + Math.random() * 0.45, offset: 0.35 },
      { transform: `translateX(${end}px) scaleY(1.1)`, opacity: 0 }
    ], {
      duration: 1100 + Math.random() * 600,
      delay: 450 + Math.random() * 250,
      easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)',
      fill: 'both'
    });
  }
}

// Polvere e piccoli capelli che fluttuano lentamente nella luce
function startIntroDust(canvas) {
  if (!canvas || !canvas.getContext) return () => {};
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  const resize = () => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();

  const bits = Array.from({ length: 46 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.4 + Math.random() * 1.3,
    len: Math.random() < 0.3 ? 4 + Math.random() * 7 : 0, // alcuni sono capelli, non puntini
    angle: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.01,
    vx: (Math.random() - 0.5) * 0.15,
    vy: -0.08 - Math.random() * 0.25,
    alpha: 0.12 + Math.random() * 0.4
  }));

  let raf = 0;
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const maxD = Math.hypot(cx, cy);
    for (const b of bits) {
      b.x += b.vx;
      b.y += b.vy;
      b.angle += b.spin;
      if (b.y < -10) { b.y = h + 10; b.x = Math.random() * w; }
      if (b.x < -10) b.x = w + 10;
      if (b.x > w + 10) b.x = -10;
      // più luminosi vicino al centro, dove c'è il faro
      const light = 1 - Math.min(Math.hypot(b.x - cx, b.y - cy) / maxD, 1) * 0.75;
      ctx.globalAlpha = b.alpha * light;
      ctx.strokeStyle = ctx.fillStyle = '#ffffff';
      if (b.len) {
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(b.x - Math.cos(b.angle) * b.len / 2, b.y - Math.sin(b.angle) * b.len / 2);
        ctx.quadraticCurveTo(b.x + 2, b.y - 2, b.x + Math.cos(b.angle) * b.len / 2, b.y + Math.sin(b.angle) * b.len / 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    raf = requestAnimationFrame(draw);
  };
  raf = requestAnimationFrame(draw);
  window.addEventListener('resize', resize);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
  };
}

function initIntroScreen() {
  const intro = document.getElementById('intro-screen');
  if (!intro) return;

  // Movimento ridotto (o solo prima visita, se attivato): via subito
  if (document.documentElement.classList.contains('intro-skip')) {
    intro.remove();
    return;
  }

  const logo = document.getElementById('nf-logo');
  const glyphB = document.getElementById('nf-b');
  const glyphF = document.getElementById('nf-f');
  const timers = [];
  let exiting = false;
  let stopDust = () => {};

  // Mette il logo intero al centro, e B e F esattamente sopra le loro parti del logo.
  // La scritta finale resta ferma nel layout: animiamo solo le trasformazioni.
  const placeAsLogo = () => {
    glyphB.style.transform = glyphF.style.transform = 'none';
    const logoW = Math.min(window.innerWidth * 0.62, window.innerHeight * 0.42 * LOGO_SIZE.w / LOGO_SIZE.h, 340);
    const scale = logoW / LOGO_SIZE.w;
    const logoLeft = (window.innerWidth - logoW) / 2;
    const logoTop = (window.innerHeight - LOGO_SIZE.h * scale) / 2;

    logo.style.width = `${logoW}px`;
    logo.style.left = `${logoLeft}px`;
    logo.style.top = `${logoTop}px`;

    [[glyphB, LOGO_PARTS.b], [glyphF, LOGO_PARTS.f]].forEach(([el, part]) => {
      const r = el.getBoundingClientRect();
      const k = (part.w * scale) / r.width;
      const dx = logoLeft + part.x * scale - r.left;
      const dy = logoTop + part.y * scale - r.top;
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${k})`;
    });
  };

  const finish = () => {
    intro.classList.add('hide');
    document.dispatchEvent(new Event('intro:done'));
    document.body.style.overflow = '';
    window.removeEventListener('resize', onResize);
    try { localStorage.setItem('feb-intro-seen', '1'); } catch (e) {}
    setTimeout(() => {
      stopDust();
      intro.remove();
    }, 600);
  };

  const exit = () => {
    if (exiting) return;
    exiting = true;
    timers.forEach(clearTimeout);
    intro.classList.add('nf-exit');
    setTimeout(finish, 650);
  };

  const onResize = () => {
    if (!intro.classList.contains('nf-split')) placeAsLogo();
  };

  const start = () => {
    placeAsLogo();
    window.addEventListener('resize', onResize);
    stopDust = startIntroDust(document.getElementById('nf-dust'));
    // forza il calcolo prima di far partire le animazioni
    void intro.offsetWidth;
    intro.classList.add('nf-in');
    burstIntroRays(document.getElementById('nf-rays'));
    timers.push(setTimeout(() => intro.classList.add('nf-split'), 1750));
    timers.push(setTimeout(exit, 4100));
  };

  document.body.style.overflow = 'hidden';
  intro.addEventListener('click', exit);
  document.addEventListener('keydown', (e) => {
    if (['Enter', 'Escape', ' '].includes(e.key)) exit();
  });

  // Aspetta font e immagini, così le misure della scritta sono quelle giuste
  const imagesReady = [logo, glyphB, glyphF].map(img =>
    img.complete ? Promise.resolve() : new Promise(r => { img.onload = img.onerror = r; })
  );
  Promise.all([document.fonts ? document.fonts.ready : Promise.resolve(), ...imagesReady]).then(start);
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

  // Lo slideshow parte solo dopo l'intro, così la prima foto che si vede è sempre la prima
  if (document.getElementById('intro-screen')) {
    document.addEventListener('intro:done', () => {
      showSlide(0);
      startTimer();
    }, { once: true });
  } else {
    startTimer();
  }
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
