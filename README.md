# Route Code Builder

🚦 **Route Code Builder** is a small React app that generates clean, consistent route codes for transport simulation games like **OpenTTD**, **Transport Fever 1 & 2**, the upcoming **Transport Fever 3**, and similar titles.

## 🎯 Purpose

When managing dozens (or hundreds) of lines in transport games, names like _“Line 12”_ or _“Bus Route A”_ quickly become messy.  
This app provides a **structured naming system** so every route code contains useful information:

MODE-ORIGIN>DEST-CARGO-NN

Example:  
GT-RZV32>SLG-PASS-01

- `GT` → Ground Transit
- `RZV32` → Origin Station
- `SLG` → Destination Station
- `PASS` → Cargo type (Passengers)
- `01` → Route number

## ✨ Features

- **Line name generator** → instantly build consistent route codes
- **Station manager** → add/remove your custom stations with persistence (saved in localStorage)
- **Auto-suggest station codes** → based on station names
- **Validation** → avoid duplicates and invalid codes
- **Copy-to-clipboard** → one-click to paste into your game
- Modular React components (`Inputs`, `Output`, `AddStation`, `StationList`) for clean structure

## 🛠 Tech Stack

- **React + Vite** → fast, modern frontend
- **LocalStorage** → persistence without a backend
- **Plain CSS** → lightweight styling

## 🚀 Roadmap

- More validation rules
- Optional custom cargo manager
- Responsive layout polish
- Deployment on GitHub Pages, Netlify, or Vercel

## 🔗 Live Demo

You can try the app here:  
[https://maxsoulfly.github.io/route-code-builder-react/](https://maxsoulfly.github.io/route-code-builder-react/)

## 📦 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/maxsoulfly/route-code-builder-react.git
cd route-code-builder-react
npm install
npm run dev

Open http://localhost:5173

👉 This is copy-ready. You can drop it straight into your repo.

Want me to add a **“How to Use” section** (with steps like *1. Add stations → 2. Pick mode/cargo → 3. Copy code*) so it’s beginner-friendly?
```
