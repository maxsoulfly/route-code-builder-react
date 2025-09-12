import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { MODES, CLIMATES, CARGO_BY_CLIMATE, STATIONS } from "./data/dictionaries";
import AddStation from "./components/AddStation";



function App() {
  const [mode, setMode] = useState("GT");
  const [stations, setStations] = useState(() => {
    const saved = localStorage.getItem("stations");
    return saved ? JSON.parse(saved) : STATIONS;
  });
  const [origin, setOrigin] = useState(() => stations[0]?.[0] || "");
  const [destination, setDestination] = useState(() => stations[1]?.[0] || "");
  const [climate, setClimate] = useState("temperate");
  const [cargo, setCargo] = useState("PASS");
  const [routeNumber, setRouteNumber] = useState("00");

  // Load stations from localStorage once on app start
  useEffect(() => {
    const saved = localStorage.getItem("stations");
    if (saved) {
      setStations(JSON.parse(saved));
    }
  }, []);

  // Save stations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("stations", JSON.stringify(stations));
  }, [stations]);


  return (
    <>
      <main className="stack" style={{ padding: '1rem', maxWidth: 800, margin: '0 auto' }}>
        <h1>Route Code Builder</h1>

        <section>
          <h2>Output</h2>
          <p className="code-output">
            {mode}-{origin}&gt;{destination}-{cargo}-{routeNumber.padStart(2, "0")}
          </p>
          <p>
            <button
              type="button"
              className="btn"
              onClick={() => navigator.clipboard.writeText(
                `${mode}-${origin}>${destination}-${cargo}-${routeNumber.padStart(2, "0")}`
              )}
            >
              Copy Code
            </button>
          </p>

        </section>

        <section>
          
          <div className="stack">
            <h2>Inputs</h2>

            <label>Climate 
              <select className="field yellow" value={climate} onChange={(e) => setClimate(e.target.value)} >
                {CLIMATES.map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <div className="row">
              <label>Mode:
                <select className="field blue" value={mode} onChange={(e) => setMode(e.target.value)}>
                    {MODES.map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Cargo
                <select className="field blue" value={cargo} onChange={(e) => setCargo(e.target.value)}>
                  {CARGO_BY_CLIMATE[climate].map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="row">
              <label>Origin: 
                <select className="field green" value={origin} onChange={(e) => setOrigin(e.target.value)}>
                  {stations.map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Destination:
                <select className="field red" value={destination} onChange={(e) => setDestination(e.target.value)}>
                  {stations.filter(([code]) => code !== origin).map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>


            <label>Route Number <input value={routeNumber} type="number" onChange={(e) => setRouteNumber(e.target.value)} /></label>

          </div>
        </section>

        <AddStation onAddStation={(station) => setStations([...stations, station])} />

        <section>
            <ul className="stack">
              {stations.map(([code, label]) => (
                <li key={code} className="row">
                  <span>{code} - {label}</span>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setStations(stations.filter(([c]) => c !== code))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
        </section>
        
      </main>

    </>
  )
}

export default App
