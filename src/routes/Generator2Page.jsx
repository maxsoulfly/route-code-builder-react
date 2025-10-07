import { useState, useEffect } from "react";

import {
  MODES,
  CLIMATES,
  CARGO_BY_CLIMATE,
  STATIONS,
  TAGS,
} from "../data/dictionaries";
import AddStation from "../components/AddStation";
import StationList from "../components/StationList2";
import StationNameGen from "../components/StationNameGen";
import Inputs2 from "../components/Inputs2";
import Output2 from "../components/Output2";
import Reset from "../components/Reset";

function Generator2Page() {
  const [stations, setStations] = useState(() => {
    const saved = localStorage.getItem("stations");
    return saved ? JSON.parse(saved) : STATIONS;
  });

  const s1 = localStorage.getItem("gen.station1");
  const s2 = localStorage.getItem("gen.station2");
  const s3 = localStorage.getItem("gen.station3");
  const cg = localStorage.getItem("gen.cargo");
  const tg = localStorage.getItem("gen.tag");

  const [station1, setStation1] = useState(() =>
    s1
      ? JSON.parse(s1)
      : stations[0]
        ? { code: stations[0][0], label: stations[0][1] }
        : { code: "", label: "" }
  );
  const [station2, setStation2] = useState(() =>
    s2
      ? JSON.parse(s2)
      : stations[1]
        ? { code: stations[1][0], label: stations[1][1] }
        : { code: "", label: "" }
  );

  const [station3, setStation3] = useState(() =>
    s3 ? JSON.parse(s3) : { code: "", label: "" }
  );

  const [climate, setClimate] = useState(() => {
    const saved = localStorage.getItem("climate");
    return saved ? JSON.parse(saved) : "temperate";
  });
  const [cargo, setCargo] = useState(() =>
    cg ? JSON.parse(cg) : [CARGO_BY_CLIMATE[climate][0][0]]
  );
  const [tag, setTag] = useState(() => (tg ? JSON.parse(tg) : ""));

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

  useEffect(() => {
    localStorage.setItem("climate", JSON.stringify(climate));
  }, [climate]);

  // Load saved selections on mount
  useEffect(() => {
    const s1 = localStorage.getItem("gen.station1");
    const s2 = localStorage.getItem("gen.station2");
    const s3 = localStorage.getItem("gen.station3");
    const cg = localStorage.getItem("gen.cargo");
    const tg = localStorage.getItem("gen.tag");

    // If any exist, hydrate without touching your current defaults otherwise
    if (s1) setStation1(JSON.parse(s1));
    if (s2) setStation2(JSON.parse(s2));
    if (s3) setStation3(JSON.parse(s3));
    if (cg) setCargo(JSON.parse(cg)); // expects an array
    if (tg) setTag(JSON.parse(tg));
  }, []);

  // Save whenever user changes them

  useEffect(() => {
    localStorage.setItem("gen.station1", JSON.stringify(station1));
    localStorage.setItem("gen.station2", JSON.stringify(station2));
    localStorage.setItem("gen.station3", JSON.stringify(station3));
    localStorage.setItem("gen.cargo", JSON.stringify(cargo)); // array
    localStorage.setItem("gen.tag", JSON.stringify(tag));
  }, [station1, station2, station3, cargo, tag]);

  return (
    <>
      <main
        className="stack"
        style={{ padding: "1rem", maxWidth: 800, margin: "0 auto" }}
      >
        <h1>Route Code Generator 2.0</h1>

        <Output2 values={{ station1, station2, station3, cargo, tag }} />

        <Inputs2
          stations={stations}
          values={{ climate, station1, station2, station3, cargo, tag }}
          handlers={{
            setClimate,
            setStation1,
            setStation2,
            setStation3,
            setCargo,
            setTag,
          }}
        />

        <StationNameGen climate={climate} />

        <AddStation
          onAddStation={(station) => setStations([...stations, station])}
          stations={stations}
        />

        <StationList
          stations={stations}
          onRemoveStation={(code) =>
            setStations(stations.filter(([c]) => c !== code))
          }
        />

        <Reset />
      </main>
    </>
  );
}

export default Generator2Page;
