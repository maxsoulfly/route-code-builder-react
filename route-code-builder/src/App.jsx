import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { MODES, CLIMATES, CARGO_BY_CLIMATE, STATIONS } from "./data/dictionaries";


function App() {
  const [mode, setMode] = useState("GT");
  const [stations, setStations] = useState(STATIONS);
  const [origin, setOrigin] = useState("RZV32");
  const [destination, setDestination] = useState("SLG");
  const [climate, setClimate] = useState("temperate");
  const [cargo, setCargo] = useState("PASS");
  const [routeNumber, setRouteNumber] = useState("00");

  const [newStationCode, setNewStationCode] = useState("");
  const [newStationLabel, setNewStationLabel] = useState("");


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
              <select className="field" value={climate} onChange={(e) => setClimate(e.target.value)} >
                {CLIMATES.map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <div className="row">
              <label>Mode:
                <select className="field" value={mode} onChange={(e) => setMode(e.target.value)}>
                    {MODES.map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Cargo
                <select className="field" value={cargo} onChange={(e) => setCargo(e.target.value)}>
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
                <select className="field" value={origin} onChange={(e) => setOrigin(e.target.value)}>
                  {stations.map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Destination:
                <select className="field" value={destination} onChange={(e) => setDestination(e.target.value)}>
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

        <section>
          <div className='stack'>
            <h2>Add Station</h2>
            <div className="row">
              <input
                placeholder="Code"
                value={newStationCode}
                onChange={(e) => setNewStationCode(e.target.value.toUpperCase())}
              />
              <input
                placeholder="Label"
                value={newStationLabel}
                onChange={(e) => setNewStationLabel(e.target.value)}
              />
              <button
                type="button"
                className="btn"
                onClick={() => {
                  if (newStationCode && newStationLabel) {
                    setStations([...stations, [newStationCode, newStationLabel]]);
                    setNewStationCode("");
                    setNewStationLabel("");
                  }
                }}
              >
                Add Station
              </button>
            </div>

            <ul className="stack">
              {stations.map(([code, label]) => (
                <li key={code} className="row">
                  <span>{label}</span>
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


          </div>
        </section>
        
      </main>

    </>
  )
}

export default App
