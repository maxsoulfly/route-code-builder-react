import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { MODES, CLIMATES, CARGO_BY_CLIMATE, STATIONS } from "./data/dictionaries";
import AddStation from "./components/AddStation";
import StationList from "./components/StationList";
import Inputs from './components/Inputs';
import Output from './components/Output';




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

        
        <Output
          values={{ mode, origin, destination, cargo, routeNumber }}
        />

        <Inputs
          stations={stations}
          values={{ mode, climate, origin, destination, cargo, routeNumber }}
          handlers={{setMode,setClimate,setOrigin,setDestination,setCargo,setRouteNumber}}
        />

        <AddStation onAddStation={(station) => setStations([...stations, station])} />

        <StationList stations={stations} onRemoveStation={(code) => setStations(stations.filter(([c]) => c !== code))}/>

      </main>

    </>
  )
}

export default App
