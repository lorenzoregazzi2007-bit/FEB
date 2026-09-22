/**
 * BARBER FEB - Gestore Cookie & Informativa Privacy GDPR
 * Conforme alle linee guida del Garante per la Protezione dei Dati Personali (GDPR / Reg. UE 2016/679)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCookieConsent();
});

const COOKIE_STORAGE_KEY = 'barber_feb_gdpr_consent_v1';

function initCookieConsent() {
  const banner = document.getElementById('cookie-banner');
  const modal = document.getElementById('gdpr-modal');
  const acceptAllBtn = document.getElementById('cookie-accept-all');
  const acceptEssentialBtn = document.getElementById('cookie-accept-essential');
  const infoBtn = document.getElementById('cookie-open-info');
  const closeModalBtn = document.getElementById('gdpr-close-modal');
  const triggers = document.querySelectorAll('.cookie-settings-trigger');

  const savedConsent = localStorage.getItem(COOKIE_STORAGE_KEY);

  // Mostra banner solo se non è stata ancora espressa una preferenza
  if (!savedConsent && banner) {
    banner.style.display = 'block';
  }

  // Accetta tutti
  if (acceptAllBtn) {
    acceptAllBtn.addEventListener('click', () => {
      saveConsent({ technical: true, analytics: true, timestamp: new Date().toISOString() });
      hideBanner();
    });
  }

  // Solo tecnici / necessari
  if (acceptEssentialBtn) {
    acceptEssentialBtn.addEventListener('click', () => {
      saveConsent({ technical: true, analytics: false, timestamp: new Date().toISOString() });
      hideBanner();
    });
  }

  // Apertura modale informativa
  if (infoBtn) {
    infoBtn.addEventListener('click', () => {
      openGdprModal();
    });
  }

  // Trigger dal footer
  triggers.forEach(t => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      openGdprModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      closeGdprModal();
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeGdprModal();
    });
  }
}

function saveConsent(consentData) {
  localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(consentData));
}

function hideBanner() {
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.animation = 'none';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(30px)';
    banner.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      banner.style.display = 'none';
    }, 300);
  }
}

function openGdprModal() {
  const modal = document.getElementById('gdpr-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeGdprModal() {
  const modal = document.getElementById('gdpr-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

window.openGdprModal = openGdprModal;
window.closeGdprModal = closeGdprModal;
