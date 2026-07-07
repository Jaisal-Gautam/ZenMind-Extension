# ZenMind

ZenMind is a focus-enhancement productivity app with a browser extension frontend and a backend API. It helps users stay on track with focus timers, website blocking, session analytics, ambient audio, and a sanctuary-style progress system.

## Overview

ZenMind combines:
- a React + Vite frontend extension UI
- Redux-powered state management
- browser-focused blocking and focus tools
- a lightweight Express backend for API services

## Project Structure

### Frontend: Frontend-extension

```text
Frontend-extension/
├── public/                  # Extension assets and manifest
├── src/
│   ├── app/                 # Redux store, slices, providers
│   ├── assets/              # Images, icons, audio files
│   ├── background/          # Extension background logic
│   ├── components/          # Reusable UI components
│   ├── pages/               # Route-based pages
│   │   ├── analytics/
│   │   ├── auth/
│   │   ├── blocked/
│   │   ├── blocking/
│   │   ├── focus/
│   │   └── setting/
│   ├── popup/               # Popup UI entrypoints
│   ├── utils/               # Helpers, analytics, formatters, storage logic
│   └── main.jsx             # Frontend entrypoint
├── package.json
└── vite.config.js
```

### Backend: backend

```text
backend/
├── src/
│   ├── app.js               # Express app setup
│   ├── server.js            # Server entrypoint
│   ├── controllers/         # Request handlers
│   ├── db/                  # Database connection setup
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   └── utils/               # Shared utility helpers
├── package.json
└── .env
```

## Features

- Focus timer with session tracking
- Custom focus duration selection
- Daily and weekly focus analytics
- Website blocking and distraction protection
- Category-based content filtering
- Ambient audio player with multiple sounds
- Daily goal progress visualization
- Sanctuary / progress feedback experience
- Authentication page scaffold

## Tech Stack

### Frontend
- React 19
- Vite 8
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- Framer Motion / Motion
- Recharts
- Lucide React
- Sonner

### Backend
- Express 5
- MongoDB / Mongoose
- CORS
- Dotenv
- Morgan
- Nodemon (dev)

## Frontend Dependencies

From Frontend-extension/package.json:

- React and React DOM
- React Router DOM
- Redux Toolkit and React Redux
- Tailwind CSS and Tailwind Merge
- Framer Motion / Motion
- Recharts
- Lucide React
- Sonner
- Vite and ESLint tooling

## Backend Dependencies

From backend/package.json:

- Express
- CORS
- Dotenv
- MongoDB
- Mongoose
- Morgan
- Nodemon

## Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd ZenMind
```

### 2. Install frontend dependencies

```bash
cd Frontend-extension
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

## Running the Project

### Frontend

```bash
cd Frontend-extension
npm run dev
```

The app will be available at the Vite dev server URL shown in the terminal.

### Backend

```bash
cd backend
npm run dev
```

The backend API will start using nodemon and serve requests from the configured port.

## Production Build

### Frontend

```bash
cd Frontend-extension
npm run build
```

### Backend

```bash
cd backend
npm start
```

## Environment Variables

The backend uses a `.env` file. Create one in the backend folder with values such as:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/zenmind
```

## Notes

- The frontend is structured as a browser extension UI and may require browser-specific loading behavior depending on how it is packaged.
- The backend is currently a lightweight API foundation and can be expanded with authentication, user profiles, and persistence endpoints.
