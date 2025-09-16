# Route Code Builder

🚦 **Route Code Builder** is a small React app that generates clean, consistent route codes for transport simulation games like **OpenTTD**, **Transport Fever 1 & 2**, the upcoming **Transport Fever 3**, and similar titles.

---

## 🎯 Purpose

When managing dozens (or hundreds) of lines in transport games, names like _“Line 12”_ or _“Bus Route A”_ quickly become messy.  
This app provides a **structured naming system** so every route code contains useful information.

---

## 🧭 Modes

### 1. Classic Mode (MVP) → `/mvp`

Format:
MODE-ORIGIN>DEST-CARGO-NN

Example:  
`GT-RZV32>SLG-PASS-01`

- `GT` → Ground Transit
- `RZV32` → Origin Station
- `SLG` → Destination Station
- `PASS` → Cargo type (Passengers)
- `01` → Route number

### 2. Game Mode (Generator) → `/generator`

Format:
`[STATION1>STATION2>STATION3]-CARGO+...-TAG`

Example:  
`[NPN>SV>RZV32]-WD+PS-X`

- `NPN`, `SV`, `RZV32` → up to 3 stations per route
- `WD+PS` → multiple cargos (Wood + Passengers)
- `X` → optional suffix tag (Express, Local, Transfer, Delivery)

---

## ✨ Features

- **Line name generator** → instantly build consistent route codes
- **Station manager** → add/remove your custom stations with persistence (saved in localStorage)
- **Auto-suggest station codes** → based on station names
- **Multi-cargo selection** → combine multiple cargo codes with `+`
- **Optional tag system** → add `X`, `L`, `T`, `D` as suffixes
- **Copy-to-clipboard** → one-click to paste into your game
- Modular React components for clean structure
- **Reset All Data** → If you ever want to start fresh

---

## ♻️ Resetting Saved Data

Route Code Builder saves your stations and climate settings in your browser’s **localStorage**.  
If you ever want to start fresh, use the **Reset All Data** button.

⚠️ Warning: this will permanently delete all saved stations, codes, and settings.  
Once deleted, the data cannot be recovered.

---

## 🚀 How to Use

1. Open either [Classic Mode (MVP)](https://maxsoulfly.github.io/route-code-builder-react/#/mvp)  
   or [Game Mode (Generator)](https://maxsoulfly.github.io/route-code-builder-react/#/generator).
2. **Add stations** in the Station Manager (persisted locally).
3. **Choose mode/climate** (classic) or **select stations** (game).
4. **Pick cargos** (single in MVP, multiple in Game Mode).
5. **Optionally add a suffix tag** (Express, Local, Transfer, Delivery).
6. Copy the generated code and paste it into your game.

---

## 🛠 Tech Stack

- **React + Vite** → fast, modern frontend
- **LocalStorage** → persistence without a backend
- **Plain CSS** → lightweight styling

---

## 🌍 Live Demo

👉 Try it here:  
[Main page](https://maxsoulfly.github.io/route-code-builder-react/)

- [Classic Mode (MVP)](https://maxsoulfly.github.io/route-code-builder-react/#/mvp)
- [Game Mode (Generator)](https://maxsoulfly.github.io/route-code-builder-react/#/generator)

---

## 📦 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/maxsoulfly/route-code-builder-react.git
cd route-code-builder-react
npm install
npm run dev

Then open http://localhost:5173

---

⚡ This way new users instantly see:
- The two modes
- Their formats (old vs new)
- Example codes for both

```
