# BARBER FEB — Sito Vetrina Ufficiale

Sito web moderno, sicuro e reattivo per **Barber FEB di Mattia Fabbri** a Minerbio (BO).

## Caratteristiche Principali

- **Design Dark & Verde Foresta:** Sfondo nero profondo (`#080b09`), tipografia moderna bianca (`Syne` + `Plus Jakarta Sans`) e dettagli verde foresta (`#2d6a4f` / `#52b788`).
- **Lookbook 360° Multi-Angolazione (Dual View):**
  - **Opzione A (Cinema Modal 360°):** Cliccando sulla card di un look si apre il visualizzatore a tutto schermo con navigazione rapida tra 5 angolazioni (Vista Frontale, Profilo Destro, Profilo Sinistro, Vista Posteriore, Dettaglio Sfumatura).
  - **Opzione B (Griglia 4 Angolazioni):** Visualizza tutte le 4 angolazioni principali (Fronte, Lato Dx, Lato Sx, Retro) affiancate contemporaneamente per ogni taglio.
  - Filtri per categoria: *Tutti*, *Taglio & Fade*, *Cura della Barba*, *Combo Completa*, *Meches & Colore*.
- **Listino Prezzi Ufficiale:**
  - Barba con rifinitura lametta: 15€
  - Taglio: 15€
  - Taglio e Shampoo: 18€
  - Taglio + Barba: 25€ *(Best Seller)*
  - Taglio + Trattamento Viso + Shampoo: 25€
- **Orari Dinamici in Tempo Reale:** Calcola automaticamente se il salone è attualmente aperto o chiuso in base agli orari di Minerbio ed evidenzia il giorno corrente.
- **Prenotazioni & Contatti Rapidi:**
  - Link diretto all'app **Take Care**.
  - Tasto **WhatsApp** diretto con messaggio precompilato (`+39 333 992 8198`).
  - Mappa interattiva Google Maps con navigatore GPS su **Via Canaletto 1, Minerbio (BO)**.
  - Profilo Instagram `@barber_feb`.
- **GDPR & Privacy:** Banner conforme alle linee guida del Garante Privacy per siti vetrina (cookie tecnici essenziali e salvataggio preferenze in `localStorage`).

---

## Come Sostituire le Foto Placeholder con Foto Reali

Le foto dei tagli possono essere caricate direttamente nella cartella `assets/` o `assets/placeholders/`.
I dati dei look si trovano nel file `js/app.js` nell'array `LOOKS_DATA`:

```javascript
{
  id: 'look-1',
  name: 'Low Taper Skin Fade',
  category: 'taglio',
  angles: [
    { id: 'front', title: 'Vista Frontale', file: 'assets/foto-reale-front.jpg' },
    { id: 'side-r', title: 'Profilo Destro', file: 'assets/foto-reale-destro.jpg' },
    ...
  ]
}
```

Basta inserire i file `.jpg` o `.png` e aggiornare i percorsi nel file `js/app.js`!
