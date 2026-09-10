# MEDU VADA 🩺
### Adaptive AI-Powered Pre-Consultation Kiosk & Clinical Intake Assistant

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-0284c7?style=for-the-badge&logo=googlechrome&logoColor=white)](https://ishan12369.github.io/SIH_project/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Integrated-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Motion-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

🔗 **Live Deployment**: **[https://ishan12369.github.io/SIH_project/](https://ishan12369.github.io/SIH_project/)**

> 🚀 **Experience the Live App**: Click the link above to interact with the pre-consultation kiosk directly in your browser.  
> **Core Clinical Principle**: *AI Drafts • Physician Verifies • Never Autonomous*

---

## 📖 Overview

**MEDU VADA** is a next-generation pre-consultation kiosk application designed to eliminate outpatient triage bottlenecks in high-volume hospitals, clinics, and health centers. 

Doctors in outpatient departments (OPD) typically spend **40% to 60%** of consultation time performing repetitive clerical history intake and transcribing handwritten notes. **MEDU VADA** engages patients while they wait in the queue through an empathetic conversational voice/text intake interface, extracts records from previous lab reports via OCR, and compiles a clean, structured, physician-ready clinical intake summary with ICD-10 suggestions.

---

## ✨ Key Features

### 🎙️ 1. Conversational Health Assessment (Voice & Text)
- **Hands-Free Voice Input**: Uses Web Speech Recognition for patients who prefer speaking over typing.
- **Smart Quick-Select Chips**: Facilitates quick symptom description for fast check-ins.
- **Adaptive Clinical Questioning**: Follows symptom timelines, severity scales (1–10), and contextual follow-ups.
- **Emergency Triage Alerting**: Immediately flags red-flag symptoms (e.g., crushing chest pain, acute dyspnea) with high-priority warnings.

### 📄 2. Smart Clinical Records & Document OCR
- **Document Drag-and-Drop**: Ingests past prescriptions, discharge summaries, and blood test reports.
- **Automated Metric Extraction**: Pulls key lab vitals (HbA1c, fasting glucose, lipid profiles, blood pressure) and medication lists.
- **Document History**: Keeps previous uploads readily accessible for cross-comparison.

### 📋 3. Physician Summary Generator (7 Standard Modules)
Generates structured clinical summaries formatted for rapid physician review before the patient steps into the consultation room:
1. **Chief Complaint (CC)**
2. **History of Present Illness (HPI)**
3. **Past Medical & Surgical History (PMH)**
4. **Current Medications & Known Allergies**
5. **Review of Systems (ROS)**
6. **Physical Findings & Extracted Vitals**
7. **Clinical Impression & Suggested ICD-10 Codes** (e.g., `E11.9`, `I10`)
- **Interactive Editing**: Doctors or clinical assistants can inline-edit every section prior to final submission.
- **1-Click Clinical Copy & Export**: Instant clipboard copy and printable summary.

### 🩺 4. Immersive Patient Interface & Doctor Avatar
- **Interactive Doctor Avatar**: Greets patients, provides friendly audio guidance, and helps lower clinic anxiety.
- **Dynamic Thematic Scroll**: Continuous smooth background gradient morphing as the patient navigates through assessment stages.
- **Ambient Clinical Elements**: Floating stethoscopes, ECG monitors, diagnostic syringes, and prescription items.
- **All Chapters Quick Navigator**: Interactive full-drawer chapter index for jumping between triage sections.

### 🔒 5. Patient Demographics & Offline-First Persistence
- **Comprehensive Patient Profile**: Captures full name, age, gender, blood group, contact, and emergency next-of-kin.
- **Cloud & Local Storage**: Integrated with **Supabase** for secure authentication and visit history, paired with local storage fallback for offline continuity.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/), Custom Modular Vanilla CSS Design System |
| **Animations & FX** | [GSAP 3](https://greensock.com/) (ScrollTrigger), [Lottie Web](https://airbnb.io/lottie/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Voice & Speech** | [React Speech Recognition](https://www.npmjs.com/package/react-speech-recognition), Web Speech API |
| **Backend & Auth** | [Supabase Client](https://supabase.com/docs/reference/javascript/introduction) |
| **Linting & Tooling** | [Oxlint](https://oxc.rs/) |

---

## 📁 Project Structure

```text
sih-project/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── audio/                # Sound effects & doctor greetings
│   ├── 404.html              # SPA redirect for GitHub Pages routing
│   └── favicon.svg           # Application branding
├── src/
│   ├── components/
│   │   ├── chat/             # Chat bubbles & conversational input
│   │   ├── landing/          # Awwwards-style hero & feature showcase
│   │   ├── layout/           # Navbar, Sidebar, ProtectedRoute
│   │   ├── summary/          # Clinical summary cards & red flag alerts
│   │   ├── unleash/          # Unleashing design system components
│   │   └── unleashing/       # Doctor Avatar, Clinical Views, Modals & Items
│   ├── contexts/
│   │   └── AuthContext.jsx   # Supabase authentication provider
│   ├── data/                 # Sample patient records & ICD datasets
│   ├── lib/
│   │   └── supabase.js       # Supabase client initialization
│   ├── pages/
│   │   ├── UnleashingPage.jsx# Unified interactive kiosk experience
│   │   ├── LandingPage.jsx   # Hero presentation landing page
│   │   ├── AuthPage.jsx      # Patient login & registration
│   │   ├── ChatPage.jsx      # Dedicated conversational assessment
│   │   ├── UploadPage.jsx    # Document upload & OCR preview
│   │   └── SummaryPage.jsx   # Detailed physician clinical summary
│   ├── services/             # Mock upload & OCR extraction services
│   ├── styles/               # Clinical, landing & unleashing stylesheets
│   ├── App.jsx               # Top-level routing & layout controller
│   └── main.jsx              # React DOM entry point
├── .env.example              # Template for Supabase credentials
├── index.html                # HTML entry point with medical typography
├── package.json              # Dependencies and build scripts
├── tailwind.config.js        # Tailwind styling tokens & font families
└── vite.config.js            # Vite build configuration with relative base
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version **18.0.0** or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ISHAN12369/SIH_project.git
   cd SIH_project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** *(Optional for demo mode)*:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Supabase project credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
   *(Note: The app runs in offline demo mode automatically if Supabase keys are not set).*

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

5. **Build for production**:
   ```bash
   npm run build
   ```
   Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment & Hosting

### Option A: Hosting on GitHub Pages (Automated Workflow)

This repository includes a GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Push your changes to GitHub:
   ```bash
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages** (under Code and automation).
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to the `main` branch will automatically build and publish your site at:
   ```
   https://ishan12369.github.io/SIH_project/
   ```

### Option B: Hosting on Vercel (Zero Config)

1. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Select and import your `SIH_project` GitHub repository.
3. Keep default settings (`Framework Preset: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
4. Add any environment variables from your `.env` file.
5. Click **Deploy**.

### Option C: Hosting on Netlify

1. Go to [Netlify](https://www.netlify.com/) and choose **Import from Git**.
2. Select `SIH_project`.
3. Set build command: `npm run build` and publish directory: `dist`.
4. Click **Deploy Site**.

---

## 🛡️ Clinical Safety & Compliance Disclaimer

> **Disclaimer**: MEDU VADA is an assistive pre-consultation tool engineered to facilitate clinical intake and information organization. It is strictly **non-autonomous** and **does not provide automated diagnoses or prescribe treatments**. All clinical summaries, ICD-10 suggestions, and extracted metrics must be independently verified and authorized by a licensed medical practitioner.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors & Acknowledgments

Developed with ❤️ for **Smart India Hackathon (SIH)**.
- **Live Demo**: [https://ishan12369.github.io/SIH_project/](https://ishan12369.github.io/SIH_project/)
- **Repository**: [ISHAN12369/SIH_project](https://github.com/ISHAN12369/SIH_project)
