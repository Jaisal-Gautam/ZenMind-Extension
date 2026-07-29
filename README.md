# ZenMind 🌿

ZenMind is a minimalist, privacy-first productivity workspace and browser companion. It is crafted to quiet the internet, block distracting websites, and create a calm space for deep work. 

The project includes a **Chrome extension frontend**, an **Express backend API**, and a **Vite landing page** optimized for speed, accessibility, and modern search engine optimization (SEO).

---

## 📂 Project Structure

The codebase is organized into three main components:

### 1. 🌐 Landing Page (`LandingPage/`)
A premium marketing and product information site built for speed, performance, and SEO.
```text
LandingPage/
├── public/                 # Favicons, sitemap, robots.txt, and OG images
├── src/
│   ├── components/         # Premium modular UI components (Hero, Navbar, Insights, etc.)
│   ├── lib/                # Helpers and Chrome web store utility functions
│   ├── App.tsx             # Main layout entry with routing, section wrapper, and Vercel analytics
│   └── main.tsx            # React application entrypoint
├── tailwind.config.js      # Custom theme system (cream, forest, sage, and deep green colors)
└── index.html              # HTML shell containing full primary meta tags, OG, Twitter/X cards, and JSON-LD
```

### 2. 🔌 Browser Extension (`Frontend-extension/`)
The primary product frontend loaded directly into the browser to manage focus sessions.
```text
Frontend-extension/
├── public/                 # Extension manifest (v3), assets, and background entrypoints
├── src/
│   ├── app/                # Redux state store (focus, blocking, and UI slices)
│   ├── background/         # Service worker tracking timers and rule-blocking engines
│   ├── components/         # Reusable widgets (timers, progress displays)
│   ├── pages/              # Routing sub-dashboards (Analytics, Auth, Blocked, Focus)
│   └── main.jsx            # React rendering root
```

### 3. 🛡️ API Service (`backend/`)
A lightweight data layer backing session persistent analytics and authentication support.
```text
backend/
├── src/
│   ├── app.js              # Express settings configuration
│   ├── server.js           # Server startup script
│   ├── controllers/        # Request controllers and route handlers
│   ├── models/             # Database schemas (User, FocusSession, BlockLogs)
│   └── services/           # Internal core logic operations
```

---

## ✨ Features

- ⏱️ **Focus Rituals & Timers**: Choose Deep Focus (lockdown), Gentle Focus (mild breaks), or Study Mode (interval-based).
- 🚫 **Smart Blocklists**: Block standard social media, streaming, shopping, or custom domain lists automatically.
- 🎵 **Calm Soundscapes**: Select from mountain winds, forest rains, or cozy fire soundscapes inside the built-in ambient player.
- 📈 **Productive Insights**: View distractions avoided, session metrics, and growing forest gamification metrics.
- ⚡ **SEO & Core Web Vitals**: Designed for optimal search score, accessible elements, and `<noscript>` crawlers integration.

---

## 🛠️ Technical Stack

### Landing & Extension
- **Framework**: React 19 + TypeScript (Landing) / React 18 + JavaScript (Extension)
- **Bundler**: Vite 8
- **Styles**: Tailwind CSS (Custom Color Tokens) + Vanilla CSS
- **Animation**: Motion / Framer Motion
- **Icons**: Lucide React

### Backend Service
- **Platform**: Node.js + Express 5
- **Database**: MongoDB + Mongoose
- **CORS & Utilities**: Dotenv, Morgan logging, Nodemon runner

---

## 🚀 Getting Started

### 1. Setup & Requirements
Ensure you have [Node.js](https://nodejs.org) installed on your system.

Clone the repository:
```bash
git clone https://github.com/Jaisal-Gautam/ZenMind-Extension.git
cd ZenMind
```

### 2. Running Components Individually

#### **Run the Landing Page**
```bash
cd LandingPage
npm install
npm run dev
```
*Your landing page will start at `http://localhost:5173/`.*

#### **Run the Extension Frontend**
```bash
cd Frontend-extension
npm install
npm run dev
```
*To load the extension in Chrome:*
1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** (top right switch).
3. Click **Load unpacked** and select the `/dist` output folder after building.

#### **Run the Backend API**
Create a `.env` file inside `/backend`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/zenmind
```
Run the service:
```bash
cd backend
npm install
npm run dev
```

---

## 🎨 Design Tokens

ZenMind uses a highly aesthetic, calming nature-themed design system. The following color tokens are extended via Tailwind:

- **Deep Green** (`#0F2928` / `bg-zen-deep`): Low-stimulation background base.
- **Sage Green** (`#C9D8C7` / `text-zen-sage`): Smooth, low-intensity contrast text and borders.
- **Cream White** (`#FAFBF7` / `bg-zen-cream`): Light-mode sanctuary color canvas.
- **Forest Green** (`#285C4D` / `text-zen-forest`): Core focus highlight accents.
- **Warm Accent** (`#B9D88B` / `text-zen-accent`): Vibrant level-up and active state glow accent.
