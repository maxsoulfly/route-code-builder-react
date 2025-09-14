import { useState, useEffect } from "react";

import {
  MODES,
  CLIMATES,
  CARGO_BY_CLIMATE,
  STATIONS,
} from "../data/dictionaries";
import AddStation from "../components/AddStation";
import StationList from "../components/StationList";
import StationNameGen from "../components/StationNameGen";
import Inputs2 from "../components/Inputs2";
import Output2 from "../components/Output2";

function Generator2Page() {
  const [mode, setMode] = useState("GT");
  const [stations, setStations] = useState(() => {
    const saved = localStorage.getItem("stations");
    return saved ? JSON.parse(saved) : STATIONS;
  });
  const [station1, setStation1] = useState("");
  const [station2, setStation2] = useState("");
  const [station3, setStation3] = useState("");

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
  // put your useState + useEffect + imports here

  return (
    <>
      <main
        className="stack"
        style={{ padding: "1rem", maxWidth: 800, margin: "0 auto" }}
      >
        <h1>Route Code Generator 2.0</h1>

        <Output2 values={{ mode, station1, station2, station3, cargo, routeNumber }} />

        <Inputs2
          stations={stations}
          values={{ mode, climate, station1, station2, station3, cargo, routeNumber }}
          handlers={{
            setMode,
            setClimate,
            setStation1,
            setStation2,
            setStation3,
            setCargo,
            setRouteNumber,
          }}
        />

        <StationNameGen climate={climate} />

        <AddStation
          onAddStation={(station) => setStations([...stations, station])}
        />

        <StationList
          stations={stations}
          onRemoveStation={(code) =>
            setStations(stations.filter(([c]) => c !== code))
          }
        />
      </main>
    </>
  );
}

export default Generator2Page;
