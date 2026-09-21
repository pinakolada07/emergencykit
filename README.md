# 🚨 LIFELINE — Personal Emergency Command Center

> *"When every second matters, everything you need should be in one place."*

**LifeLine** is a futuristic, mission-control grade emergency coordination web platform designed to help individuals execute:
**DETECT → UNDERSTAND → ALERT → COORDINATE → RESOLVE**

---

## 🛰️ Core Features

- **Personal Operations Deck**: Real-time system clock, GPS telemetry lock (`±3m` accuracy), global safety status (`● YOU ARE SAFE`), emergency action panel, quick action tiles, live radar map preview, and 87% readiness score breakdown.
- **Emergency Activation Protocol**: 4-step wizard (*Classification → Location Pin → Contacts Tier → 2-Second Hold Verification*) to eliminate accidental activations while providing speed under distress.
- **Hero Emergency Mode**: Pulsating crimson alert headers, live elapsed seconds counter, *"HELP REQUEST INITIATED"* status card, animated 6-phase response timeline, first-responder verbal read-aloud script, immediate safety instructions, and a safe resolution protocol.
- **Tactical Live Map**: Leaflet dark map with CartoDB Dark Matter tiles, pulsing user GPS beacon, color-coded emergency pins for Hospitals, Police, Fire Rescue, 24/7 Pharmacies, Safe Shelters, incident severity pins, and detailed facility drawers.
- **Lifeline AI Emergency Intelligence**: Neural triage interface with 4 one-click presets (*Motorcycle Crash, Chest Pain & Dyspnea, Apartment Kitchen Fire, Lost Hiker in Storm*). Generates structured assessments: Incident Type, Urgency Level, Key Hazard Factors, Action Checklist, and 911 verbal read-aloud dispatcher script.
- **Trusted Contacts Tier**: Verified emergency contacts network with simulated instant **Alert** broadcasts, an encrypted satellite **Voice Call** modal with audio waveform visualizers, quick encrypted SMS messaging, and contact management.
- **Incidents Operations Log**: Searchable and filterable history (*All, In Progress, Resolved, Critical*), and deep incident inspector with chronological event logs and responder milestone tracking.
- **Analytics Dashboard**: Recharts data visualizations: Donut chart for incident category distribution, area chart tracking dispatch response velocity progression, and monthly frequency bar chart.
- **Medical Profile & ICE Directives**: Encrypted medical ID card with blood type (*O+*), registered organ donor badge, known allergies, existing medical conditions, and emergency first-responder directives.
- **Command Palette & Sound Engine**: Global `⌘K` / `Ctrl+K` keyboard-navigable command palette and Web Audio API synthesizer for mission-control sonar pings, alert bleeps, and resolution chords with an instant mute toggle.
- **Judges Showcase Scenario**: One-click automated evaluation scenario that steps evaluators through the complete end-to-end journey.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS + Tailwind CSS (Custom `#06080C` dark mission-control palette, glassmorphism, glow filters)
- **Icons**: Lucide React
- **Animations**: Framer Motion & CSS keyframe animations
- **Charts**: Recharts
- **Mapping**: Leaflet with CartoDB Dark Matter Tiles
- **Audio**: Native Web Audio API Sound Synthesizer
- **State**: React Context with `localStorage` persistence

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/pinakolada07/emergencykit.git

# Enter project directory
cd emergencykit

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Build Production Bundle
```bash
npm run build
```

---

## ⚖️ Disclaimer

*LifeLine is built as a competition and demonstration emergency coordination platform. External dispatch and contact notifications run in high-fidelity simulation mode. No live emergency services (911/112) are contacted.*
