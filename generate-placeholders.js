const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'assets', 'placeholders');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const angles = [
  { id: 'front', label: 'VISTA FRONTALE', icon: '👤', desc: 'Simmetria, ciuffo e proporzioni' },
  { id: 'side-r', label: 'PROFILO DESTRO', icon: '➡️', desc: 'Sfumatura laterale destra e basetta' },
  { id: 'side-l', label: 'PROFILO SINISTRO', icon: '⬅️', desc: 'Sfumatura laterale sinistra e raccordo' },
  { id: 'back', label: 'VISTA POSTERIORE', icon: '🔄', desc: 'Cono nuca, pulizia linea collo' },
  { id: 'detail', label: 'DETTAGLIO SFUMATURA', icon: '🔍', desc: 'Precisione lametta e dissolvenza 0mm' }
];

const styles = [
  { id: 'look-1', name: 'Low Taper Skin Fade', tag: 'TAGLIO & FADE' },
  { id: 'look-2', name: 'Mid Fade & Textured Crop', tag: 'TAGLIO & FADE' },
  { id: 'look-3', name: 'Barba Sculpt con Lametta', tag: 'CURA DELLA BARBA' },
  { id: 'look-4', name: 'Full Combo: Cut & Beard', tag: 'TAGLIO + BARBA' },
  { id: 'look-5', name: 'Platinum Ice & Fade', tag: 'MECHES & COLORE' },
  { id: 'look-6', name: 'Classic Pompadour Modern', tag: 'TAGLIO & FADE' }
];

styles.forEach((style, styleIdx) => {
  angles.forEach((angle, angleIdx) => {
    const filename = `${style.id}-${angle.id}.svg`;
    const filepath = path.join(dir, filename);

    // Dynamic graphic variations per angle
    let angleGraphic = '';
    if (angle.id === 'front') {
      angleGraphic = `
        <circle cx="300" cy="210" r="85" fill="#151b17" stroke="#2d6a4f" stroke-width="2.5"/>
        <path d="M250 170 Q300 130 350 170 Q350 200 300 185 Q250 200 250 170 Z" fill="#2d6a4f" opacity="0.85"/>
        <ellipse cx="280" cy="205" rx="7" ry="5" fill="#52b788"/>
        <ellipse cx="320" cy="205" rx="7" ry="5" fill="#52b788"/>
        <path d="M275 235 Q300 250 325 235" stroke="#52b788" stroke-width="2" fill="none"/>
        <path d="M260 250 Q300 300 340 250 Q300 270 260 250 Z" fill="#1b4332" opacity="0.9"/>
      `;
    } else if (angle.id === 'side-r') {
      angleGraphic = `
        <ellipse cx="300" cy="210" rx="75" ry="90" fill="#151b17" stroke="#2d6a4f" stroke-width="2.5"/>
        <path d="M245 160 Q320 140 360 200 Q330 220 300 185 Z" fill="#2d6a4f" opacity="0.9"/>
        <path d="M365 210 Q340 215 345 235 Q365 240 370 225 Z" fill="#1b4332" stroke="#52b788" stroke-width="1.5"/>
        <!-- Fade gradient lines -->
        <line x1="260" y1="210" x2="310" y2="210" stroke="#52b788" stroke-width="2" stroke-dasharray="4 2"/>
        <line x1="265" y1="230" x2="315" y2="230" stroke="#52b788" stroke-width="1.5" stroke-dasharray="6 3"/>
        <line x1="270" y1="250" x2="310" y2="250" stroke="#52b788" stroke-width="1" stroke-dasharray="8 4"/>
      `;
    } else if (angle.id === 'side-l') {
      angleGraphic = `
        <ellipse cx="300" cy="210" rx="75" ry="90" fill="#151b17" stroke="#2d6a4f" stroke-width="2.5"/>
        <path d="M355 160 Q280 140 240 200 Q270 220 300 185 Z" fill="#2d6a4f" opacity="0.9"/>
        <path d="M235 210 Q260 215 255 235 Q235 240 230 225 Z" fill="#1b4332" stroke="#52b788" stroke-width="1.5"/>
        <!-- Fade gradient lines -->
        <line x1="290" y1="210" x2="340" y2="210" stroke="#52b788" stroke-width="2" stroke-dasharray="4 2"/>
        <line x1="285" y1="230" x2="335" y2="230" stroke="#52b788" stroke-width="1.5" stroke-dasharray="6 3"/>
        <line x1="290" y1="250" x2="330" y2="250" stroke="#52b788" stroke-width="1" stroke-dasharray="8 4"/>
      `;
    } else if (angle.id === 'back') {
      angleGraphic = `
        <circle cx="300" cy="205" r="85" fill="#151b17" stroke="#2d6a4f" stroke-width="2.5"/>
        <path d="M230 160 Q300 130 370 160 Q360 220 300 220 Q240 220 230 160 Z" fill="#2d6a4f" opacity="0.9"/>
        <path d="M260 250 L340 250 L320 295 L280 295 Z" fill="#111714" stroke="#52b788" stroke-width="1.5"/>
        <!-- Neck taper clean line -->
        <line x1="260" y1="265" x2="340" y2="265" stroke="#52b788" stroke-width="2.5"/>
      `;
    } else { // detail
      angleGraphic = `
        <circle cx="300" cy="210" r="100" fill="#151b17" stroke="#52b788" stroke-width="2" stroke-dasharray="8 4"/>
        <path d="M240 220 C270 210, 310 190, 360 210" stroke="#52b788" stroke-width="3" fill="none"/>
        <path d="M250 240 C280 230, 310 220, 350 235" stroke="#2d6a4f" stroke-width="2" fill="none"/>
        <polygon points="280,180 320,180 315,225 285,225" fill="#52b788" opacity="0.3"/>
        <line x1="220" y1="130" x2="380" y2="290" stroke="#52b788" stroke-width="1" opacity="0.4"/>
      `;
    }

    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d0b"/>
      <stop offset="60%" stop-color="#111714"/>
      <stop offset="100%" stop-color="#0b110e"/>
    </linearGradient>
    <linearGradient id="primaryGreen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2d6a4f"/>
      <stop offset="100%" stop-color="#52b788"/>
    </linearGradient>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1b2a21" stroke-width="0.75" opacity="0.4"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="600" height="450" fill="url(#bgGrad)"/>
  <rect width="600" height="450" fill="url(#grid)"/>

  <!-- Tech crosshairs & frame -->
  <rect x="20" y="20" width="560" height="410" rx="16" fill="none" stroke="#243b2f" stroke-width="1.5"/>
  <circle cx="30" cy="30" r="3" fill="#52b788"/>
  <circle cx="570" cy="30" r="3" fill="#52b788"/>
  <circle cx="30" cy="420" r="3" fill="#52b788"/>
  <circle cx="570" cy="420" r="3" fill="#52b788"/>

  <!-- Central Visual Silhouette -->
  ${angleGraphic}

  <!-- Header Badge: Style Name & Category -->
  <rect x="40" y="40" width="140" height="24" rx="6" fill="#1b4332" opacity="0.8"/>
  <text x="110" y="56" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#52b788" text-anchor="middle" letter-spacing="1.5">${style.tag}</text>
  <text x="40" y="86" font-family="'Syne', sans-serif" font-size="20" font-weight="800" fill="#f8fafc">${style.name}</text>

  <!-- Angle Badge Center Top -->
  <rect x="410" y="40" width="150" height="30" rx="8" fill="#15241b" stroke="#52b788" stroke-width="1"/>
  <text x="485" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#f8fafc" text-anchor="middle" letter-spacing="1.2">
    ${angle.icon} ${angle.label}
  </text>

  <!-- Bottom Details Bar -->
  <rect x="40" y="375" width="520" height="40" rx="10" fill="#0d1410" stroke="#1f3427" stroke-width="1"/>
  <text x="60" y="400" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="500" fill="#94a3b8">
    <tspan fill="#52b788" font-weight="700">ANGOLAZIONE ${angleIdx + 1}/5:</tspan> ${angle.desc}
  </text>
  <text x="540" y="400" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="#52b788" text-anchor="end">
    BARBER FEB • 360°
  </text>
</svg>
    `.trim();

    fs.writeFileSync(filepath, svgContent, 'utf-8');
  });
});

console.log('Successfully generated placeholder SVG graphics for all looks and angles!');
