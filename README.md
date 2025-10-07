# Dermaself - Skincare Companion

Una Progressive Web App mobile-first per la cura della pelle personalizzata, costruita con React, TypeScript e Tailwind CSS.

## 🌟 Caratteristiche Principali

### 📱 Esperienza Mobile-First
- **Design ottimizzato per mobile** con navigazione a schede inferiore
- **PWA installabile** per un'esperienza simile alle app native
- **Animazioni fluide** con Framer Motion
- **Interfaccia intuitiva** con design system coerente

### 🎯 Funzionalità Core

#### Today - Dashboard Giornaliera
- Saluto personalizzato con orario del giorno
- **Day Pills** - Tracciamento giornaliero della skincare routine
- **Routine video-guidate** con player immersivo full-screen
- **Skin Diary** - Diario della pelle con tracking dell'umore
- **Daily Affirmations** - Affermazioni quotidiane per il benessere

#### Products - Catalogo Prodotti
- **Collezioni curate** di prodotti skincare acne-safe
- **Fit percentage** - Percentuale di compatibilità con la tua pelle (90%+ Violet, 75-89% Emerald, <75% Gray)
- **Price pills** gialle con icone retailer
- **Ricerca avanzata** e filtri per categoria
- **Alternative intelligenti** - Suggerimenti di prodotti simili
- **Schede prodotto dettagliate** con analisi ingredienti

#### New Scan - Scanner Prodotti
- **Face Scanner** con overlay realistico
- **Scansione ingredienti** tramite camera o upload foto
- **Analisi AI** della compatibilità con la tua pelle
- **Raccomandazioni personalizzate** basate sui risultati

#### Insights - Tutorial & Guide
- **Video tutorial professionali** con player personalizzato
- **Playlist skincare** organizzate per argomento
- **Guide educative** su ingredienti e tecniche
- **Sezioni collassabili** per facile navigazione

#### Me - Profilo Utente
- **Gestione profilo** e preferenze
- **Skin type & concerns** personalizzati
- **Storico routine** e progressi
- **Impostazioni** e personalizzazioni

### 🎨 Features Avanzate

- **Video Player Immersivo** - Player full-screen con:
  - Playlist orizzontale scorrevole
  - Controlli avanzati (play, pause, skip, seek)
  - Progress bar interattiva
  - Navigazione step-by-step
  - Overlay gradient eleganti

- **Stories Viewer** - Visualizzazione storie in stile social
- **AI Chatbot** - Assistente virtuale per domande skincare
- **Subscription System** - Gestione abbonamenti premium
- **Face Scanner** - Analisi della pelle con tecnologia AI
- **Haptic Feedback** - Feedback tattile per interazioni

## 🛠 Stack Tecnologico

### Frontend
- **React 18** - UI library con hooks moderni
- **TypeScript** - Type safety e migliore DX
- **Vite** - Build tool ultra-veloce
- **React Router v6** - Routing client-side

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Design System custom** - Token semantici e componenti riutilizzabili
- **shadcn/ui** - Componenti accessibili basati su Radix UI
- **Framer Motion** - Animazioni fluide e transizioni

### State Management & Data
- **Zustand** - State management leggero con persistenza
- **SWR** - Data fetching con caching intelligente
- **LocalStorage** - Persistenza dati client-side

### Developer Experience
- **ESLint** - Linting del codice
- **TypeScript** - Type checking
- **Vite HMR** - Hot Module Replacement

## 🚀 Getting Started

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview build di produzione
npm run preview
```

L'app sarà disponibile su `http://localhost:8080`

## 📁 Struttura del Progetto

```
dermaself/
├── src/
│   ├── assets/              # Immagini e risorse statiche
│   ├── components/          # Componenti React riutilizzabili
│   │   ├── ui/             # Componenti UI di base (shadcn)
│   │   ├── VideoPlayer.tsx # Player video immersivo
│   │   ├── FaceScanner.tsx # Scanner viso con overlay
│   │   ├── StoriesViewer.tsx
│   │   ├── ChatbotUI.tsx
│   │   └── ...
│   ├── pages/              # Pagine principali dell'app
│   │   ├── Today.tsx       # Dashboard giornaliera
│   │   ├── Products.tsx    # Catalogo prodotti
│   │   ├── NewScan.tsx     # Scanner prodotti
│   │   ├── Insights.tsx    # Tutorial e guide
│   │   └── Me.tsx          # Profilo utente
│   ├── lib/                # Utilities e servizi
│   │   ├── services/       # API e servizi
│   │   ├── seed.ts         # Dati prodotti
│   │   └── utils.ts
│   ├── store/              # Zustand stores
│   │   ├── dayStore.ts     # State routine giornaliera
│   │   ├── diaryStore.ts   # State diario pelle
│   │   └── affirmationStore.ts
│   ├── hooks/              # Custom React hooks
│   └── index.css           # Stili globali e design tokens
├── public/
│   ├── images/             # Immagini pubbliche
│   └── fonts/              # Font personalizzati
└── ...
```

## 🎨 Design System

### Color Palette
Il design system si basa su token semantici HSL definiti in `src/index.css`:

- **Primary** - Viola vibrante per azioni principali
- **Secondary** - Toni complementari
- **Fit Pills** - Violet (90%+), Emerald (75-89%), Gray (<75%)
- **Price Pills** - Giallo con icone retailer
- **Muted** - Toni neutri per testo secondario

### Typography
- **Font principale** - Obviously (custom)
- **Sistema di scale** - Dimensioni responsive
- **Font weights** - Regular, Medium, Bold

### Spacing & Layout
- **Mobile-first** - Design ottimizzato per schermi piccoli
- **Grid system** - Layout flessibili con Tailwind
- **Safe areas** - Supporto per notch e bordi arrotondati

### Components
Tutti i componenti UI sono costruiti su shadcn/ui e personalizzati con:
- Rounded corners consistenti
- Soft shadows
- Smooth transitions
- Accessible by default

## 📦 Collezioni Prodotti

Il catalogo include collezioni curate:

1. **Acne-Safe Ceramides for Fall** - Ceramidi sicuri per pelle acneica
2. **Acne-Safe Rosehip Oil Blends** - Oli di rosa mosqueta
3. **Acne-Safe Squalane Cleansers** - Detergenti con squalano
4. **Acne-Safe PHA Serums** - Sieri con PHA

Ogni prodotto include:
- Immagine ad alta qualità
- Fit percentage personalizzato
- Price pills con retailer
- Analisi ingredienti
- Alternative intelligenti

## 🎬 Video Player

Il video player custom include:
- **Full-screen immersivo** con z-index massimo
- **Playlist orizzontale** con snap scrolling
- **Progress bar** interattiva con seek
- **Controlli avanzati** - Previous, Next, Skip ±5s
- **Gradient overlays** eleganti
- **Responsive** su tutti i dispositivi

## 🔒 Privacy & Sicurezza

- Tutti i dati sono salvati localmente
- Nessun tracking di terze parti
- PWA installabile offline-first
- Sicurezza by design

## 🚧 Roadmap

- [ ] Integrazione AI per analisi ingredienti real-time
- [ ] Sincronizzazione cloud (opzionale)
- [ ] Notifiche push per reminder routine
- [ ] Tracking progressi con foto timeline
- [ ] Community features e recensioni
- [ ] Dark mode ottimizzato

## 📱 Browser Support

- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 Licenza

Tutti i diritti riservati © 2025 Dermaself

---

Costruito con ❤️ per esperienze skincare belle, accessibili e personalizzate.
