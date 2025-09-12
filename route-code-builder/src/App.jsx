import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { CARGO_BY_CLIMATE } from "./data/dictionaries";


function App() {
  const [mode, setMode] = useState("GT");
  const [origin, setOrigin] = useState("RZV32");
  const [destination, setDestination] = useState("SLG");
  const [climate, setClimate] = useState("temperate");
  const [cargo, setCargo] = useState("PASS");
  const [routeNumber, setRouteNumber] = useState("00");


  return (
    <>
      <main className="stack" style={{ padding: '1rem', maxWidth: 800, margin: '0 auto' }}>
        <h1>Route Code Builder</h1>
        <section>
          <div className="stack">
            <h2>Section 1: “Inputs”</h2>
            <label>Climate 
              <select className="field" value={climate} onChange={(e) => setClimate(e.target.value)} >
                <option value="temperate">Temperate</option>
                <option value="sub-arctic">Sub-Arctic</option>
                <option value="sub-tropical">Sub-Tropical</option>
                <option value="toyland">Toyland</option>
              </select>
            </label>
            <label>Mode:
              <select className="field" value={mode} onChange={(e) => setMode(e.target.value)}>
                  <option value="GT">GT - Ground Transit</option>
                  <option value="RT">RT - Rail Transit</option>
                  <option value="WT">WT - Water Transit</option>
                  <option value="AT">AT - Air Transit</option>
              </select>
            </label>
            <label>Origin: 
              <select className="field" value={origin} onChange={(e) => setOrigin(e.target.value)} >
                <option value="RZV32">RZV32 - RZV-32 Junk Yard</option>
                <option value="SLG">SLG - Slagmere Steel Mill</option>
                <option value="NP">NP - Nova Prospekt</option>
                <option value="SV">SV - Sevastopol</option>
              </select>
            </label>
            <label>Destination 
              <select className="field" value={destination} onChange={(e) => setDestination(e.target.value)} >
                <option value="RZV32">RZV32 - RZV-32 Junk Yard</option>
                <option value="SLG">SLG - Slagmere Steel Mill</option>
                <option value="NP">NP - Nova Prospekt</option>
                <option value="SV">SV - Sevastopol</option>
              </select>
              </label>
            
            <label>
              Cargo
              <select className="field" value={cargo} onChange={(e) => setCargo(e.target.value)}>
                {CARGO_BY_CLIMATE[climate].map(([code, label]) => (
                  <option key={code} value={code}>
                    {code} — {label}
                  </option>
                ))}
              </select>
            </label>
            <label>Route Number <input value={routeNumber} type="number" onChange={(e) => setRouteNumber(e.target.value)} /></label>
          </div>
        </section>
        <section>
          <h2>Section 2: “Output”</h2>
          <h3>CODE:</h3>
          <p>{mode}-{origin}&gt;{destination}-{cargo}-{routeNumber.padStart(2, "0")}</p>
          <h3>Breakdown:</h3>
          <p>Mode: {mode}</p>
          <p>Origin: {origin}</p>
          <p>Destination: {destination}</p>
          <p>Cargo: {cargo}</p>
          <p>Route Number: {routeNumber.padStart(2, "0")}</p>
        </section>
      </main>

    </>
  )
}

export default App
