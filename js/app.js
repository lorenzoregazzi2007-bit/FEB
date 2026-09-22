/**
 * BARBER FEB - Lookbook Multi-Angolazione & Logica Minimalista
 * Minerbio (BO) - Mattia Fabbri
 */

document.addEventListener('DOMContentLoaded', () => {
  initScheduleStatus();
  initLookbook();
  initNavigation();
});

/* ============================================================
   DATI LOOKBOOK (SOSTITUIBILI CON FOTO REALI)
============================================================ */
const LOOKS_DATA = [
  {
    id: 'look-1',
    name: 'Low Taper Fade',
    category: 'taglio',
    tag: 'TAGLIO & SFUMATURA',
    description: 'Sfumatura bassa a pelle con ciuffo naturale texturizzato.',
    featuredAngle: 'front',
    angles: [
      { id: 'front', title: 'Vista Frontale', desc: 'Simmetria e volume frontale', file: 'assets/placeholders/look-1-front.svg' },
      { id: 'side-r', title: 'Profilo Destro', desc: 'Sfumatura laterale destra a rasoio', file: 'assets/placeholders/look-1-side-r.svg' },
      { id: 'side-l', title: 'Profilo Sinistro', desc: 'Precisione raccordo laterale sinistro', file: 'assets/placeholders/look-1-side-l.svg' },
      { id: 'back', title: 'Vista Posteriore', desc: 'Cono nuca e pulizia linea collo', file: 'assets/placeholders/look-1-back.svg' },
      { id: 'detail', title: 'Dettaglio', desc: 'Sfumatura a zero e rifinitura lametta', file: 'assets/placeholders/look-1-detail.svg' }
    ]
  },
  {
    id: 'look-2',
    name: 'Textured Crop',
    category: 'taglio',
    tag: 'TAGLIO & SFUMATURA',
    description: 'Crop in avanti moderno con frangia definita e mid fade.',
    featuredAngle: 'front',
    angles: [
      { id: 'front', title: 'Vista Frontale', desc: 'Frangia dritta e texture opaca', file: 'assets/placeholders/look-2-front.svg' },
      { id: 'side-r', title: 'Profilo Destro', desc: 'Mid drop fade arcuata', file: 'assets/placeholders/look-2-side-r.svg' },
      { id: 'side-l', title: 'Profilo Sinistro', desc: 'Transizione tempia', file: 'assets/placeholders/look-2-side-l.svg' },
      { id: 'back', title: 'Vista Posteriore', desc: 'Sfumatura posteriore morbida', file: 'assets/placeholders/look-2-back.svg' },
      { id: 'detail', title: 'Dettaglio', desc: 'Lavoro di forbice texturizzante', file: 'assets/placeholders/look-2-detail.svg' }
    ]
  },
  {
    id: 'look-3',
    name: 'Modellatura Barba',
    category: 'barba',
    tag: 'CURA DELLA BARBA',
    description: 'Sagomatura a mano libera con contorni affilati a lametta.',
    featuredAngle: 'side-r',
    angles: [
      { id: 'front', title: 'Vista Frontale', desc: 'Simmetria mento e baffi', file: 'assets/placeholders/look-3-front.svg' },
      { id: 'side-r', title: 'Profilo Destro', desc: 'Linea guancia definita a lametta', file: 'assets/placeholders/look-3-side-r.svg' },
      { id: 'side-l', title: 'Profilo Sinistro', desc: 'Angolo mandibolare pulito', file: 'assets/placeholders/look-3-side-l.svg' },
      { id: 'back', title: 'Dettaglio Collo', desc: 'Rifinitura sottomento tradizionale', file: 'assets/placeholders/look-3-back.svg' },
      { id: 'detail', title: 'Dettaglio', desc: 'Rasatura a pelo e contropelo', file: 'assets/placeholders/look-3-detail.svg' }
    ]
  },
  {
    id: 'look-4',
    name: 'Taglio & Barba',
    category: 'combo',
    tag: 'COMBO COMPLETA',
    description: 'Sfumatura millimetrica armonizzata con la barba sagomata.',
    featuredAngle: 'front',
    angles: [
      { id: 'front', title: 'Vista Frontale', desc: 'Equilibrio tra taglio e barba', file: 'assets/placeholders/look-4-front.svg' },
      { id: 'side-r', title: 'Profilo Destro', desc: 'Raccordo sfumato tra tempia e guancia', file: 'assets/placeholders/look-4-side-r.svg' },
      { id: 'side-l', title: 'Profilo Sinistro', desc: 'Geometria laterale sinistra', file: 'assets/placeholders/look-4-side-l.svg' },
      { id: 'back', title: 'Vista Posteriore', desc: 'Pulizia posteriore a 360°', file: 'assets/placeholders/look-4-back.svg' },
      { id: 'detail', title: 'Dettaglio', desc: 'Transizione millimetrica basette', file: 'assets/placeholders/look-4-detail.svg' }
    ]
  },
  {
    id: 'look-5',
    name: 'Meches & Fade',
    category: 'colore',
    tag: 'COLORE & MECHES',
    description: 'Schiariture platino fredde con sfumatura scura a contrasto.',
    featuredAngle: 'front',
    angles: [
      { id: 'front', title: 'Vista Frontale', desc: 'Luminosità superiore fredda', file: 'assets/placeholders/look-5-front.svg' },
      { id: 'side-r', title: 'Profilo Destro', desc: 'Contrasto tra platino e fade', file: 'assets/placeholders/look-5-side-r.svg' },
      { id: 'side-l', title: 'Profilo Sinistro', desc: 'Armonia laterale', file: 'assets/placeholders/look-5-side-l.svg' },
      { id: 'back', title: 'Vista Posteriore', desc: 'Sfumatura nuca scura naturale', file: 'assets/placeholders/look-5-back.svg' },
      { id: 'detail', title: 'Dettaglio', desc: 'Tonalizzazione anti-giallo e lucentezza', file: 'assets/placeholders/look-5-detail.svg' }
    ]
  },
  {
    id: 'look-6',
    name: 'Classic Taper',
    category: 'taglio',
    tag: 'TAGLIO CLASSICO',
    description: 'Taglio classico con volume ordinato e sfumatura pulita.',
    featuredAngle: 'side-r',
    angles: [
      { id: 'front', title: 'Vista Frontale', desc: 'Portamento naturale del ciuffo', file: 'assets/placeholders/look-6-front.svg' },
      { id: 'side-r', title: 'Profilo Destro', desc: 'Sfumatura conica pulita', file: 'assets/placeholders/look-6-side-r.svg' },
      { id: 'side-l', title: 'Profilo Sinistro', desc: 'Riga naturale definita', file: 'assets/placeholders/look-6-side-l.svg' },
      { id: 'back', title: 'Vista Posteriore', desc: 'Raccordo conico posteriore', file: 'assets/placeholders/look-6-back.svg' },
      { id: 'detail', title: 'Dettaglio', desc: 'Styling leggero matte finish', file: 'assets/placeholders/look-6-detail.svg' }
    ]
  }
];

let currentFilter = 'all';
let currentViewMode = 'option-a';
let activeModalLook = null;
let activeModalAngleIndex = 0;

function initLookbook() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderLookbook();
    });
  });

  viewToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewToggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentViewMode = btn.dataset.mode;
      renderLookbook();
    });
  });

  renderLookbook();
  setupModalEvents();
}

function renderLookbook() {
  const container = document.getElementById('lookbook-content-area');
  if (!container) return;

  const filtered = LOOKS_DATA.filter(look => {
    if (currentFilter === 'all') return true;
    return look.category === currentFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p style="color: var(--text-secondary); text-align: center; padding: 40px 0;">Nessun taglio in questa selezione.</p>`;
    return;
  }

  if (currentViewMode === 'option-a') {
    // ----------------------------------------------------------------
    // OPZIONE A: GRIGLIA MINIMAL CHE APRE IL VISUALIZZATORE COMPLETO
    // ----------------------------------------------------------------
    let html = `<div class="gallery-grid">`;
    filtered.forEach(look => {
      const mainAngle = look.angles.find(a => a.id === look.featuredAngle) || look.angles[0];
      html += `
        <div class="gallery-card" onclick="openLookModal('${look.id}')">
          <div class="gallery-card-image">
            <img src="${mainAngle.file}" alt="${look.name}" loading="lazy">
          </div>
          <div class="gallery-card-meta">
            <div>
              <span class="eyebrow" style="margin: 0; font-size: 0.65rem;">${look.tag}</span>
              <div class="gallery-card-title">${look.name}</div>
            </div>
            <div class="gallery-card-hint">5 Angolazioni →</div>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;

  } else {
    // ----------------------------------------------------------------
    // OPZIONE B: 4 ANGOLAZIONI PRINCIPALI DISPOSTE AFFIANCATE
    // ----------------------------------------------------------------
    let html = `<div class="quad-view">`;
    filtered.forEach(look => {
      const quadAngles = [
        look.angles.find(a => a.id === 'front') || look.angles[0],
        look.angles.find(a => a.id === 'side-r') || look.angles[1],
        look.angles.find(a => a.id === 'side-l') || look.angles[2],
        look.angles.find(a => a.id === 'back') || look.angles[3]
      ];

      html += `
        <div class="quad-item">
          <div class="quad-item-header">
            <div>
              <span class="eyebrow" style="margin: 0; font-size: 0.65rem;">${look.tag}</span>
              <h3 style="font-size: 1.15rem; font-weight: 500; color: #fff;">${look.name}</h3>
            </div>
            <a href="https://takecare.app" target="_blank" rel="noopener noreferrer" class="btn btn-ghost" style="padding: 6px 14px; font-size: 0.72rem;">
              Prenota
            </a>
          </div>
          <div class="quad-grid">
            ${quadAngles.map((ang, idx) => `
              <div class="quad-slot" onclick="openLookModal('${look.id}', ${idx})" title="Ingrandisci">
                <img src="${ang.file}" alt="${look.name} - ${ang.title}" loading="lazy">
                <div class="quad-slot-label">${ang.title}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;
  }
}

/* ============================================================
   MODAL LIGHTBOX
============================================================ */
function openLookModal(lookId, initialAngleIndex = 0) {
  const look = LOOKS_DATA.find(l => l.id === lookId);
  if (!look) return;

  activeModalLook = look;
  activeModalAngleIndex = initialAngleIndex;
  updateModalView();

  const modal = document.getElementById('look-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeLookModal() {
  const modal = document.getElementById('look-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function updateModalView() {
  if (!activeModalLook) return;

  const titleEl = document.getElementById('modal-look-title');
  const catEl = document.getElementById('modal-look-category');
  const mainImgEl = document.getElementById('modal-main-img');
  const angleLabelEl = document.getElementById('modal-angle-label');
  const angleDescEl = document.getElementById('modal-angle-desc');
  const thumbsContainer = document.getElementById('modal-angle-thumbs');

  const currentAngle = activeModalLook.angles[activeModalAngleIndex];

  if (titleEl) titleEl.textContent = activeModalLook.name;
  if (catEl) catEl.textContent = activeModalLook.tag;
  if (mainImgEl) {
    mainImgEl.src = currentAngle.file;
    mainImgEl.alt = `${activeModalLook.name} - ${currentAngle.title}`;
  }
  if (angleLabelEl) angleLabelEl.textContent = `${currentAngle.title} (${activeModalAngleIndex + 1}/5)`;
  if (angleDescEl) angleDescEl.textContent = currentAngle.desc;

  if (thumbsContainer) {
    thumbsContainer.innerHTML = activeModalLook.angles.map((angle, idx) => `
      <div class="modal-angle-btn ${idx === activeModalAngleIndex ? 'active' : ''}" onclick="setModalAngle(${idx})">
        <div class="modal-angle-btn-title">${angle.title}</div>
      </div>
    `).join('');
  }
}

function setModalAngle(index) {
  if (!activeModalLook || index < 0 || index >= activeModalLook.angles.length) return;
  activeModalAngleIndex = index;
  updateModalView();
}

function nextModalAngle() {
  if (!activeModalLook) return;
  activeModalAngleIndex = (activeModalAngleIndex + 1) % activeModalLook.angles.length;
  updateModalView();
}

function prevModalAngle() {
  if (!activeModalLook) return;
  activeModalAngleIndex = (activeModalAngleIndex - 1 + activeModalLook.angles.length) % activeModalLook.angles.length;
  updateModalView();
}

function setupModalEvents() {
  const modal = document.getElementById('look-modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLookModal();
  });

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeLookModal();
    if (e.key === 'ArrowRight') nextModalAngle();
    if (e.key === 'ArrowLeft') prevModalAngle();
  });
}

window.openLookModal = openLookModal;
window.closeLookModal = closeLookModal;
window.setModalAngle = setModalAngle;
window.nextModalAngle = nextModalAngle;
window.prevModalAngle = prevModalAngle;

/* ============================================================
   ORARIO DINAMICO
============================================================ */
function initScheduleStatus() {
  const statusPill = document.getElementById('live-status-pill');
  if (!statusPill) return;

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHours + (currentMinutes / 60);
  const dayOfWeek = now.getDay(); // 0 = Dom, 1 = Lun, 2 = Mar, 3 = Mer, 4 = Gio, 5 = Ven, 6 = Sab

  let isOpen = false;
  let statusText = '';

  const dayRowMapping = { 1: 'row-lun', 2: 'row-mar', 3: 'row-mer', 4: 'row-gio', 5: 'row-ven', 6: 'row-sab', 0: 'row-dom' };
  const todayRowId = dayRowMapping[dayOfWeek];
  if (todayRowId) {
    const row = document.getElementById(todayRowId);
    if (row) row.classList.add('today');
  }

  if (dayOfWeek === 1) { // Lunedì
    isOpen = (currentTime >= 13.5 && currentTime < 20.0);
    statusText = isOpen ? 'Aperto fino alle 20:00' : 'Chiuso (Apre 13:30)';
  } else if (dayOfWeek === 2) { // Martedì
    isOpen = (currentTime >= 9.0 && currentTime < 12.5) || (currentTime >= 13.0 && currentTime < 20.0);
    statusText = isOpen ? 'Aperto ora' : 'Chiuso';
  } else if (dayOfWeek >= 3 && dayOfWeek <= 5) { // Mercoledì, Giovedì, Venerdì
    isOpen = (currentTime >= 9.0 && currentTime < 12.5) || (currentTime >= 13.5 && currentTime < 21.0);
    statusText = isOpen ? 'Aperto fino alle 21:00' : 'Chiuso';
  } else if (dayOfWeek === 6) { // Sabato
    isOpen = (currentTime >= 8.0 && currentTime < 13.5);
    statusText = isOpen ? 'Aperto fino alle 13:30' : 'Chiuso';
  } else {
    isOpen = false;
    statusText = 'Chiuso (Domenica)';
  }

  statusPill.innerHTML = `
    <span class="status-indicator ${isOpen ? 'open' : 'closed'}"></span>
    <span style="color: #ffffff;">${isOpen ? 'Aperto ora' : 'Chiuso ora'}</span>
    <span style="color: var(--text-secondary); margin-left: 6px;">${statusText}</span>
  `;
}

/* ============================================================
   MENU MOBILE
============================================================ */
function initNavigation() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-links');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => menu.classList.remove('open'));
    });
  }
}
