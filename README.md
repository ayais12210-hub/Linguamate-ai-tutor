

# 🌐 Linguamate — AI Language Tutor

Cross-Platform AI-Powered Language Learning App  
*(Expo + React Native + TypeScript + tRPC + Hono backend, with Rork Toolkit integration)*

---

## ✨ Overview

**Linguamate** is a production-grade, **cross-platform AI tutor** for **iOS, Android, and Web**.  
It combines **structured lessons**, **conversational AI practice**, and **advanced language modules** into one cohesive experience.  

- Built on **modern Expo + React Native + tRPC stack**  
- Powered by **AI-driven insights (LLMs + speech APIs)**  
- Compatible with **Expo Go v53** (no native modules required)  
- Designed for **scalability, accessibility, and offline readiness**

**Use cases:**  
- Learners who want guided daily practice  
- Students supplementing classroom lessons  
- Travellers needing conversational fluency  
- Professionals polishing language skills  

---

## 🚀 Navigation (Expo Router)

- Root stack: `app/_layout.tsx`  
- Tabs: `app/(tabs)/_layout.tsx` → **Learn · Lessons · Modules · Chat · Profile**  
- Hidden routes:  
  - Translator (embedded in Chat tab)  
  - Leaderboard (rendered inside Profile tab)  

---

## 🧩 Core Features

### 💬 AI Coach Chat
- Inline translator panel embedded in Chat  
- Suggestion chips for guided dialogue  
- Premium gating (message caps on free tier)  
- Remaining message counter + upsell paths  

### 📖 Learn Hub
- Alphabet + Numbers (with pronunciation playback)  
- Vocabulary, phrases, grammar, dialogues  
- Phonics trainer & quick flashcards  
- AI Tips & Quick Quiz  

### 🎯 Lessons
- AI-generated via `toolkit.rork.com`  
- Exercise types: MCQ, fill-blank, match pairs, word order, listening/speaking  
- XP rewards, “perfect” bonus, recap flows  
- Lessons cached in AsyncStorage  

### 🧑‍🏫 Advanced Modules
- Alphabet, Numbers, Vowels, Consonants, Syllables  
- Grammar, Sentences, Dialogue, Pronunciation, Culture  
- Post-module AI Quiz bonus XP  
- Per-module progress tracking  

### 👤 Profile & Leaderboard
- Stats, achievements, weekly goals  
- Local personal journal (no cloud storage)  
- Leaderboard with filters, sorting, detail modals  
- Premium upsell integrated  

### 🔒 Offline UX
- Banners for online/offline state  
- Queue helpers + optimistic UI updates  
- React Query `onlineManager` integration  

### 🔍 Observability
- Structured logs with correlation IDs  
- Client/server error boundaries  
- Health endpoints (`/api/health`, `/api/info`)  

---

## 🏗 Architecture

### State Management
- **Server state:** React Query (`lib/react-query.ts`)  
- **Local UI state:** React hooks + scoped providers (`state/`)  

### Backend
- **Hono server** (`backend/hono.ts`) with:  
  - CORS, request logging, correlation, security headers  
- **tRPC router** (`backend/trpc/app-router.ts`):  
  - Auth, User, Lessons, Learn, Chat, Analytics, Leaderboard  
- Exposed routes: `/api`, `/api/trpc`, `/api/info`  

### tRPC Client
- Auto base-URL detection (native vs web)  
- Batched HTTP requests with HTML guard  
- SuperJSON transformer, 15s timeout  
- Typed results (end-to-end safety)  

### Theming
- Dark mode aware (`lib/theme.ts`)  
- Semantic tokens: colors, spacing, radii, shadows  
- Pre-styled UI atoms: buttons, inputs, cards, toasts  

### Error Handling
- `components/ErrorBoundary.tsx` with retry/reset  
- Structured debugging output in dev builds  

---

## 🎤 AI & Media

- **LLM:**  
  - `@rork/toolkit-sdk generateObject` → AIQuiz  
  - Direct POST → `toolkit.rork.com/text/llm/` for lessons/tips  

- **Speech-to-Text (STT):**  
  - Web: MediaRecorder → FormData → `/stt/transcribe`  
  - Native: `expo-av` (HIGH_QUALITY) → FormData → `/stt/transcribe`  

- **Text-to-Speech (TTS):**  
  - Mock `speak()` for Expo Go/Web (no expo-speech dep)  
  - Future: real TTS integration (expo-speech / cloud fallback)  

---

## 📡 Data Usage & Privacy

### Local Storage (AsyncStorage)
- Lessons: completion + cached data  
- Profile: personal journal (local only)  
- UI preferences: theme, settings  

### Network
- tRPC endpoints: `/api/trpc`  
- LLM endpoints: `toolkit.rork.com`  

### Privacy & Security
- No secrets in client repo  
- Configs via `EXPO_PUBLIC_*` env vars  
- Structured, minimal error messages  

---

## ⚙️ Environment Variables

EXPO_PUBLIC_BACKEND_URL=https://api.example.com EXPO_PUBLIC_TOOLKIT_URL=https://toolkit.rork.com

- Must be set at runtime  
- Backend exposes `/api` and `/api/trpc`  

---

## 📂 Project Structure (Simplified)

app/             # Screens & navigation └─ (tabs)/      # Main tabs + hidden routes backend/         # Hono server + tRPC router components/      # Shared UI (AIQuiz, ErrorBoundary, banners) hooks/           # Chat store, user store, speech recorder lib/             # tRPC client, theme, i18n, React Query modules/         # Learning modules state/           # Providers for learning progress schemas/         # Validation schemas constants/       # App constants docs/            # Store + compliance docs

---

## 🚀 Getting Started

1. Install dependencies  
   ```bash
   bun install

2. Run with tunnel

bunx rork start --tunnel

or use:

npm run start
npm run start-web


3. Open:

Mobile: scan QR with Expo Go

Web: open browser at localhost:xxxx





---

🛠 Troubleshooting

tRPCClientError: Failed to fetch
→ Ensure ${EXPO_PUBLIC_BACKEND_URL}/api is reachable

Split bundle error (@tanstack/query-devtools)
→ Disable devtools or keep ngrok tunnel alive

STT / Audio issues
→ Grant mic permissions (Web: MediaRecorder; Native: expo-av preset)

CORS / AI fetch errors
→ Confirm toolkit.rork.com reachable



---

✅ CI / CD & Quality Gates

Workflows

CI: Lint · Typecheck · Tests · Coverage (Codecov)

EAS Preview: Android APK + iOS Simulator on pushes

EAS Release: AAB + IPA on tags (vX.Y.Z)


Quality Assessment

Semgrep (static analysis)

Gitleaks (secret scan)

npm audit security reports

Playwright E2E tests

Lighthouse CI (Perf, A11y, Best Practices, SEO)


Badges

Quality

Coverage

Security

Accessibility




---

🔒 Security Notes

Transport: HTTPS only (TLS enforced; no cleartext)

Secrets: Never commit; only EXPO_PUBLIC_* client vars

Backend: rate limiting, abuse controls, CORS restricted in prod

AI moderation: server-side filtering for prompts/responses

Permissions: mic only on explicit user action

Logging: redact tokens, no PII in logs

Storage: expo-secure-store for tokens (native); cookies/localStorage (web fallback)

Dependencies: keep Expo/React Native updated; CI dependency scanning

Play Console: Data Safety form mapped; App Signing enabled



---

🎨 Design System

Centralised tokens: colors, spacing, radii, shadows

Theme-aware components across tabs + headers

Influenced by iOS, Airbnb, Coinbase design patterns

Subtle depth, shadows, modern typography



---

♿ Accessibility

Accessible labels, ARIA roles, alt text on images

Dark mode + high contrast themes

Touch targets ≥44px (WCAG standard)

Keyboard navigation supported on web

Automated A11y tests in CI



---

🧪 Testing Strategy

Unit tests: Jest + React Testing Library

Integration tests: Module flows, API state

E2E: Playwright (Chromium + WebKit)

QA: Lighthouse, Accessibility, Performance reports

Error injection: validate ErrorBoundaries



---

🚦 Release Process

1. Dev branch → PR → CI pipeline must pass


2. Merge into develop → auto-build EAS preview (APK + iOS Simulator)


3. Tag vX.Y.Z → auto-release AAB + IPA via EAS


4. Changelog: auto-drafted by Release Drafter


5. Store submission: use docs/store/Release-Checklist-Store.md




---

📊 Observability

Logs: correlation IDs, structured JSON format

Metrics: /api/health, /api/info

Reports: Lighthouse, A11y, Coverage, Security uploaded to CI artifacts



---

🤝 Contributing

PRs must pass lint + typecheck + tests before merge

Add testIDs to new UI elements

Prefer tRPC + React Query for server state management

Follow Conventional Commits (feat:, fix:, chore: etc.)



---

📜 License

Proprietary. © 2025 Rork. All rights reserved.


---

📌 Roadmap

[ ] Expanded i18n packs (multi-locale metadata & UI strings)

[ ] Full Text-to-Speech integration (expo-speech / cloud fallback)

[ ] Advanced AI conversation modes (roleplay, open-ended chat)

[ ] Offline lesson authoring + sync

[ ] Educator dashboard + classroom leaderboard

[ ] Premium analytics dashboard for teachers/parents

[ ] Additional learning content types (dictation, timed tests)

[ ] Gamification: badges, streak multipliers, seasonal events



---

README.md is already super comprehensive, but right now it only covers the frontend side (Expo/React Native/Web).

Since you also have a Hono + tRPC backend (backend/hono.ts, backend/trpc/app-router.ts), adding a “How to Run the Backend Server” section will make it contributor-friendly and complete.

Here’s an improved section you can drop straight into your README.md ⬇️


---

## 🖥️ Running the Backend Server

The backend powers all API requests, AI lesson generation, chat moderation, and database interactions. It’s built with Hono (minimal web framework) + tRPC for type-safe APIs.

## 🔧 Prerequisites

Node.js ≥ 18 (or Bun ≥ 1.0 if you prefer Bun runtime)

Package manager: Bun (recommended) or npm/yarn/pnpm

Environment file: .env with backend configs (see below)


## ⚙️ Environment Variables

Create a .env file in the project root:

# Backend API
PORT=4000
NODE_ENV=development

# External services
EXPO_PUBLIC_BACKEND_URL=http://localhost:4000
EXPO_PUBLIC_TOOLKIT_URL=https://toolkit.rork.com

# Optional monitoring
SENTRY_DSN=<your-sentry-dsn>
LOGTAIL_TOKEN=<your-logtail-token>

> Only EXPO_PUBLIC_* vars are exposed to the client. Keep secrets server-side.



## ▶️ Starting the Backend

Option 1 — Using Bun (recommended)

bun install
bun run backend/hono.ts

Option 2 — Using Node.js

npm install
npm run backend:start

(You can add a "backend:start": "tsx backend/hono.ts" script in package.json.)

## 📡 API Routes

Once running, the backend exposes these endpoints:

GET /api/health → Health check

GET /api/info → Service metadata

POST /api/stt/transcribe → Speech-to-text proxy

POST /api/trpc/... → tRPC router (Auth, Lessons, Learn, Chat, Leaderboard, Analytics)


## 🔍 Logs & Debugging

Requests are logged with correlation IDs for tracing.

In development, verbose logs are enabled.

In production, sensitive data is redacted.


## 🧪 Testing the Backend

curl http://localhost:4000/api/health

Expected output:

{ "status": "ok", "uptime": 123.45 }

## 🌐 Running Backend + Frontend Together

Start backend first (bun run backend/hono.ts).

Then start frontend:

bunx rork start --tunnel

The Expo app will auto-detect the EXPO_PUBLIC_BACKEND_URL and route API calls to it.



---

⚡ With this addition, your README.md will now guide new contributors from zero → backend running → full stack working locally.



---

⚡ This doc now covers: **overview, navigation, features, architecture, AI/Media, privacy, environment, troubleshooting, CI/CD, security, design, accessibility, testing, release process, observability, contributing, licensing, and roadmap.**  


