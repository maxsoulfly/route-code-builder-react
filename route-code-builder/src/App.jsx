import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { MODES, CLIMATES, CARGO_BY_CLIMATE, STATIONS } from "./data/dictionaries";

function suggestCode(name) {
  if (!name) return "";

  // Remove leading/trailing spaces and normalize
  const clean = name.trim();

  // If contains numbers
  const numberMatch = clean.match(/\d+/);
  if (numberMatch) {
    const letters = clean.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
    return letters + numberMatch[0];
  }

  // Split into words
  const words = clean.split(/\s+/);

  if (words.length === 1) {
    // Single word → first 2 letters
    return words[0].slice(0, 2).toUpperCase();
  }

  if (words.length === 2) {
    // Two words → first 1 letter of first + 1 of second
    return (
      words[0].slice(0, 1).toUpperCase() +
      words[1].slice(0, 1).toUpperCase()
    );
  }

  // 3+ words → first 1 letters of first + 1 of second + 1 of last
  return (
    words[0].slice(0, 1).toUpperCase() +
    words[1].slice(0, 1).toUpperCase() +
    words[words.length - 1][0].toUpperCase()
  );
}


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

  const [newStationCode, setNewStationCode] = useState("");
  const [newStationLabel, setNewStationLabel] = useState("");
  const [newStationWarning, setNewStationWarning] = useState("");

  function handleAddStation() {
    if (!newStationCode || !newStationLabel) {
      setNewStationWarning("Both code and label are required.");
      return;
    }

    if (newStationCode.length < 2) {
      setNewStationWarning("Station code must be at least 2 characters.");
      return;
    }

    if (stations.some(([c]) => c.toUpperCase() === newStationCode.toUpperCase())) {
      setNewStationWarning("Station code already exists.");
      return;
    }

    // ✅ Passed all checks → add station
    setStations([...stations, [newStationCode, newStationLabel]]);
    setNewStationCode("");
    setNewStationLabel("");

    setNewStationWarning("");
  }

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
                onChange={(e) => {
                  const value = e.target.value;
                  setNewStationLabel(value);
                  setNewStationCode(suggestCode(value));
                }}
              />
              <button
                type="button"
                className="btn"
                onClick={handleAddStation}
              >
                Add Station
              </button>
            </div>
            
            <div className='stack'>
              {newStationWarning && (
                <p className="warnings-output warning">{newStationWarning}</p>
              )}
            </div>

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


          </div>
        </section>
        
      </main>

    </>
  )
}

export default App
