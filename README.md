# 🌿 EMOVIA — Heal and Grow
> **A Comprehensive, Gamified Mental Health Sanctuary & Emergency Lifeline Platform**

[![React](https://img.shields.io/badge/Frontend-React%2018-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green.svg)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-SQLite-lightgrey.svg)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 🌟 Overview
**EMOVIA** (*Heal and Grow*) is an integrated mental wellness ecosystem designed to remove barriers to psychological support and emergency aid. Combining somatic mindfulness, gamified habit formation, and rapid emergency discovery, EMOVIA provides immediate lifelines alongside personalized emotional healing.

---

## 🚀 Key Modules & Features

### ⚡ 1. Saviour Lifeline (15 km Live GPS Radar)
- **Live GPS Locking**: High-accuracy real-time geolocation with one-tap refresh.
- **15 km Radius Haversine Filtering**: Instant distance calculation to the nearest verified emergency facilities:
  1. **🩸 Blood Banks**: 24/7 emergency component units, apheresis, rare blood groups, and night dispatch.
  2. **🧘 Meditation & Yoga Centres**: Classical Hatha yoga, breathwork (Pranayama), sound healing, and ashrams.
  3. **🧠 Psychiatrists & Counsellors**: RCI-licensed clinical psychologists, neuropsychiatrists, and 24/7 acute psychiatric crisis clinics.
- **Instant Actions**: One-tap direct calling (`tel:`) and Google Maps turn-by-turn directions.

### 🧠 2. Gamified 10-Question Mood Survey
- Replaces raw text inputs with a dynamic 10-question emotional survey assessing sleep, stress, joy, connection, and somatic energy.
- Real-time XP rewards (+10 XP per question).
- Calculates comprehensive **Mood Type Profiles** (e.g., *Radiant & Thriving*, *Serene & Balanced*, *Reflective Solitude*, *Tension Overload*, *Exhaustion & Depletion*).
- Provides personalized emotional diagnostics and actionable self-care micro-practices.

### 🌿 3. 30-Day Growth Garden (LeetCode-Style Activity Grid)
- Interactive 30-day mindfulness matrix where each completed daily challenge turns vibrant green (`✓`).
- Tracks active daily streaks, harvest completion percentage, and flower bloom tiers (*Seedling*, *Sprout*, *Blossom*, *Zen Lotus*).

### 📖 4. Journal Sanctuary
- Private reflection composer with emotion vibe tags (*Deep Peace*, *Gentle Reflection*, *Heavy Cloud*, *Creative Spark*, *Grounded*).
- Real-time search by keyword and sentiment stream.

### 🏆 5. Wellness Rewards Hub
- Tracks earned XP energy balance from daily activities and assessments.
- 6 unlockable achievement badges (*First Step*, *Mindful Soul*, *Garden Bloom*, *Streak Master*, *Emotional Zen*, *Zen Guru*).
- Redeemable wellness perks (Guided Audio Meditations, Aesthetic Mindfulness Wallpapers, Emotional First Aid E-Book).

### 🚨 6. India 24/7 National Emergency Directory & SOS Tab
- Sticky vertical floating SOS trigger on screen edge for one-touch crisis calling.
- Verified helpline database including:
  - **Tele-MANAS** (`14416` / `1800-891-4416`) — Govt. of India 24/7 Mental Health Helpline
  - **KIRAN Helpline** (`1800-599-0019`) — Dept. of Empowerment of Persons with Disabilities
  - **National Emergency Response** (`112`)
  - **Vandrevala Foundation** (`+91 9999 666 555`)
  - **AASRA Helpline** (`+91 98204 66726`)
  - **iCall (TISS)** (`9152987821`)
  - **NIMHANS Brain & Mental Health Desk** (`080-46110007`)
  - **National Ambulance** (`108` / `102`)

---

## 🛠️ Technology Stack
- **Frontend**: React 18, React Router v6, Vanilla CSS (Glassmorphism & High-Contrast Design System), HTML5 Geolocation API.
- **Backend**: Node.js, Express.js, CORS, SQLite3 (`database.db`).
- **Distance Calculation**: Haversine Trigonometric Formula.

---

## 💻 Local Setup & Execution

### Prerequisites
- Node.js (v16 or higher)
- npm

### 1. Clone & Enter Repository
```bash
git clone https://github.com/Nishthayadav20/emovia-heal-and-grow.git
cd emovia-heal-and-grow
```

### 2. Backend Setup
```bash
cd backend
npm install
node server.js
```
*Backend runs on `http://localhost:5000`*

### 3. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm start
```
*Frontend runs on `http://localhost:3000`*

---

## 🔒 Access Policy
- **Open to Everyone (Guests & Members)**: Landing Page (`/`), Emergency Directory (`/resources`), and Saviour 15 km Lifeline (`/saviour`).
- **Members Only**: Mood Tracker, Journal Sanctuary, 30-Day Growth Garden, and Wellness Rewards Hub.

---

## 👩‍💻 Author & Maintainer
Created and maintained by **Nishtha Yadav** ([@Nishthayadav20](https://github.com/Nishthayadav20)).
