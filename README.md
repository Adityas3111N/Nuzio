# Nuzio AI — Architecture & Developer Guide

Nuzio is an AI-powered personalized audio news briefing application. It delivers tailored, executive-level news briefings in natural voice accents (Aria, Kai, Meera).

---

## 1. Architecture Summary

```
nuzio/
├── client/          # React 19 + TypeScript + Vite + Tailwind CSS (Mobile-first PWA UI)
└── server/          # Node.js + Express + MongoDB + Neural TTS Engine + RSS Feeds
```

---

## 2. Frontend (`client/`)

### Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (`Plus Jakarta Sans` body, `Newsreader` editorial serif, ambient glow gradients)
- **Icons**: Lucide React

### Key Directories
- `src/features/`: Screen components split by lifecycle:
  - `onboarding/`: 5-step onboarding flow (`SplashView`, `LanguageView`, `ProfessionView`, `TopicsView`, `VoiceView`, `TimeView`, `NotificationsView`, `ReadyView`).
  - `main/`: Core app views (`BriefView`, `DiscoverView`, `SettingsView`, `BillingView`).
- `src/context/`:
  - `AppContext.tsx`: Global navigation, user preferences state, live stories cache, and bookmark sync with backend.
  - `AudioContext.tsx`: HTML5 Audio playback controller, scrub/seek, speed rates (0.75x–2x), dynamic waveform animation.
- `src/constants/data.ts`: Narrator profiles (Aria, Kai, Meera), category lists, fallback story dataset.
- `src/types/index.ts`: TypeScript contracts for Stories, Preferences, Narrators, and Navigation.

---

## 3. Backend (`server/`)

### Stack
- **Framework**: Express.js (Node.js ES Modules)
- **Database**: MongoDB via Mongoose
- **Audio & TTS**: `google-tts-api` (neural voice streams per regional accent)
- **News Ingestion**: `rss-parser` (TechCrunch AI, Startups, Mint)

### Key Modules
- `models/`:
  - `Preference.js`: User settings, topic selections, selected narrator, and bookmarks.
  - `Story.js`: News articles with multi-narrator audio URLs, excerpts, scripts, and read/listen durations.
  - `MorningBrief.js`: Personalized daily briefing bundles.
- `services/`:
  - `ttsService.js`: Audio synthesis for Aria (`en-GB`), Kai (`en-US`), and Meera (`en-IN`).
  - `newsService.js`: RSS fetching, content cleaning, and automatic TTS stream generation.
- `seed/seedData.js`: Preloaded stories matching the design system with instant TTS links.

---

## 4. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server status & MongoDB connection state |
| `GET` | `/api/preferences` | Fetch user preferences & bookmarks |
| `POST` | `/api/preferences` | Update user preferences |
| `POST` | `/api/preferences/bookmark` | Toggle saved state for a story ID |
| `GET` | `/api/stories` | Get stories (supports `?category=` & `?search=`) |
| `GET` | `/api/stories/:id` | Get individual story details |
| `POST` | `/api/stories/sync` | Trigger live RSS feeds fetch |
| `GET` | `/api/brief/today` | Get today's personalized 5-story brief bundle |
| `GET` | `/api/audio/sample/:voiceId` | Stream 10s voice sample for onboarding preview |
| `GET` | `/api/audio/story/:id` | Stream narrator-specific TTS story audio |

---

## 5. Quick Start

### Backend
```bash
cd server
npm install
npm run dev      # Starts on http://localhost:5000
```

### Frontend
```bash
cd client
npm install
npm run dev      # Starts on http://localhost:3000 (proxies /api to :5000)
```
