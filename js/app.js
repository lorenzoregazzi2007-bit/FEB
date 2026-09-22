/**
 * BARBER FEB - Interattività Sito & Gallery Lookbook Multi-Angolazione
 * Barber FEB di Mattia Fabbri - Minerbio (BO)
 */

document.addEventListener('DOMContentLoaded', () => {
  initScheduleStatus();
  initLookbook();
  initNavigation();
});

/* ============================================================
   1. DATI LOOKBOOK (FACILMENTE PERSONALIZZABILI CON FOTO REALI)
============================================================ */
const LOOKS_DATA = [
  {
    id: 'look-1',
    name: 'Low Taper Skin Fade',
    category: 'taglio',
    tag: 'TAGLIO & SFUMATURA',
    description: 'Sfumatura a pelle bassa millimetrica con cono nuca pulito e ciuffo texturizzato naturale.',
    featuredAngle: 'front',
    angles: [
      { id: 'front', title: 'Vista Frontale', desc: 'Simmetria frontale, volume e raccordo basette', file: 'assets/placeholders/look-1-front.svg' },
      { id: 'side-r', title: 'Profilo Destro', desc: 'Sfumatura a pelle laterale destra a rasoio', file: 'assets/placeholders/look-1-side-r.svg' },
      { id: 'side-l', title: 'Profilo Sinistro', desc: 'Raccordo continuo e precisione millimetrica', file: 'assets/placeholders/look-1-side-l.svg' },
      { id: 'back', title: 'Vista Posteriore', desc: 'Cono nuca squadrato a cono e linea collo definita', file: 'assets/placeholders/look-1-back.svg' },
      { id: 'detail', title: 'Dettaglio Sfumatura', desc: 'Macro sfumatura 0mm e rifinitura a lametta', file: 'assets/placeholders/look-1-detail.svg' }
    ]
  },
  {
    id: 'look-2',
    name: 'Mid Fade & Textured Crop',
    category: 'taglio',
    tag: 'TAGLIO & SFUMATURA',
    description: 'Taglio crop contemporaneo in avanti con frangia texturizzata e sfumatura media decisa.',
    featuredAngle: 'front',
    angles: [
      { id: 'front', title: 'Vista Frontale', desc: 'Texture superiore opaca e frangia dritta', file: 'assets/placeholders/look-2-front.svg' },
      { id: 'side-r', title: 'Profilo Destro', desc: 'Mid drop fade arcuata dietro l’orecchio', file: 'assets/placeholders/look-2-side-r.svg' },
      { id: 'side-l', title: 'Profilo Sinistro', desc: 'Transizione perfetta tra corona e tempia', file: 'assets/placeholders/look-2-side-l.svg' },
      { id: 'back', title: 'Vista Posteriore', desc: 'Sfumatura morbida alla base occipitale', file: 'assets/placeholders/look-2-back.svg' },
      { id: 'detail', title: 'Dettaglio Texture', desc: 'Lavoro di forbice a punto e pasta matte', file: 'assets/placeholders/look-2-detail.svg' }
    ]
  },
  {
    id: 'look-3',
    name: 'Barba Sculpt & Linee Lametta',
    category: 'barba',
    tag: 'CURA DELLA BARBA',
    description: 'Modellatura sagomata con contorni ultra-definiti a mano libera con rasoio a lama intera.',
    featuredAngle: 'side-r',
    angles: [
      { id: 'front', title: 'Vista Frontale', desc: 'Squadratura mento e simmetria baffi', file: 'assets/placeholders/look-3-front.svg' },
      { id: 'side-r', title: 'Profilo Destro', desc: 'Linea guancia affilata e sfumatura basetta', file: 'assets/placeholders/look-3-side-r.svg' },
      { id: 'side-l', title: 'Profilo Sinistro', desc: 'Definizione angolo mandibolare', file: 'assets/placeholders/look-3-side-l.svg' },
      { id: 'back', title: 'Dettaglio Collo', desc: 'Pulizia sottomento a lametta tradizionale', file: 'assets/placeholders/look-3-back.svg' },
      { id: 'detail', title: 'Dettaglio Rifinitura', desc: 'Rasatura a pelo e contropelo con panno caldo', file: 'assets/placeholders/look-3-detail.svg' }
    ]
  },
  {
    id: 'look-4',
    name: 'Full Combo: Taglio & Barba',
    category: 'combo',
    tag: 'COMBO COMPLETA',
    description: 'Il nostro servizio signature: skin fade impeccabile raccordata alla perfezione con la barba sagomata.',
    featuredAngle: 'front',
    angles: [
      { id: 'front', title: 'Vista Frontale', desc: 'Armonia totale tra taglio capelli e barba piena', file: 'assets/placeholders/look-4-front.svg' },
      { id: 'side-r', title: 'Profilo Destro', desc: 'Sfumatura invertita: dai capelli alla barba', file: 'assets/placeholders/look-4-side-r.svg' },
      { id: 'side-l', title: 'Profilo Sinistro', desc: 'Geometria perfetta e contorni nitidi', file: 'assets/placeholders/look-4-side-l.svg' },
      { id: 'back', title: 'Vista Posteriore', desc: 'Cono nuca pulito e simmetria 360°', file: 'assets/placeholders/look-4-back.svg' },
      { id: 'detail', title: 'Dettaglio Basetta', desc: 'Punto di raccordo a zero tra tempia e guancia', file: 'assets/placeholders/look-4-detail.svg' }
    ]
  },
  {
    id: 'look-5',
    name: 'Platinum Ice & Fade',
    category: 'colore',
    tag: 'MECHES & COLORE',
    description: 'Decolorazione platino fredda ghiaccio con tonalizzazione anti-giallo e sfumatura scura a contrasto.',
    featuredAngle: 'front',
    angles: [
      { id: 'front', title: 'Vista Frontale', desc: 'Contrasto cromatico tra platino e sopracciglia', file: 'assets/placeholders/look-5-front.svg' },
      { id: 'side-r', title: 'Profilo Destro', desc: 'Stacco netto tra tonalità fredda e dark fade', file: 'assets/placeholders/look-5-side-r.svg' },
      { id: 'side-l', title: 'Profilo Sinistro', desc: 'Luce e movimento sulle ciocche superiori', file: 'assets/placeholders/look-5-side-l.svg' },
      { id: 'back', title: 'Vista Posteriore', desc: 'Armonia 360° della sfumatura', file: 'assets/placeholders/look-5-back.svg' },
      { id: 'detail', title: 'Dettaglio Colore', desc: 'Fibra capillare protetta e lucentezza silver', file: 'assets/placeholders/look-5-detail.svg' }
    ]
  },
  {
    id: 'look-6',
    name: 'Classic Pompadour Modern',
    category: 'taglio',
    tag: 'TAGLIO & SFUMATURA',
    description: 'Volume classico pettinato all’indietro reinterpretato con sfumatura bassa e finitura semilucida.',
    featuredAngle: 'side-r',
    angles: [
      { id: 'front', title: 'Vista Frontale', desc: 'Altezza frontale e tenuta morbida', file: 'assets/placeholders/look-6-front.svg' },
      { id: 'side-r', title: 'Profilo Destro', desc: 'Curva fluida del ciuffo e fade classica', file: 'assets/placeholders/look-6-side-r.svg' },
      { id: 'side-l', title: 'Profilo Sinistro', desc: 'Riga naturale definita e pulizia', file: 'assets/placeholders/look-6-side-l.svg' },
      { id: 'back', title: 'Vista Posteriore', desc: 'Raccordo conico posteriore senza stacchi', file: 'assets/placeholders/look-6-back.svg' },
      { id: 'detail', title: 'Dettaglio Styling', desc: 'Pettinatura con pomade ad acqua professionale', file: 'assets/placeholders/look-6-detail.svg' }
    ]
  }
];

/* ============================================================
   2. GESTIONE LOOKBOOK & DUAL VIEW MODE (OPZIONE A vs B)
============================================================ */
let currentFilter = 'all';
let currentViewMode = 'option-a'; // 'option-a' (Cinema Modal 360) o 'option-b' (Quad-Grid)
let activeModalLook = null;
let activeModalAngleIndex = 0;

function initLookbook() {
  const container = document.getElementById('lookbook-content-area');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const viewModeBtns = document.querySelectorAll('.view-mode-btn');

  // Gestione Filtri Categoria
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderLookbook();
    });
  });

  // Gestione Switcher Modalità di Visualizzazione (A vs B)
  viewModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewModeBtns.forEach(b => b.classList.remove('active'));
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

  const filteredLooks = LOOKS_DATA.filter(look => {
    if (currentFilter === 'all') return true;
    return look.category === currentFilter;
  });

  if (filteredLooks.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <p>Nessun look trovato in questa categoria al momento.</p>
      </div>
    `;
    return;
  }

  if (currentViewMode === 'option-a') {
    // ----------------------------------------------------
    // OPZIONE A: GRID DI CARD CON MODAL 360° / CAROSELLO ANGOLAZIONI
    // ----------------------------------------------------
    let html = `<div class="lookbook-grid">`;
    filteredLooks.forEach(look => {
      const mainAngle = look.angles.find(a => a.id === look.featuredAngle) || look.angles[0];
      html += `
        <div class="look-card" onclick="openLookModal('${look.id}')">
          <div class="look-card-media">
            <img src="${mainAngle.file}" alt="${look.name} - ${mainAngle.title}" loading="lazy">
            <div class="look-card-overlay">
              <div class="look-card-badge-row">
                <span class="badge-tag">${look.tag}</span>
                <span class="angle-counter-badge">5 Angolazioni Disponibili</span>
              </div>
              <h3 class="look-card-title">${look.name}</h3>
              <p class="look-card-action-hint">
                <span>🔄 Clicca per esplorare a 360°</span>
              </p>
            </div>
          </div>
          <div style="padding: 18px 20px; background: var(--bg-card); display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.85rem; color: var(--text-muted);">${look.description}</span>
            <span style="color: var(--forest-neon); font-size: 1.2rem; margin-left: 10px;">→</span>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;

  } else {
    // ----------------------------------------------------
    // OPZIONE B: QUAD-GRID (4 ANGOLAZIONI AFFIANCATE A COLPO D'OCCHIO)
    // ----------------------------------------------------
    let html = `<div class="quad-grid-container">`;
    filteredLooks.forEach(look => {
      // Prendiamo le 4 angolazioni cardine: Fronte, Lato Dx, Lato Sx, Retro
      const quadAngles = [
        look.angles.find(a => a.id === 'front') || look.angles[0],
        look.angles.find(a => a.id === 'side-r') || look.angles[1],
        look.angles.find(a => a.id === 'side-l') || look.angles[2],
        look.angles.find(a => a.id === 'back') || look.angles[3]
      ];

      html += `
        <div class="quad-look-row">
          <div class="quad-header">
            <div>
              <span class="badge-tag" style="margin-bottom: 6px;">${look.tag}</span>
              <h3 class="quad-title">${look.name}</h3>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 4px;">${look.description}</p>
            </div>
            <a href="https://takecare.app" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 9px 18px; font-size: 0.85rem;">
              Prenota questo stile
            </a>
          </div>
          <div class="quad-slots-grid">
            ${quadAngles.map((ang, idx) => `
              <div class="quad-angle-slot" onclick="openLookModal('${look.id}', ${idx})" title="Clicca per ingrandire">
                <img src="${ang.file}" alt="${look.name} - ${ang.title}" loading="lazy">
                <div class="quad-angle-label">${ang.title}</div>
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
   3. MODAL LIGHTBOX INTERATTIVO (VISUALIZZATORE ANGOLAZIONI)
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
    document.body.style.overflow = 'hidden'; // Blocca scroll pagina
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
  if (angleLabelEl) angleLabelEl.textContent = `${currentAngle.title} (Angolazione ${activeModalAngleIndex + 1} di ${activeModalLook.angles.length})`;
  if (angleDescEl) angleDescEl.textContent = currentAngle.desc;

  // Render miniature angolazioni sotto il display principale
  if (thumbsContainer) {
    thumbsContainer.innerHTML = activeModalLook.angles.map((angle, idx) => `
      <div class="angle-thumb ${idx === activeModalAngleIndex ? 'active' : ''}" onclick="setModalAngle(${idx})">
        <img class="angle-thumb-img" src="${angle.file}" alt="${angle.title}">
        <span class="angle-thumb-title">${angle.title}</span>
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

  // Chiusura al click sul backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLookModal();
    }
  });

  // Navigazione da tastiera (Frecce Sx/Dx ed ESC)
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeLookModal();
    if (e.key === 'ArrowRight') nextModalAngle();
    if (e.key === 'ArrowLeft') prevModalAngle();
  });
}

// Rendi le funzioni globali per gli onclick inline
window.openLookModal = openLookModal;
window.closeLookModal = closeLookModal;
window.setModalAngle = setModalAngle;
window.nextModalAngle = nextModalAngle;
window.prevModalAngle = prevModalAngle;

/* ============================================================
   4. LOGICA ORARI & STATO DINAMICO APERTO/CHIUSO IN TEMPO REALE
============================================================ */
function initScheduleStatus() {
  const statusPill = document.getElementById('live-status-pill');
  if (!statusPill) return;

  const now = new Date();
  // Calcolo con fuso orario Europa/Roma
  const options = { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false };
  const dayName = now.toLocaleDateString('it-IT', { timeZone: 'Europe/Rome', weekday: 'long' }).toLowerCase();
  
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHours + (currentMinutes / 60);

  // Orari Barber FEB:
  // Lun: 13:30 - 20:00 (13.5 a 20.0)
  // Mar: 9:00 - 12:30 (9.0 a 12.5) & 13:00 - 20:00 (13.0 a 20.0)
  // Mer, Gio, Ven: 9:00 - 12:30 (9.0 a 12.5) & 13:30 - 21:00 (13.5 a 21.0)
  // Sab: 8:00 - 13:30 (8.0 a 13.5)
  // Dom: Chiuso

  let isOpen = false;
  let statusMessage = '';

  const dayOfWeek = now.getDay(); // 0 = Dom, 1 = Lun, 2 = Mar, 3 = Mer, 4 = Gio, 5 = Ven, 6 = Sab

  // Evidenzia riga giorno corrente nella tabella orari
  const dayRowMapping = { 1: 'row-lun', 2: 'row-mar', 3: 'row-mer', 4: 'row-gio', 5: 'row-ven', 6: 'row-sab', 0: 'row-dom' };
  const todayRowId = dayRowMapping[dayOfWeek];
  if (todayRowId) {
    const rowEl = document.getElementById(todayRowId);
    if (rowEl) rowEl.classList.add('today-highlight');
  }

  if (dayOfWeek === 1) { // Lunedì
    if (currentTime >= 13.5 && currentTime < 20.0) {
      isOpen = true;
      statusMessage = 'Aperto oggi fino alle 20:00';
    } else {
      statusMessage = currentTime < 13.5 ? 'Apre oggi alle 13:30' : 'Chiuso • Riapre domani alle 09:00';
    }
  } else if (dayOfWeek === 2) { // Martedì
    if ((currentTime >= 9.0 && currentTime < 12.5) || (currentTime >= 13.0 && currentTime < 20.0)) {
      isOpen = true;
      statusMessage = currentTime < 12.5 ? 'Aperto fino alle 12:30 (riapre 13:00)' : 'Aperto fino alle 20:00';
    } else {
      statusMessage = currentTime < 9.0 ? 'Apre oggi alle 09:00' : 'Chiuso • Riapre domani alle 09:00';
    }
  } else if (dayOfWeek >= 3 && dayOfWeek <= 5) { // Mercoledì, Giovedì, Venerdì
    if ((currentTime >= 9.0 && currentTime < 12.5) || (currentTime >= 13.5 && currentTime < 21.0)) {
      isOpen = true;
      statusMessage = currentTime < 12.5 ? 'Aperto fino alle 12:30 (riapre 13:30)' : 'Aperto stasera fino alle 21:00';
    } else {
      statusMessage = currentTime < 9.0 ? 'Apre oggi alle 09:00' : 'Chiuso • Riapre alle 09:00';
    }
  } else if (dayOfWeek === 6) { // Sabato
    if (currentTime >= 8.0 && currentTime < 13.5) {
      isOpen = true;
      statusMessage = 'Aperto oggi fino alle 13:30';
    } else {
      statusMessage = currentTime < 8.0 ? 'Apre stamattina alle 08:00' : 'Chiuso per il weekend • Riapre lunedì 13:30';
    }
  } else { // Domenica
    isOpen = false;
    statusMessage = 'Domenica Chiuso • Riapre lunedì alle 13:30';
  }

  statusPill.innerHTML = `
    <span class="status-dot ${isOpen ? 'status-open' : 'status-closed'}"></span>
    <span style="font-weight: 700; color: ${isOpen ? '#10b981' : '#f43f5e'};">
      ${isOpen ? 'APERTO ORA' : 'CHIUSO ORA'}
    </span>
    <span style="color: var(--text-muted); font-size: 0.82rem;">• ${statusMessage}</span>
  `;
}

/* ============================================================
   5. MENU MOBILE & NAVIGAZIONE FLUIDA
============================================================ */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    });

    // Chiudi menu al click su un link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    });
  }
}
