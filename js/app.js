/**
 * BARBER FEB - Mobile First Logic
 * Minerbio (BO) - Mattia Fabbri
 */

document.addEventListener('DOMContentLoaded', () => {
  initScheduleStatus();
  initNavigation();
  setupModalEvents();
});

/* ============================================================
   1. STATO ORARIO DINAMICO IN TEMPO REALE
============================================================ */
function initScheduleStatus() {
  const statusPill = document.getElementById('live-status-pill');
  const quickBadge = document.getElementById('schedule-quick-badge');

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHours + (currentMinutes / 60);
  const dayOfWeek = now.getDay(); // 0 = Dom, 1 = Lun, 2 = Mar, 3 = Mer, 4 = Gio, 5 = Ven, 6 = Sab

  // Evidenzia riga giorno corrente nella tabella orari
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
   2. MENU MOBILE
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
   3. MODALE DETTAGLIO FOTO (LIGHTBOX)
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
